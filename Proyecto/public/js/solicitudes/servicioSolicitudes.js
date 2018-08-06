'use strict';

function registrarSolicitud (pCurso, pNombre, pProfe, pEstado) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_solicitud',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: pNombre,
            cursos: pCurso,
            profe: pProfe,
            estado: pEstado
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
    let solicitud = '';
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
        solicitud = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return solicitud;
  };
  
  function actualizarSolicitud(pId, pNombre, pProfe, pEstado){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_solicitud',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pId,
            nombre : pNombre,
            profe : pProfe,
            estado : pEstado
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