'use strict'
const express = require('express');
const router = express.Router();
const cursoApi = require('./curso.api');

router.route('/registrar_curso')
    .post(function(req, res){
        cursoApi.registrar(req, res);
    });

router.route('/listar_cursos')
    .get(function(req, res){
        cursoApi.listar_todos(req, res);
    });

router.route('/buscar_curso_id')
    .post(function (req, res) {
        cursoApi.buscar_curso_id(req, res);
    });

router.route('/modificar_curso')
    .post(function (req, res) {
        cursoApi.modificar_curso(req, res);
    });

router.route('/eliminar_curso')
    .post(function (req, res) {
        cursoApi.eliminar_curso(req, res);
    });
module.exports = router;