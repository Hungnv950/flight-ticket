const express = require('express');

let bodyParser = require('body-parser');

let jsonParser = bodyParser.json();

const router = express.Router();

const apiCtrl = require('../../controllers/api/api.controller');

router.get('/collaborator/:id/:filterDate', jsonParser, apiCtrl.collaborator);

module.exports = router;