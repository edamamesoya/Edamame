'use strict'
const express = require('express');
const router = express.Router();
const grupoApi = require('./grupo.api');

router.route('/registrar_grupo')
    .post(function (req, res) {
        grupoApi.registrar(req, res);
    });

router.route('/listar_grupos')
    .get(function (req, res) {
        grupoApi.listar_todos(req, res);
    });

router.route('/buscar_grupo')
    .post(function (req, res) {
        grupoApi.buscar_grupo(req, res);
    });
module.exports = router;