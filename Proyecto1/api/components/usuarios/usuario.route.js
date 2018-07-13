'use strict'
const express = require('express');
const router = express.Router();
const usuarioApi = require('./usuario.api');

router.route('/registrar_usuario')
    .post(function(req, res){
        usuarioApi.registrar(req, res);
    });

router.route('/listar_usuarios')
    .get(function(req, res){
        usuarioApi.listar_todos(req, res);
    });

module.exports = router;