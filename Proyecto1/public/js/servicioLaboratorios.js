'use strict';

function registrarLaboratorio(pCodigo, pNombre, pCupos, pEstado){

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
           cupos : pCupos,
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
        url: 'http://localhost:4000/api/listar_Laboratorios',
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
}