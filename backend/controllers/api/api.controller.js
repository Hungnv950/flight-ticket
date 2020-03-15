const moment = require('moment');

const User = require('../../models/user.model');
const Flight = require('../../models/flight.model');
const Transaction = require('../../models/transaction.model');

exports.collaborator = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id).exec(function (err, collaborator) {
                    if (err) return next(err);

                    console.log(collaborator);

                    let gte = null;
                    let lte = null;

                    switch (req.params.filterDate) {
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

                    Flight.find({"createdAt": {"$gte": new Date(gte), "$lte": new Date(lte)},"collaboratorCode":collaborator.code}).exec(function (err, flights) {
                        let data = {
                            hits: Math.floor(Math.random() * 100),
                            profit: 0,
                            revenue: 0,
                            guestsBooked: 0,
                            flights: flights,
                            transactions:Object
                        };

                        flights.forEach(function (flight) {
                            data.revenue += flight.totalMoney;
                            data.profit += 30000;
                            data.guestsBooked++;
                        });

                        Transaction.find({"createdAt": {"$gte": new Date(gte), "$lte": new Date(lte)}}).populate('bank').exec(function (err, transactions) {

                            data.transactions = transactions;

                            res.json(data);
                        });
                    });
                });
            }
        }
    });
};