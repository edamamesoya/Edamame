'use strict';

function registrarCarrera(pCodigo, pNombre, pCreditos, pFechaCreacion, pEstado){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_carrera',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
           codigo : pCodigo,
           nombre : pNombre,
           creditos : pCreditos,
           fechaCreacion : pFechaCreacion,
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

function obtenerCarreras(){
    let listaCarreras = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_Carreras',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaCarreras = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaCarreras;
};