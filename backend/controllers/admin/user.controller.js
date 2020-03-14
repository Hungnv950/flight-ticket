const User = require('../../models/user.model');

const ejsHelpers = require('../../helpers/ejs-helpers');

exports.index = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.find({roleId: 3}, function (err, users) {
                    res.render('admin/user/index', {users: users,userLogin: user});
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
                User.findById(req.params.id, function (err, userFind) {
                    if (err) return next(err);

                    res.render('admin/user/update', {user: userFind, userLogin: user});
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
                User.findById(req.params.id, function (err, userFind) {
                    if (err) return next(err);

                    userFind.note = req.body.note;
                    userFind.address = req.body.address;
                    userFind.fullName = req.body.fullName;

                    userFind.update(function (err) {
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
                User.findById(req.params.id).populate('flights').exec(function (err, userFind) {
                    if (err) return next(err);

                    res.render('admin/user/view', {_:ejsHelpers,user: userFind,userLogin: user});
                })
            }
        }
    });
};
