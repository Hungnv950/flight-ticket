const express = require('express');

const router = express.Router();

const userCtrl = require('../../controllers/admin/user.controller');

router.get('/view/:id', userCtrl.view);

router.get('/index', userCtrl.index);

module.exports = router;
