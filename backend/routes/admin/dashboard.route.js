const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const dashboardController = require('../../controllers/admin/dashboard.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/dashboard', dashboardController.dashboard);

module.exports = router;
