
//Simple version, without validation or sanitation
exports.dashboard = function (req, res) {
    res.render('admin/dashboard/index', { title: 'Express' });
};
