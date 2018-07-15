'use strict'
const express = require('express');
const router = express.Router();
const sedeApi = require('./sede.api');

router.route('/registrar_sede')
    .post(function (req, res) {
        sedeApi.registrar(req, res);
    });

router.route('/listar_sedes')
    .get(function (req, res) {
        sedeApi.listar_todos(req, res);
    });

module.exports = router;