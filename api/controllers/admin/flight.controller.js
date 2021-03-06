const moment = require('moment');

const User = require('../../models/user.model');

const Flight = require('../../models/flight.model');

exports.index = async function(req, res) {
    try {
        let queries = {};

        if(req.user.roleId === User.role_ctv){
            queries.collaboratorCode = req.user.code;
        }

        const resPerPage = 15;
        const page = req.query.page || 1;

        const flights = await Flight.find(queries).skip((resPerPage * page) - resPerPage).limit(resPerPage).populate('user','fullName');

        res.status(201).send(flights);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function(req, res) {
    try {
        const flight = await Flight.findById(req.params.id).populate('user');

        if(req.user.roleId === User.role_ctv){
            if(req.user.code !== flight.collaboratorCode){
                res.status(200).send({});
            }
        }

        res.status(201).send(flight);
    } catch (error) {
        res.status(400).send(error)
    }
};