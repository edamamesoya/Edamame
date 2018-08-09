'use strict'
const express = require('express');
const router = express.Router();
const bitacoraApi = require('./bitacora.api');

router.route('/registrar_bitacora')
    .post(function(req, res){
        bitacoraApi.registrar(req, res);
    });

router.route('/listar_bitacoras')
    .get(function(req, res){
        bitacoraApi.listar_todos(req, res);
    });

router.route('/enlazar_entrada')
    .post(function(req, res){
        bitacoraApi.agregar_entrada(req, res);
    });

router.route('/buscar_bitacora_id')
    .post(function (req, res) {
        bitacoraApi.buscar_bitacora_id(req, res);
    });

router.route('/modificar_entrada')
    .post(function (req, res) {
        bitacoraApi.modificar_entrada(req, res);
    });

router.route('/eliminar_entrada')
    .post(function (req, res) {
        bitacoraApi.eliminar_entrada(req, res);
    });
module.exports = router;