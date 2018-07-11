'use strict'

const express = require('express');
const router = express.Router();
const periodoApi = require('./periodos.api');

router.route('/registrar_periodo')
    .post(function(req, res){
        periodoApi.registrar(req, res);
    });

router.route('/listar_periodos')
    .get(function(req, res){
        periodoApi.listar_todos(req, res);
    });

router.route('/buscar_periodo')
    .post(function(req, res){
        periodoApi.buscar_periodo(req, res);
    });
module.exports = router;