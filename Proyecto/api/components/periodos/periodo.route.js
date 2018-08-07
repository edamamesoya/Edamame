'use strict'

const express = require('express');
const router = express.Router();
const periodoApi = require('./periodo.api');

router.route('/registrar_periodo')
    .post(function (req, res) {
        periodoApi.registrar(req, res);
    });

router.route('/listar_Periodos')
    .get(function (req, res) {
        periodoApi.listar_todos(req, res);
    });

router.route('/buscar_Periodo')
    .post(function (req, res) {
        periodoApi.buscar_periodo(req, res);
    });

router.route('/buscar_periodo_id')
    .post(function (req, res) {
        periodoApi.buscar_periodo_id(req, res);
    });

router.route('/modificar_periodo')
    .post(function (req, res) {
        periodoApi.modificar_periodo(req, res);
    });

router.route('/eliminar_periodo')
    .post(function (req, res) {
        periodoApi.eliminar_periodo(req, res);
    });
module.exports = router;