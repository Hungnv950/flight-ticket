const User = require('../../models/user.model');
const Flight = require('../../models/flight.model');

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
                            flightCode: "FLIGHT"+Math.random(),
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

                Flight.find({}).exec(function (err, flights) {
                    res.render('admin/flight/index', {flights: flights});
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

                    res.render('admin/flight/view', {flight: flight});
                })
            }
        }
    });
};
