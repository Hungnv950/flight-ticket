const express = require('express');

const auth = require('../middleware/auth');

const authCtrl = require('../controllers/admin/auth.controller');

const bankCtrl = require('../controllers/admin/bank.controller');

const tourCtrl = require('../controllers/admin/tour.controller');

const flightCtrl = require('../controllers/admin/flight.controller');

const employeeCtrl = require('../controllers/admin/employee.controller');

const scheduleCtrl = require('../controllers/admin/schedule.controller');

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

router.get('/tours', auth, tourCtrl.index);

router.get('/tour/:id', auth, tourCtrl.view);

router.post('/tour/create', auth, tourCtrl.create);

router.post('/tour/:id/update', auth, tourCtrl.update);

router.get('/schedules', auth, scheduleCtrl.index);

router.get('/schedule/:id', auth, scheduleCtrl.view);

router.get('/employees', auth, employeeCtrl.index);

router.get('/employee/:id', auth, employeeCtrl.view);

router.post('/employee/create', auth, employeeCtrl.create);

router.post('/employee/:id/update', auth, employeeCtrl.update);

router.post('/employee/:id/deactive', auth, employeeCtrl.deActive);

module.exports = router;