'use strict';

function registrarGrupo(pNumeroGrupo, pNumeroLaboratorio, pNombreProfesor, pNumeroEstudiantes, pdiasSemana) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_grupo',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            numeroGrupo: pNumeroGrupo,
            numeroLaboratorio: pNumeroLaboratorio,
            nombreProfesor: pNombreProfesor,
            numeroEstudiantes: pNumeroEstudiantes,
            diasSemana: pdiasSemana
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });
    return respuesta;
};

function obtenerGrupos() {
    let listaGrupos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_grupos',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
        }
    });

    peticion.done(function (response) {
        listaGrupos = response;
    });

    peticion.fail(function () {

    });

    return listaGrupos;
};

function obtenerBusqueda(pBuscar) {
    let listaGrupos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_grupo',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombreProfesor: pBuscar
        }
    });

    peticion.done(function (response) {
        listaGrupos = response;
    });

    peticion.fail(function () {

    });

    return listaGrupos;
};