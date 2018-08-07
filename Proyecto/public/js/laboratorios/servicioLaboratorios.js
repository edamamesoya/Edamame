'use strict';

function registrarLaboratorio(pCodigo, pNombre, pCupo,pSede, pEstado){

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_laboratorio',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
           codigo : pCodigo,
           nombre : pNombre,
           cupo : pCupo,
           sede : pSede,
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

function obtenerLaboratorios(){
    let listaLaboratorios = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_laboratorio',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaLaboratorios = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaLaboratorios;
};

function obtenerBusquedaLaboratorios(pBuscar){
    let listaLaboratorios = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_laboratorio',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data:{codigo: pBuscar}
    });

    peticion.done(function(response){
        listaLaboratorios = response;
    });

    peticion.fail(function(){

    });

    return listaLaboratorios;
};

function obtenerLaboratorioPorId(pId){
    let usuario = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_laboratorio_id',
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

function actualizarLaboratorio(pId, pCodigo, pNombre, pCupo, pSede, pEstado){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_laboratorio',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pId,
            codigo : pCodigo,
            nombre : pNombre,
            cupo : pCupo,
            sede : pSede,
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

function eliminarLaboratorio(pId){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_laboratorio',
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