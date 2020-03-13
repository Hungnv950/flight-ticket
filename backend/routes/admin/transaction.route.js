const express = require('express');

const router = express.Router();

const transactionCtrl = require('../../controllers/admin/transaction.controller');

router.get('/index', transactionCtrl.index);

router.get('/view/:id', transactionCtrl.view);

module.exports = router;