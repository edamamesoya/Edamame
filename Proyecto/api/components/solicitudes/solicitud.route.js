'use strict'
const express = require('express');
const router = express.Router();
const solicitudApi = require('./solicitud.api');

router.route('/registrar_solicitud')
    .post(function (req, res) {
        solicitudApi.registrar(req, res);
    });

router.route('/agregar_cursos')
    .post(function (req, res) {
        solicitudApi.agregar_curso(req, res);
    });

router.route('/listar_solicitudes')
    .get(function (req, res) {
        solicitudApi.listar_solicitudes(req, res);
    });

router.route('/modificar_solicitud')
    .post(function (req, res) {
        solicitudApi.modificar_solicitud(req, res);
    });

router.route('/eliminar_solicitud')
    .post(function (req, res) {
        solicitudApi.eliminar_solicitud(req, res);
    });
module.exports = router;