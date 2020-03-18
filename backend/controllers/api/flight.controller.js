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

                let conditions = {};

                let query = req.query;

                if(query.flightSearch){
                    conditions.$or = [{
                        "flightCode": query.flightSearch
                    },{
                        "phone": query.flightSearch
                    }];
                }

                if(query.collaboratorCode){
                    conditions.collaboratorCode = query.collaboratorCode;
                }

                if(query.status){
                    conditions.status = query.status;
                }

                Flight.find(conditions).exec(function (err, flights) {
                    if (err) return next(err);

                    res.json(flights);
                });
            }
        }
    });
};