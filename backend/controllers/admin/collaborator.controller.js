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
    if (req.session.userId) {
        let err = new Error('Not authorized! Go back!');
        err.status = 400;

        return next(err);
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

};
