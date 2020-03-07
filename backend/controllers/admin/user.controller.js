const User = require('../../models/user.model');

exports.index = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.find({roleId: 3}, function (err, users) {
                    res.render('admin/user/index', {users: users});
                });
            }
        }
    });
};

exports.update = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id, function (err, user) {
                    if (err) return next(err);

                    res.render('admin/user/update', {user: user});
                })
            }
        }
    });
};

exports.updatePost = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id, function (err, user) {
                    if (err) return next(err);

                    user.note = req.body.note;
                    user.address = req.body.address;
                    user.fullName = req.body.fullName;

                    user.update(function (err) {
                        if (err) return console.error(err);

                        return res.redirect('/admin/user/index');
                    });
                });
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
                User.findById(req.params.id).populate('flights').exec(function (err, user) {
                    if (err) return next(err);

                    console.log(user);

                    res.render('admin/user/view', {user: user});
                })
            }
        }
    });
};
