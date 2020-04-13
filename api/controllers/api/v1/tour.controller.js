const Tour = require('../../../models/tour.model');

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

exports.view = async function(req, res) {
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).send(tour);
    } catch (error) {
        res.status(400).send(error)
    }
};