'use strict'
const express = require('express');
const router = express.Router();
const laboratorioApi = require('./laboratorios.api');

router.route('/registrar_laboratorio')
    .post(function(req, res){
        laboratorioApi.registrar(req, res);
    });

router.route('/listar_laboratorios')
    .get(function(req, res){
        laboratorioApi.listar_laboratorios(req, res);
    });

router.route('/buscar_laboratorio')
    .post(function(req, res){
        laboratorioApi.buscar_laboratorios(req, res);
    });
module.exports = router;