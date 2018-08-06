'use strict';

function registrarSolicitud (pSede, pPeriodo, pCurso, pGrupo, pNombre, pEstado, pProfesor) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_solicitud',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            sedes: pSede,
            periodos: pPeriodo,
            cursos: pCurso,
            grupos: pGrupo,
            nombre: pNombre,
            estado: pEstado,
            profesor: pProfesor
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