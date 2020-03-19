const moment = require('moment');

const User = require('../../models/user.model');
const Flight = require('../../models/flight.model');

exports.index = async function (req, res, next) {
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

                if(query.status > 0){
                    conditions.status = query.status;
                }

                if(query.dateQuick){
                    let gte = null;
                    let lte = null;

                    switch (query.dateQuick) {
                        case "today":
                            gte = moment().set({'hour': 7, 'minute': 0,'second':0}).toDate();

                            lte = moment().set({'hour': 30, 'minute': 59,'second':59}).toDate();

                            break;
                        case "yesterday":
                            gte = moment().set({'day':moment().day()-1,'hour': 7, 'minute': 0,'second':0}).toDate();

                            lte = moment().set({'day':moment().day()-1,'hour': 30, 'minute': 59,'second':59}).toDate();

                            break;
                        case "seven-day-ago":
                            gte = moment().set({'day':moment().day()-7,'hour': 7, 'minute': 0,'second':0}).toDate();

                            lte = moment().set({'day':moment().day()-1,'hour': 30, 'minute': 59,'second':59}).toDate();

                            break;
                        case "month":
                            gte = moment().set({'day':moment().day() - moment().days(),'hour': 7, 'minute': 0,'second':0}).toDate();

                            lte = moment().set({'day':moment().day()-1,'hour': 30, 'minute': 59,'second':59}).toDate();

                            break;
                        case "last-month":
                            gte = moment().set({'day':moment().day() - moment().days(),'hour': 7, 'minute': 0,'second':0}).toDate();

                            lte = moment().set({'day':moment().day()-1,'hour': 30, 'minute': 59,'second':59}).toDate();
                            break;
                        default:
                            break;
                    }

                    if(query.dateQuick !== "all"){
                        conditions.createdAt = {"$gte": new Date(gte), "$lte": new Date(lte)};
                    }
                }

                const resPerPage = 15;
                const page = req.query.page || 1;

                Flight.find(conditions).skip((resPerPage * page) - resPerPage).limit(resPerPage)populate('bank').populate('user').exec(function (err, flights) {
                    if (err) return next(err);

                    Flight.count(conditions).exec(function (err, numOfFlights) {
                        if (err) return next(err);

                        res.json({
                            flights: flights,
                            currentPage: page,
                            numOfFlights: numOfFlights,
                            pages: Math.ceil(numOfFlights / resPerPage)
                        });
                    });
                });
            }
        }
    });
};