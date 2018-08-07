'use strict';

function registrarPeriodo(pCodigo, pNombre, pFechaInicio, pFechaConclusion, pEstado){

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_periodo',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
           codigo : pCodigo,
           nombre : pNombre,
           fechainicio : pFechaInicio,
           fechaconclusion : pFechaConclusion,
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

function obtenerPeriodos(){
    let listaPeriodos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_Periodos',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaPeriodos = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaPeriodos;
};

function obtenerBusquedaPeriodos(pBuscar){
    let listaPeriodos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_Periodo',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data:{codigo: pBuscar}
    });

    peticion.done(function(response){
        listaPeriodos = response;
    });

    peticion.fail(function(){

    });

    return listaPeriodos;
};

function obtenerPeriodoPorId(pId){
    let usuario = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_periodo_id',
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

function actualizarPeriodo(pId, pCodigo, pNombre, pFechaInicio, pFechaConclusion, pEstado){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_periodo',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pId,
            codigo : pCodigo,
           nombre : pNombre,
           fechainicio : pFechaInicio,
           fechaconclusion : pFechaConclusion,
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

function eliminarPeriodo(pId){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_periodo',
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