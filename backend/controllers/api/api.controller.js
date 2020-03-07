const User = require('../../models/user.model');
const Flight = require('../../models/flight.model');

exports.collaborator = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id).exec( function (err, collaborator) {
                    if (err) return next(err);

                    Flight.find({}).exec(function (err, flights) {
                        let data = {
                            hits:Math.random(),
                            profit:0,
                            revenue:0,
                            guestsBooked:0,
                            flights:flights
                        };

                        flights.forEach(function (flight) {
                            console.log(flight);
                            data.revenue+=flight.totalMoney;
                            data.profit+=30000;
                            data.guestsBooked++;
                        });

                        res.json(data);
                    });
                });
            }
        }
    });
};