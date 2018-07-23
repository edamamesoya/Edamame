'use strict'
const express = require('express');
const router = express.Router();
const solicitudApi = require('./solicitud.api');

router.route('/registrar_solicitud')
    .post(function (req, res) {
        solicitudApi.registrar(req, res);
    });

router.route('/agregar_sedes')
    .post(function (req, res) {
        solicitudApi.agregar_sede(req, res);
    });
router.route('/agregar_periodos')
    .post(function (req, res) {
        solicitudApi.agregar_periodo(req, res);
    });
router.route('/agregar_cursos')
    .post(function (req, res) {
        solicitudApi.agregar_curso(req, res);
    });

router.route('/listar_solicitudes')
    .get(function (req, res) {
        solicitudApi.listar_solicitudes(req, res);
    });

module.exports = router;