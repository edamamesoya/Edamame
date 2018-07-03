'use strict'
const express = require('express');
const router = express.Router();
const laboratorioApi = require('./laboratorio.api');

router.route('/registrar_laboratorio')
    .post(function(req, res){
        laboratorioApi.registrar(req, res);
    });

router.route('/listar_laboratorios')
    .get(function(req, res){
        laboratorioApi.listar_todos(req, res);
    });

module.exports = router;