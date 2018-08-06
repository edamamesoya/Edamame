'use strict';

function registrarGrupo(pCurso, pNumeroGrupoVirtual, pNumeroEstudiantesVirtual, pNombreProfesor1, pNombreProfesor2, pNombreProfesor3, idLab, pNumeroGrupo, pNombreProfesor, pNumeroEstudiantes) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_grupo',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            curso: pCurso,
            numeroGrupoVirtual: pNumeroGrupoVirtual,
            numeroEstudiantesVirtual: pNumeroEstudiantesVirtual,
            nombreProfesor1: pNombreProfesor1,
            nombreProfesor2: pNombreProfesor2,
            nombreProfesor3: pNombreProfesor3,
            _idLab: idLab,
            numeroGrupo: pNumeroGrupo,
            nombreProfesor: pNombreProfesor,
            numeroEstudiantes: pNumeroEstudiantes,

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });
    return respuesta;
};

function obtenerGrupos() {
    let listaGrupos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_grupos',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
        }
    });

    peticion.done(function (response) {
        listaGrupos = response;
    });

    peticion.fail(function () {

    });

    return listaGrupos;
};

function obtenerBusqueda(pBuscar) {
    let listaGrupos = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_grupo',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombreProfesor: pBuscar
        }
    });

    peticion.done(function (response) {
        listaGrupos = response;
    });

    peticion.fail(function () {

    });

    return listaGrupos;
};
function obtenerGrupoPorId(pId){
    let usuario = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_grupo_id',
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

function eliminarGrupo(pId){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_grupo',
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