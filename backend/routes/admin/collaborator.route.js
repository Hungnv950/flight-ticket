const express = require('express');

const router = express.Router();

const collaboratorCtrl = require('../../controllers/admin/collaborator.controller');

router.get('/view/:id', collaboratorCtrl.view);

router.get('/index', collaboratorCtrl.index);

router.get('/create', collaboratorCtrl.create);

router.post('/create', collaboratorCtrl.createPost);

module.exports = router;
