const User = require('../../models/user.model');

const Transaction = require('../../models/transaction.model');

exports.index = async function (req, res) {
    try {
        if(req.user.roleId !== User.role_admin && req.user.roleId !== User.role_nv){
            res.status(403).send({});
        }

        let conditions = {};

        let query = req.query;

        if(query.flightSearch){
            conditions.$or = [{
                "flightCode": new RegExp('.*'+query.flightSearch+'.*', "i")
            },{
                "phone": new RegExp('.*'+query.flightSearch+'.*', "i")
            }];
        }

        if(query.collaboratorCode){
            conditions.collaboratorCode = new RegExp('.*'+query.collaboratorCode+'.*', "i");
        }

        if(query.status > 0){
            conditions.status = query.status;
        }

        if(parseInt(query.searchDateAdvanced)){
            conditions.createdAt = {"$gte": new Date(query.startDate), "$lte": new Date(query.endDate)};
        }
        else{
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
                        gte = moment().startOf('month').set({'hour': 7}).toDate();

                        lte = moment().set({'day':moment().day(),'hour': 30, 'minute': 59,'second':59}).toDate();

                        break;
                    case "last-month":
                        gte = moment().subtract(1,'months').startOf('month').set({'hour': 7}).toDate();

                        lte = moment().subtract(1,'months').endOf('month').set({'hour': 30, 'minute': 59,'second':59}).toDate();

                        break;
                    default:
                        break;
                }

                if(query.dateQuick !== "all"){
                    conditions.createdAt = {"$gte": new Date(gte), "$lte": new Date(lte)};
                }
            }
        }

        const resPerPage = 15;
        const page = req.query.page || 1;

        const transactions = await Transaction.find(conditions).populate('user').populate('bank').skip((resPerPage * page) - resPerPage).limit(resPerPage);

        res.status(200).send(transactions);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function(req, res) {
    res.status(200).send({});
};