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
            profe: pProfesor
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

function obtenerSolicitudPorId(pId){
    let usuario = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_solicitud_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pId
        }
      });
    
      peticion.done(function(response){
        usuario = response;
      });
    
      peticion.fail(function(response){
       
      });

      return usuario;
};

function actualizarSolicitud(pId, pSede, pPeriodo, pCurso, pGrupo, pNombre, pEstado, pProfesor, pAsistentePrevio, pFecha){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_solicitud',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pId,
            sedes: pSede,
            periodos: pPeriodo,
            cursos: pCurso,
            grupos: pGrupo,
            nombre: pNombre,
            estado: pEstado,
            profe: pProfesor,
            asistentePrevio: pAsistentePrevio,
            fecha: pFecha,
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function eliminarSolicitud(pId){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_solicitud',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pId
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};