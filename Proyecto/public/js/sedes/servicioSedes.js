'use strict';

function registrarSede (pNombre, pProvincia, pCanton, pDistrito, pLongitudSede, pLatitudSede) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_sede',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: pNombre,
            provincia: pProvincia,
            canton: pCanton,
            distrito: pDistrito,
            longitud: pLongitudSede,
            latitud: pLatitudSede
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });
    return respuesta;
};

function obtenerSedes() {
    let listaSedes = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_sedes',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
        }
    });

    peticion.done(function (response) {
        listaSedes = response;
    });

    peticion.fail(function () {

    });

    return listaSedes;
};