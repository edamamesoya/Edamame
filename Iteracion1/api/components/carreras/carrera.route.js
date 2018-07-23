'use strict'
const express = require('express');
const router = express.Router();
const carreraApi = require('./carrera.api');

router.route('/registrar_carrera')
    .post(function(req, res){
        carreraApi.registrar(req, res);
    });

router.route('/listar_carreras')
    .get(function(req, res){
        carreraApi.listar_todos(req, res);
    });

router.route('/enlazar_curso')
    .post(function(req, res){
    carreraApi.agregar_curso(req, res);
    });
module.exports = router;