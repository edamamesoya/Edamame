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

router.route('/buscar_carrrera_id')
    .post(function (req, res) {
        carreraApi.buscar_carrera_id(req, res);
    });

router.route('/modificar_carrera')
    .post(function (req, res) {
        carreraApi.modificar_carrera(req, res);
    });

router.route('/eliminar_carrera')
    .post(function (req, res) {
        carreraApi.eliminar_carrera(req, res);
    });

router.route('/desenlazar_curso')
    .post(function(req, res){
        carreraApi.desenlazar_curso(req, res);
    });

router.route('/modificar_enlace_curso')
    .post(function(req, res){
        carreraApi.modificar_enlace_curso(req, res);
    });
module.exports = router;