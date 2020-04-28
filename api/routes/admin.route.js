const express = require('express');

const auth = require('../middleware/auth');

const authCtrl = require('../controllers/admin/auth.controller');

const bankCtrl = require('../controllers/admin/bank.controller');

const tourCtrl = require('../controllers/admin/tour.controller');

const flightCtrl = require('../controllers/admin/flight.controller');

const transactionCtrl = require('../controllers/admin/transaction.controller');

const collaboratorCtrl = require('../controllers/admin/collaborator.controller');

const router = express.Router();

router.post('/auth/login', authCtrl.login);

router.get('/banks', auth, bankCtrl.index);

router.post('/bank/create', auth, bankCtrl.create);

router.post('/bank/:id/update', auth, bankCtrl.update);

router.get('/collaborators', auth, collaboratorCtrl.index);

router.get('/collaborator/:id', auth, collaboratorCtrl.view);

router.post('/collaborator/create', auth, collaboratorCtrl.create);

router.post('/collaborator/:id/update', auth, collaboratorCtrl.update);

router.get('/transactions', auth, transactionCtrl.index);

router.get('/transaction/:id', auth, transactionCtrl.view);

router.get('/flights', auth, flightCtrl.index);

router.get('/flight/:id', auth, flightCtrl.view);

router.get('/tours', tourCtrl.index);

router.get('/tour/:id', tourCtrl.view);

router.post('/tour/create', tourCtrl.create);

router.post('/tour/:id/update', auth, tourCtrl.update);

module.exports = router;
