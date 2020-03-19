const User = require('../../models/user.model');

exports.index = async function (req, res, next) {
    User.findById(req.session.userid).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.redirect('/admin/login');
            } else {

                let conditions = {roleId: 3};

                let query = req.query;

                if(query.userSearch){
                    conditions.phone = query.userSearch
                }

                if(query.status > 0){
                    conditions.status = query.status;
                }

                const resPerPage = 15;
                const page = req.query.page || 1;

                User.find(conditions).skip((resPerPage * page) - resPerPage).limit(resPerPage).exec(function (err, users) {
                    if (err) return next(err);

                    User.count(conditions).exec(function (err, numOfUsers) {
                        if (err) return next(err);

                        res.json({
                            users: users,
                            currentPage: page,
                            numOfUsers: numOfUsers,
                            pages: Math.ceil(numOfUsers / resPerPage)
                        });
                    });
                });
            }
        }
    });
};