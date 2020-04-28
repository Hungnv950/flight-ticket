const Tour = require('../../models/tour.model');

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

exports.update =  async function(req, res) {
    try {
        const user = await View.findById(req.user._id);

        await updateOne({_id: req.params.id}, {$set: req.body});

        const bank = await Bank.findById(req.params.id);

        user.banks.push(bank);

        await user.save();

        res.status(200).send(bank);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function(req, res) {
    try {
        const tour = await Tour.findById(req.params._id);

        res.status(200).send(tour);
    } catch (error) {
        res.status(400).send(error)
    }
};
