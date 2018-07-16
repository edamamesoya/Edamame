'use strict';

function registrarSolicitud (pCurso, pNombre) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_solicitud',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: pNombre,
            cursos: pCurso
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });
    return respuesta;
};

function obtenerSolicitudes() {
    let listaSolicitudes = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_solicitudes',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
        }
    });

    peticion.done(function (response) {
        listaSolicitudes = response;
    });

    peticion.fail(function () {

    });

    return listaSolicitudes;
};