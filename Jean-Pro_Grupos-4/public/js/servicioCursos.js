'use strict';

/**
 * Descripción: Realiza una petición tipo 'post' a la base de datos
 * para registrar un curso nuevo en caso de éxito, y devolver un 
 * mensaje ya sea de error o confirmación.
 * @param: {String} pCodigo, {String} pNombre, {int} pCreditos,
 * {Date} pFechaCreacion, {boolean} pEstado
 * @return: {String} repuesta
 */
function registrarCurso(pCodigo, pNombre, pCreditos, pCarrera, pRequisitos){
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_curso',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
           codigo : pCodigo,
           nombre : pNombre,
           creditos : pCreditos,
           carrera : pCarrera,
           requisitos : pRequisitos
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
 * para obtener un arreglo de los cursos registradas.
 * @param: n/a
 * @return: {any} listaCursos
 */
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