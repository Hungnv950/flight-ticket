const Bank = require('../../models/bank.model');

const User = require('../../models/user.model');

exports.index = function (req, res, next) {
    User.findById(req.session.userid).populate('banks').exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {
                res.render('admin/bank/index', {banks: user.banks,userLogin:user});
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
                res.render('admin/bank/create',{userLogin:user});
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
                if (req.body.name && req.body.accountNumber && req.body.accountHolder && req.body.branch) {
                    let bank = new Bank({
                        name: req.body.name,
                        accountNumber: req.body.accountNumber,
                        accountHolder: req.body.accountHolder,
                        branch: req.body.branch
                    });

                    bank.save(function (err) {
                        if (err) return console.error(err);

                        user.banks.push(bank);
                        user.save();

                        return res.redirect('/admin/bank/index');
                    });
                }
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
                User.findById(req.params.id, function (err, collaborator) {
                    if (err) return next(err);

                    res.render('admin/bank/update', {collaborator: collaborator,userLogin:user});
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
                User.findById(req.params.id, function (err, collaborator) {
                    if (err) return next(err);

                    collaborator.note = req.body.note;
                    collaborator.address = req.body.address;
                    collaborator.fullName = req.body.fullName;

                    collaborator.update(function (err) {
                        if (err) return console.error(err);

                        return res.redirect('/admin/bank/index');
                    });
                });
            }
        }
    });
};