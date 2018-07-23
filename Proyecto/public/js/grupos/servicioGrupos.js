'use strict';

function registrarGrupo(id, idSed, idPer, idLab, pNumeroGrupo, pNombreProfesor, pNumeroEstudiantes, pHorarioDomingo, pHorarioLunes, pHorarioMartes, pHorarioMiercoles, pHorarioJueves, pHorarioViernes, pHorarioSabado, pHorarioVirtual, pTiempoEntrada, pTiempoSalida) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_grupo',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: id,
            _idLab: idLab,
            _idSed: idSed,
            _idPer: idPer,
            numeroGrupo: pNumeroGrupo,
            nombreProfesor: pNombreProfesor,
            numeroEstudiantes: pNumeroEstudiantes,
            horarioDomingo: pHorarioDomingo,
            horarioLunes: pHorarioLunes,
            horarioMartes: pHorarioMartes,
            horarioMiercoles: pHorarioMiercoles,
            horarioJueves: pHorarioJueves,
            horarioViernes: pHorarioViernes,
            horarioSabado: pHorarioSabado,
            horarioVirtual: pHorarioVirtual,
            tiempoEntrada: pTiempoEntrada,
            tiempoSalida: pTiempoSalida
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