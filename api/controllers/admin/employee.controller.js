const User = require('../../models/user.model');

exports.index = async function (req, res) {
    try {
        const resPerPage = 15;
        const page = req.query.page || 1;

        const employees = await User.find({roleId: User.role_nv}).skip((resPerPage * page) - resPerPage).limit(resPerPage);

        res.send({employees, resPerPage, page});
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.create = async function (req, res) {
    try {
        const employee = new User(req.body);

        employee.roleId = User.role_nv;
        employee.username = req.body.phone;
        employee.password = req.body.phone;

        await employee.save();

        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.update = async function (req, res) {
    try {
        await User.updateOne({_id: req.params.id}, {$set: req.body});

        const employee = await User.findById(req.params.id);

        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.view = async function (req, res) {
    try {
        const employee = await User.findById(req.params.id).find({roleId: User.role_nv});

        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.changePasswordPost = function (req, res, next) {
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

                        return res.redirect('/admin/collaborator/view/'+req.params.id);
                    });
                });
            }
        }
    });
};

exports.deActive = async function (req, res) {
    try {
        const employee = await User.findById(req.params.id);

        employee.status = !employee.status;

        await employee.save();

        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error)
    }
};