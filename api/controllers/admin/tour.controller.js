const moment = require('moment');

const Tour = require('../../models/tour.model');

const Schedule = require('../../models/schedule.model');

exports.index =  async function(req, res) {
    try {
        const resPerPage = 15;
        const page = req.query.page || 1;

        const tours = await Tour.find({}).skip((resPerPage * page) - resPerPage).limit(resPerPage);

        res.send({tours, resPerPage, page});
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.create = async function(req, res) {
    try {
        const tour = new Tour(req.body);

        await tour.save();

        res.status(201).send(tour);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.update = async function(req, res) {
    try {
        await Tour.updateOne({_id: req.params.id}, {$set: req.body});

        const tour = await Tour.findById(req.params.id);

        if(tour.onSale){
            let onSaleTo = moment(tour.onSaleTo);
            let onSaleFrom = moment(tour.onSaleFrom);

            const diff = onSaleTo.diff(onSaleFrom, 'days');

            switch (tour.departureSchedule.type) {
                case 1:
                    for(let i = 0; i <= diff; i++){
                        let day = moment().set({'day':onSaleFrom.day()+i,'hour': 7, 'minute': 0,'second':0}).toDate();

                        let schedule = new Schedule({
                            tour: tour._id,
                            departureDay: day,
                        });

                        await schedule.save();

                        tour.schedules.push(schedule);

                        await tour.save();
                    }
                    break;
                case 2:
                    for(let i = 0; i <= diff; i++){
                        let day = moment().set({'day':onSaleFrom.day()+i,'hour': 7, 'minute': 0,'second':0}).toDate();

                        if(tour.departureSchedule.days.indexOf(day.getDay()) >= 0){
                            let schedule = new Schedule({
                                tour: tour._id,
                                departureDay: day,
                            });

                            await schedule.save();

                            tour.schedules.push(schedule);

                            await tour.save();
                        }
                    }
                    break;
                case 3:
                    break;
                default :
                    break;
            }
        }

        res.status(200).send(tour);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function(req, res) {
    try {
        const tour = await Tour.findById(req.params.id).populate('schedules');

        res.status(200).send(tour);
    } catch (error) {
        res.status(400).send(error)
    }
};
