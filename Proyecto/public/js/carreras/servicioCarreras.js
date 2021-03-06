'use strict';

/**
 * Descripción: Realiza una petición tipo 'post' a la base de datos
 * para registrar una carrera nueva en caso de éxito, y devolver un 
 * mensaje ya sea de error o confirmación.
 * @param: {String} pCodigo, {String} pNombre, {int} pCreditos,
 * {Date} pFechaCreacion, {boolean} pEstado
 * @return: {String} repuesta
 */
function registrarCarrera(pCodigo, pNombre, pCreditos, pFechaCreacion){
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
           fechaCreacion : pFechaCreacion
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

/**
 * Descripción: Realiza una petición tipo 'get' a la base de datos
 * para obtener un arreglo de las carreras registradas.
 * @param: n/a
 * @return: {any} listaCarreras
 */
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

/**
 * Descripción: Realiza una petición tipo 'post' a la base de datos
 * para agregar un subdocumento a una carrera registrada.
 * @param: {String} id, {String} pCodigoCurso, {String} pNombreCurso.
 * @return: {String} respuesta
 */
function agregarCurso(id, pCodigoCurso, pNombreCurso){
  let respuesta = '';
  let peticion = $.ajax({
      url : 'http://localhost:4000/api/enlazar_curso',
      type : 'post',
      contentType : 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async : false,
      data:{
          _id : id,
          codigoCurso : pCodigoCurso,
          nombreCurso : pNombreCurso
      }
    });
  
    peticion.done(function(response){
     respuesta = response;
    });
  
    peticion.fail(function(response){
     
    });

    return respuesta;
}