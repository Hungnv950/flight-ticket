const User = require('../../models/user.model');
const Flight = require('../../models/flight.model');

const ejsHelpers = require('../../helpers/ejs-helpers');

exports.index = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.find({roleId: 3}, function (err, users) {
                    users.forEach(function (user) {
                        let flight = new Flight({
                            user:user._id,
                            flightCode: "FLIGHT"+Math.floor(Math.random() * 100),
                            fullName: user.fullName,
                            phone: user.phone,
                            email: user.phone+"@thinkflight.com",
                            gender: 1,
                            passengers:[
                                {
                                    firstName: "Lê",
                                    lastName:"Văn Việt",
                                    gender: 1
                                },
                                {
                                    firstName: "Lê",
                                    lastName:"Văn Việt",
                                    gender: 1
                                }
                            ],
                            totalMoney:1450000,
                            status:1
                        });

                        flight.save(function (err) {
                            if (err) return console.error(err);

                            user.flights.push(flight);
                            user.save();
                        });
                    })
                });

                Flight.find({}).populate('user').exec(function (err, flights) {
                    res.render('admin/flight/index', {_ : ejsHelpers ,flights: flights,userLogin: user});
                });
            }
        }
    });
};

exports.view = function (req, res, next) {
    User.findById(req.session.userid).exec(function (err, user) {
        if (err) {
            return next(err);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                Flight.findById(req.params.id).populate('user').exec(function (err, flight) {
                    if (err) return next(err);

                    res.render('admin/flight/view', {flight: flight,userLogin: user});
                })
            }
        }
    });
};
