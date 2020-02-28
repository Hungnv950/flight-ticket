const User = require('../../models/user.model');

exports.index = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.find({roleID: 2}, function (err, collaborators) {
                    console.log(collaborators);
                    res.render('admin/collaborator/index', {title: 'Cộng tác viên', collaborators: collaborators});
                });
            }
        }
    });
};

exports.create = function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                res.render('admin/collaborator/create', {title: 'Express'});
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

                        return res.redirect('/admin/collaborator/index');
                    });
                }
            }
        }
    });
};

exports.view = function (req, res) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                User.findById(req.params.id, function (err, collaborator) {
                    if (err) return next(err);

                    res.render('admin/collaborator/view', {title: collaborator.fullName, collaborator: collaborator});
                })
            }
        }
    });
};
