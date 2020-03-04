const User = require('../../models/user.model');
const Flight = require('../../models/flight.model');

exports.index = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                Flight.find({}, function (err, flights) {
                    res.render('admin/flight/index', {flights: flights});
                });
            }
        }
    });
};

exports.createPost = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                if (req.body.username && req.body.fullName) {
                    let collaborator = new User({
                        fullName: req.body.fullName,
                        username: req.body.username,
                        phone: req.body.username,
                        password: req.body.username,
                        code: req.body.username,
                        address: req.body.address,
                        note: req.body.note,
                        roleID: 2,
                        status: 10
                    });

                    collaborator.save(function (err) {
                        if (err) return console.error(err);

                        return res.redirect('/admin/flight/index');
                    });
                }
            }
        }
    });
};

exports.view = function (req, res, next) {
    User.findById(req.session.userid).exec(function (err, user) {
        if (err) {
            return next(err);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                Flight.findById(req.params.id, function (err, flight) {
                    if (err) return next(err);

                    res.render('admin/flight/view', {flight: flight});
                })
            }
        }
    });
};
