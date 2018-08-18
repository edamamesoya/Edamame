'use strict'

const express = require('express');
const router = express.Router();
const laboratorioApi = require('./laboratorio.api');

router.route('/registrar_laboratorio')
    .post(function (req, res) {
        laboratorioApi.registrar(req, res);
    });

router.route('/listar_laboratorio')
    .get(function (req, res) {
        laboratorioApi.listar_laboratorio(req, res);
    });

router.route('/buscar_laboratorio')
    .post(function (req, res) {
        laboratorioApi.buscar_laboratorio(req, res);
    });

router.route('/buscar_laboratorio_id')
    .post(function (req, res) {
        laboratorioApi.buscar_laboratorio_id(req, res);
    });

router.route('/modificar_laboratorio')
    .post(function (req, res) {
        laboratorioApi.modificar_laboratorio(req, res);
    });

router.route('/eliminar_laboratorio')
    .post(function (req, res) {
        laboratorioApi.eliminar_laboratorio(req, res);
    });
module.exports = router;