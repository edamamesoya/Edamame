'use strict';

function registrarBitacora(pCurso, pAsistente, pProfesor, pFechaCreacion){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_bitacora',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            curso : pCurso,
            asistente : pAsistente,
            profesor : pProfesor,
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

function obtenerBitacoras(){
    let listaBitacoras = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_bitacoras',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaBitacoras = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaBitacoras;
};

function agregarEntrada(id, pFecha, pActividad, pHoras, pDescripcion){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/enlazar_entrada',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : id,
            fecha : pFecha,
            actividad : pActividad,
            horas : pHoras,
            descripcion : pDescripcion
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return respuesta;
};

function obtenerBitacoraPorId(pId){
    let bitacora = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_bitacora_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pId
        }
      });
    
      peticion.done(function(response){
        bitacora = response;
      });
    
      peticion.fail(function(response){
       
      });

      return bitacora;
};

function eliminarEntrada(pIdBitacora, pIdEntrada){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_entrada',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _idBitacora: pIdBitacora,
            _idEntrada: pIdEntrada
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function actualizarEntrada(pIdBitacora, pIdEntrada, pFecha, pActividad, pHoras, pDescripcion){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_entrada',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _idBitacora: pIdBitacora,
            _idEntrada: pIdEntrada,
            fecha: pFecha,
            actividad: pActividad,
            horas: pHoras,
            descripcion: pDescripcion
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function actualizarBitacora(pId, pEstado){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificar_bitacora',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pId,
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