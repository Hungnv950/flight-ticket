const moment = require('moment');

const Tour = require('../../../models/tour.model');

const Schedule = require('../../../models/schedule.model');

exports.index =  async function(req, res) {
    try {
        let sorts = {};

        let queries = {
            onSale: true
        };

        let query = req.query;

        if(query.departureDay){
            conditions.$or = [{
                "flightCode": new RegExp('.*'+query.flightSearch+'.*', "i")
            },{
                "phone": new RegExp('.*'+query.flightSearch+'.*', "i")
            }];
        }

        if(query.orderByUpdatedAt){
            sorts.updatedAt = 'desc';
        }

        const resPerPage = 15;
        const page = req.query.page || 1;

        const tours = await Tour.find(queries).sort(sorts).skip((resPerPage * page) - resPerPage).populate({
            path: 'schedules',
            options: { limit: 1 },
            match: { departureDay: {"$gte": new Date(moment())} }
        }).limit(resPerPage);

        res.send({tours, resPerPage, page});
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function(req, res) {
    try {
        const schedule = await Schedule.findById(req.params.id).populate({
            path: 'tour',
            populate: {
                path: 'schedules',
                options: { limit: 5 },
                match: { departureDay: {"$gte": new Date(moment())} }
            }
        });

        res.status(200).send(schedule);
    } catch (error) {
        res.status(400).send(error)
    }
};