const Schedule = require('../../models/schedule.model');

exports.index =  async function(req, res) {
    try {
        const resPerPage = 15;
        const page = req.query.page || 1;

        const schedules = await Schedule.find({}).skip((resPerPage * page) - resPerPage).limit(resPerPage);

        res.send({schedules, resPerPage, page});
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function(req, res) {
    try {
        const schedule = await Schedule.findById(req.params.id).populate('tour');

        res.status(200).send(schedule);
    } catch (error) {
        res.status(400).send(error)
    }
};
