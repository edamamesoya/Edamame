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

router.route('/buscar_sede_id')
    .post(function (req, res) {
        sedeApi.buscar_sede_id(req, res);
    });

router.route('/modificar_sede')
    .post(function (req, res) {
        sedeApi.modificar_sede(req, res);
    });

router.route('/eliminar_sede')
    .post(function (req, res) {
        sedeApi.eliminar_sede(req, res);
    });
module.exports = router;