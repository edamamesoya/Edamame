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
module.exports = router;