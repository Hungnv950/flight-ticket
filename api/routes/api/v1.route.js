const express = require('express');

const authCtrl = require('../../controllers/api/v1/auth.controller');

const tourCtrl = require('../../controllers/api/v1/tour.controller');

const router = express.Router();

router.post('/auth/login', authCtrl.login);

router.get('/tours', tourCtrl.index);

router.get('/tour/:id', tourCtrl.view);

module.exports = router;