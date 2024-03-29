const moment = require('moment');

const User = require('../../models/user.model');

const Flight = require('../../models/flight.model');

export function index (req, res, next) {
    findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                find({roleId: 3}, function (err, users) {
                    find({roleId: 2}, function (err, collaborators) {
                        users.forEach(function (user) {
                            collaborators.forEach(function (collaborator) {
                                let flight = new Flight({
                                    user:user._id,
                                    collaboratorCode:collaborator.code,
                                    flightCode: "FLIGHT"+Math.floor(Math.random() * 100),
                                    airline:"Vietnam Airlines‎",
                                    seatType:"Hạng thương gia",
                                    hoursAway:new Date(moment().set({'hour': moment().hour()+7+24}).toDate()),
                                    arrivalTime:new Date(moment().set({'hour': moment().hour()+7+26}).toDate()),
                                    departure:{
                                        code:"SGN",
                                        name:"TP Hồ Chí Minh"
                                    },
                                    destinations:{
                                        code:"HNN",
                                        name:"Hà Nội"
                                    },
                                    fullName: user.fullName,
                                    phone: user.phone,
                                    email: user.phone+"@thinkflight.com",
                                    gender: 1,
                                    passengers:[
                                        {
                                            firstName: "Lê",
                                            lastName:"Văn Việt",
                                            gender: 1,
                                            price:1450000,
                                        },
                                        {
                                            firstName: "Lê",
                                            lastName:"Văn Việt",
                                            gender: 1,
                                            price:1450000,
                                        }
                                    ],
                                    totalMoney: 2900000-collaborator.discount,
                                    discount: collaborator.discount,
                                    status: Math.floor(Math.random() * Math.floor(2))+1
                                });

                                flight.save(function (err) {
                                    if (err) return console.error(err);

                                    collaborator.wallet+=collaborator.commission;
                                    collaborator.save();

                                    user.flights.push(flight);
                                    user.save();
                                });
                            });
                        });
                    });
                });

                _find({}).populate('user').exec(function (err, flights) {
                    res.render('admin/flight/index', {_ : ejsHelpers, flights: flights,userLogin: user});
                });
            }
        }
    });
}