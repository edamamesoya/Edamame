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

router.route('/buscar_usuario_id')
    .post(function (req, res) {
        usuarioApi.buscar_usuario_id(req, res);
    });

router.route('/modificar_usuario')
    .post(function (req, res) {
        usuarioApi.modificar_usuario(req, res);
    });

router.route('/eliminar_usuario')
    .post(function (req, res) {
        usuarioApi.eliminar_usuario(req, res);
    });
module.exports = router;