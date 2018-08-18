'use strict';

function registrarSede (pNombre, pProvincia, pCanton, pDistrito, pTipo, pLongitud, pLatitud) {
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
            tipo: pTipo,
            longitudSede: pLongitud,
            latitudSede: pLatitud
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

function obtenerSedePorId(pId){
    let usuario = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_sede_id',
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

function actualizarSede(pId, pNombre, pProvincia, pCanton, pDistrito, pEstado){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_sede',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pId,
            nombre : pNombre,
            provincia : pProvincia,
            canton : pCanton,
            distrito :  pDistrito,
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

function eliminarSede(pId){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_sede',
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

function agregarCarrera(id, pCodigoCarrera, pNombreCarrera){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/enlazar_carrera',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : id,
            codigoCarrera : pCodigoCarrera,
            nombreCarrera : pNombreCarrera
        }
    });
    
    peticion.done(function(response){
    respuesta = response;
    });

    peticion.fail(function(response){
    
    });

    return respuesta;
};

function desenlazarCarrera(pIdSede, pIdCarrera){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/desenlazar_carrera',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pIdSede,
            _idCarrera : pIdCarrera
        }
    });
    
    peticion.done(function(response){
    respuesta = response;
    });

    peticion.fail(function(response){
    
    });

    return respuesta;
};