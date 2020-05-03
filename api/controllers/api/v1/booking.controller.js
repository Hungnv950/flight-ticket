const Booking = require('../../../models/booking.model');

const Schedule = require('../../../models/schedule.model');

exports.create = async function(req, res) {
    try {
        const booking = new Booking(req.body);

        await booking.save();

        let schedule = await Schedule.findById(req.body.schedule);

        schedule.bookings.push(booking);
        await schedule.save();

        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function(req, res) {
    try {
        const booking = await Booking.find({_id: req.params.id}).populate({
            path: 'schedule',
            populate: {
                path: 'tour'
            }
        });

        res.status(200).send(booking);
    } catch (error) {
        res.status(400).send(error)
    }
};