const express = require('express');

const authCtrl = require('../../controllers/api/v1/auth.controller');

const tourCtrl = require('../../controllers/api/v1/tour.controller');

const bookingCtrl = require('../../controllers/api/v1/booking.controller');

const router = express.Router();

router.get('/tours', tourCtrl.index);

router.get('/tour/:id', tourCtrl.view);

router.post('/auth/login', authCtrl.login);

router.get('/booking/:id', bookingCtrl.view);

router.post('/booking/create', bookingCtrl.create);

module.exports = router;