'use strict';

/**
 * Descripción: Realiza una petición tipo 'post' a la base de datos para registrar un usuario nuevo en caso 
 * de éxito, y devolver un mensaje ya sea de error o confirmación.
 * @param: {String} pPrimerNombre, {String} pSegundoNombre, {String} pPrimerApellido,
 * {int} pCedula, {String} pProvincia, {String} pCanton, {String} pDistrito, {String} pDireccion,
 * {Date} pFechaIngreso, {int} pTelefono, {String} pCorreo, {String} pRol, {String} pPrimerNombreContacto,
 * {String} pSegundoNombreContacto, {String} pPrimerApellidoContacto, {String} pSegundoApellidoContacto,
 * {int} pTelefonoContacto
 * @return: {String} repuesta
 */
function registrarUsuario(pPrimerNombre, pSegundoNombre, pPrimerApellido, pSegundoApellido, pCedula, pProvincia, pCanton, pDistrito, pDireccion, pFechaIngreso, pTelefono, pCorreo, pRol, pPrimerNombreContacto, pSegundoNombreContacto, pPrimerApellidoContacto, pSegundoApellidoContacto, pTelefonoContacto){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/registrar_usuario',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        primerNombre : pPrimerNombre,
        segundoNombre : pSegundoNombre,
        primerApellido : pPrimerApellido,
        segundoApellido : pSegundoApellido,
        cedula : pCedula,
        provincia : pProvincia,
        canton : pCanton,
        distrito : pDistrito,
        direccion : pDireccion,
        fechaIngreso : pFechaIngreso,
        telefono : pTelefono,
        correo : pCorreo,
        rol : pRol,
        primerNombreContacto : pPrimerNombreContacto,
        segundoNombreContacto : pSegundoNombreContacto,
        primerApellidoContacto : pPrimerApellidoContacto,
        segundoApellidoContacto : pSegundoApellidoContacto,
        telefonoContacto : pTelefonoContacto
      }
    });
  
    peticion.done(function(response){
     respuesta = response;
    });
  
    peticion.fail(function(response){
     
    });

    return respuesta;
};
 
function registrarAsistente(pPrimerNombre, pPrimerApellido, pSegundoApellido, pCedula, pFechaIngreso, pTelefono, pCorreo){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/registrar_asistente',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
        primerNombre : pPrimerNombre,
        primerApellido : pPrimerApellido,
        segundoApellido : pSegundoApellido,
        cedula : pCedula,
        fechaIngreso : pFechaIngreso,
        telefono : pTelefono,
        correo : pCorreo
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
 * Descripción: Realiza una petición tipo 'get' a la base de datos para obtener un arreglo de los usuarios registrados.
 * @return: {any} listaUsuarios
 */
function obtenerUsuarios(){
  let listaUsuarios = [];
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/listar_usuarios',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
      }
    });
  
    peticion.done(function(response){
      listaUsuarios = response;
    });
  
    peticion.fail(function(){
     
    });

  return listaUsuarios;
};

function obtenerUsuarioPorId(pId){
  let usuario = '';
  let peticion = $.ajax({
      url : 'http://localhost:4000/api/buscar_usuario_id',
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

function actualizarUsuario(pId, pPrimerNombre, pSegundoNombre, pPrimerApellido, pSegundoApellido, pCedula, pProvincia, pCanton, pDistrito, pDireccion, pFechaIngreso, pCorreo, pRol, pPrimerNombreContacto, pSegundoNombreContacto, pPrimerApellidoContacto, pSegundoApellidoContacto, pTelefonoContacto, pEstado){
  let respuesta = '';
  let peticion = $.ajax({
      url : 'http://localhost:4000/api/modificar_usuario',
      type : 'post',
      contentType : 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async : false,
      data:{
          _id : pId,
          primerNombre : pPrimerNombre,
          segundoNombre : pSegundoNombre,
          primerApellido : pPrimerApellido,
          segundoApellido : pSegundoApellido,
          cedula : pCedula,
          provincia : pProvincia,
          canton : pCanton,
          distrito : pDistrito,
          direccion : pDireccion,
          fechaIngreso : pFechaIngreso,
          correo : pCorreo,
          rol : pRol,
          primerNombreContacto : pPrimerNombreContacto,
          segundoNombreContacto : pSegundoNombreContacto,
          primerApellidoContacto : pPrimerApellidoContacto,
          segundoApellidoContacto : pSegundoApellidoContacto,
          telefonoContacto : pTelefonoContacto,
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

function eliminarUsuario(pId){
  let respuesta = '';
  let peticion = $.ajax({
      url : 'http://localhost:4000/api/eliminar_usuario',
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