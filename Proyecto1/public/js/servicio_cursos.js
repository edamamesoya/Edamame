'use strict';


function registrarCurso(pCodigo, pNombre, pCreditos, pRequisitos, pFecha, pEstado){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/registrar_cursos',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        codigo: pCodigo,
        nombre: pNombre, 
        creditos: pCreditos, 
        requisitos: pRequisitos, 
        fecha: pFecha, 
        estado: pEstado
      }
    });
  
    peticion.done(function(response){
     respuesta = response;
    });
  
    peticion.fail(function(response){
     
    });

    return respuesta;
};


function obtenerCursos(){
    let listaCursos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_cursos',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaCursos = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaCursos;
};

function obtenerCursos(){
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/listar_cursos',
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


function obtenerBusqueda(pBuscar){
let listaCursos = [];
let peticion = $.ajax({
  url: 'http://localhost:4000/api/buscar_curso',
  type: 'post',
  contentType: 'application/x-www-form-urlencoded; charset=utf-8',
  dataType : 'json',
  async:false,
  data:{
    codigo : pBuscar
  }
});

peticion.done(function(response){
  listaCursos = response;
});

peticion.fail(function(){
    
});

return listaCursos;
};