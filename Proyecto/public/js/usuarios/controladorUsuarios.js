'use strict';

let listaUsuarios = obtenerUsuarios();
mostrarBusqueda();

/**
 * Declaración de variables.
 */
const inputPrimerNombre = document.querySelector('#txtPrimerNombre');
const inputSegundoNombre = document.querySelector('#txtSegundoNombre');
const inputPrimerApellido = document.querySelector('#txtPrimerApellido');
const inputSegundoApellido = document.querySelector('#txtSegundoApellido');
const inputCedula = document.querySelector('#txtCedula');
const inputProvincia = document.querySelector('#txtProvincia');
const inputCanton = document.querySelector('#txtCanton');
const inputDistrito = document.querySelector('#txtDistrito');
const inputDireccion = document.querySelector('#txtDireccion');
const inputFechaIngreso = document.querySelector('#txtFechaIngreso');
const inputTelefono = document.querySelector('#txtTelefono');
const inputCorreo = document.querySelector('#txtCorreo');
const inputRol = document.querySelector('#txtRol');
const inputPrimerNombreContacto = document.querySelector('#txtPrimerNombreContacto');
const inputSegundoNombreContacto = document.querySelector('#txtSegundoNombreContacto');
const inputPrimerApellidoContacto = document.querySelector('#txtPrimerApellidoContacto');
const inputSegundoApellidoContacto = document.querySelector('#txtSegundoApellidoContacto');
const inputTelefonoContacto = document.querySelector('#txtTelefonoContacto');

const inputEditarPrimerNombre = document.querySelector('#txtEditarPrimerNombre');
const inputEditarSegundoNombre = document.querySelector('#txtEditarSegundoNombre');
const inputEditarPrimerApellido = document.querySelector('#txtEditarPrimerApellido');
const inputEditarSegundoApellido = document.querySelector('#txtEditarSegundoApellido');
const inputEditarCedula = document.querySelector('#txtEditarCedula');
const inputEditarProvincia = document.querySelector('#txtEditarProvincia');
const inputEditarCanton = document.querySelector('#txtEditarCanton');
const inputEditarDistrito = document.querySelector('#txtEditarDistrito');
const inputEditarDireccion = document.querySelector('#txtEditarDireccion');
const inputEditarFechaIngreso = document.querySelector('#txtEditarFechaIngreso');
const inputEditarTelefono = document.querySelector('#txtEditarTelefono');
const inputEditarCorreo = document.querySelector('#txtEditarCorreo');
const inputEditarRol = document.querySelector('#txtEditarRol');
const inputEditarPrimerNombreContacto = document.querySelector('#txtEditarPrimerNombreContacto');
const inputEditarSegundoNombreContacto = document.querySelector('#txtEditarSegundoNombreContacto');
const inputEditarPrimerApellidoContacto = document.querySelector('#txtEditarPrimerApellidoContacto');
const inputEditarSegundoApellidoContacto = document.querySelector('#txtEditarSegundoApellidoContacto');
const inputEditarTelefonoContacto = document.querySelector('#txtEditarTelefonoContacto');

const inputId = document.querySelector('#txtId');

inputFechaIngreso.valueAsDate = new Date();
const inputBuscar = document.querySelector('#txtBuscar');
const botonRegistrar = document.querySelector('#btnRegistrar');
const botonModificar = document.querySelector('#btnEditar');

/**
 * Declaración variables para ubicación 
 */
let nNumeroProvincia = 0;
let nNumeroCanton = 0;
let nNumeroDistrito = 0;

let nNumeroEProvincia = 0;
let nNumeroECanton = 0;
let nNumeroEDistrito = 0;

let sListaProvincias = [];
let sListaCantones = [];
let sListaDistritos = [];

sListaProvincias = obtenerProvincias();
sListaCantones = obtenerCantones();
sListaDistritos = obtenerDistritos();

mostrarProvincias();
mostrarEditarProvincias();

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
inputProvincia.addEventListener('change', setNumeroProvincia);
inputCanton.addEventListener('change', setNumeroCanton);

inputEditarProvincia.addEventListener('change', setNumeroEditarProvincia);
inputEditarCanton.addEventListener('change', setNumeroEditarCanton);

botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);
inputBuscar.addEventListener('keyup' , function(){
    mostrarBusqueda(inputBuscar.value)
});

/**
 * Declaración de expresiones regulares.
 */
const regexCodigo = /^[a-zA-Z0-9]+$/;
const regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ]+$/;
const regexDireccion = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ0-9\(\)\@\"\'\:\.\,\;\-\#\_\\\/\?\¿\!\¡ ]+$/;
const regexNumeros = /^[0-9]+$/;
const regexCorreo = /[a-zA-ZÑñáéíóúÁÉÍÓÚ]+@ucenfotec+\.ac\.cr+/;

/**
 * Descripción: Registra un usuario con los datos obtenidos del usuario.
 */
function obtenerDatos(){
    let sPrimerNombre = inputPrimerNombre.value;
    let sSegundoNombre = inputSegundoNombre.value;
    let sPrimerApellido = inputPrimerApellido.value;
    let sSegundoApellido = inputSegundoApellido.value;
    let nCedula = inputCedula.value;
    let sProvincia = inputProvincia.value;
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;
    let sDireccion = inputDireccion.value;
    let dFechaIngreso = inputFechaIngreso.value;
    let nTelefono = inputTelefono.value;
    let sCorreo = inputCorreo.value;
    let sRol = inputRol.value;
    let sPrimerNombreContacto = inputPrimerNombreContacto.value;
    let sSegundoNombreContacto = inputSegundoNombreContacto.value;
    let sPrimerApellidoContacto = inputPrimerApellidoContacto.value;
    let sSegundoApellidoContacto = inputSegundoApellidoContacto.value;
    let nTelefonoContacto = inputTelefonoContacto.value;

    let bError = false;
    bError = validarRegistro();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el usuario, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    }else{
        let respuesta = registrarUsuario(sPrimerNombre, sSegundoNombre, sPrimerApellido, sSegundoApellido, nCedula, sProvincia, sCanton, sDistrito, sDireccion, dFechaIngreso, nTelefono, sCorreo, sRol, sPrimerNombreContacto, sSegundoNombreContacto, sPrimerApellidoContacto, sSegundoApellidoContacto, nTelefonoContacto);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            listaUsuarios = obtenerUsuarios();
            mostrarBusqueda();
            limpiarFormulario();
            document.getElementById("buscar").click();
        }else{
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }
};

function modificarDatos(){
    let sPrimerNombre = inputEditarPrimerNombre.value;
    let sSegundoNombre = inputEditarSegundoNombre.value;
    let sPrimerApellido = inputEditarPrimerApellido.value;
    let sSegundoApellido = inputEditarSegundoApellido.value;
    let nCedula = inputEditarCedula.value;
    let sProvincia = inputEditarProvincia.value;
    let sCanton = inputEditarCanton.value;
    let sDistrito = inputEditarDistrito.value;
    let sDireccion = inputEditarDireccion.value;
    let fFechaIngreso = inputEditarFechaIngreso.value;
    let sCorreo = inputEditarCorreo.value;
    let sRol = inputEditarRol.value;
    let sPrimerNombreContacto = inputEditarPrimerNombreContacto.value;
    let sSegundoNombreContacto = inputEditarSegundoNombreContacto.value;
    let sPrimerApellidoContacto = inputEditarPrimerApellidoContacto.value;
    let sSegundoApellidoContacto = inputEditarSegundoApellidoContacto.value;
    let nTelefonoContacto = inputEditarTelefonoContacto.value;

    let sEstado = chkEstado.checked;
    let sId = inputId.value;

    let bError = false;
    bError = validarRegistroModificar();
    
    if(bError == true){
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo modificar el usuario, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = actualizarUsuario(sId, sPrimerNombre, sSegundoNombre, sPrimerApellido, sSegundoApellido, nCedula, sProvincia, sCanton, sDistrito, sDireccion, fFechaIngreso, sCorreo, sRol, sPrimerNombreContacto, sSegundoNombreContacto, sPrimerApellidoContacto, sSegundoApellidoContacto, nTelefonoContacto, sEstado);
        if(respuesta.success == true){
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            listaUsuarios = obtenerUsuarios();
            // limpiarFormularioModificar();
            mostrarBusqueda();
            document.getElementById("buscar").click();
        }else{
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        }   
    }
};

/**
 * Descripción: Valida los campos del registro y devuelve 'false'
 * en caso de que todos sean válidos o devuelve 'true' en caso de
 * que al menos uno no lo sea.
 * @return: {boolean} bError
 */
function validarRegistro(){
    let bError = false;
    let dFechaActual = new Date();

    let sPrimerNombre = inputPrimerNombre.value;
    let sSegundoNombre = inputSegundoNombre.value;
    let sPrimerApellido = inputPrimerApellido.value;
    let sSegundoApellido = inputSegundoApellido.value;
    let nCedula = Number(inputCedula.value);
    let sProvincia = inputProvincia.value;
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;
    let sDireccion = inputDireccion.value;
    let dFechaIngreso = new Date(inputFechaIngreso.value);
    let nTelefono = Number(inputTelefono.value);
    let sCorreo = inputCorreo.value;
    let sRol = inputRol.value;
    let sPrimerNombreContacto = inputPrimerNombreContacto.value;
    let sSegundoNombreContacto = inputSegundoNombreContacto.value;
    let sPrimerApellidoContacto = inputPrimerApellidoContacto.value;
    let sSegundoApellidoContacto = inputSegundoApellidoContacto.value;
    let nTelefonoContacto = Number(inputTelefonoContacto.value);

    // Validación del input para primer nombre
    if (sPrimerNombre == '' || (regexNombre.test(sPrimerNombre) == false) ){
        inputPrimerNombre.classList.add('errorInput');
        bError = true;
    }else{
        inputPrimerNombre.classList.remove('errorInput');
    }
    // Validación del input para segundo nombre
    if (sSegundoNombre == '' || (regexNombre.test(sSegundoNombre) == false) ){
        inputSegundoNombre.classList.add('errorInput');
        bError = true;
    }else{
        inputSegundoNombre.classList.remove('errorInput');
    }
    // Validación del input para primer apellido
    if (sPrimerApellido == '' || (regexNombre.test(sPrimerApellido) == false) ){
        inputPrimerApellido.classList.add('errorInput');
        bError = true;
    }else{
        inputPrimerApellido.classList.remove('errorInput');
    }
    // Validación del input para segundo apellido
    if (sSegundoApellido == '' || (regexNombre.test(sSegundoApellido) == false) ){
        inputSegundoApellido.classList.add('errorInput');
        bError = true;
    }else{
        inputSegundoApellido.classList.remove('errorInput');
    }
    // Validación del input para cédula
    if(nCedula == 0 || (regexNumeros.test(nCedula) == false) || (nCedula < 100000000) || (nCedula > 999999999)){
        inputCedula.classList.add('errorInput');
        bError = true;
    }else{
        inputCedula.classList.remove('errorInput');
    }
    // Validación del input para dirección
    if(sDireccion == 0 || (regexDireccion.test(sDireccion) == false) ){
        inputDireccion.classList.add('errorInput');
        bError = true;
    }else{
        inputDireccion.classList.remove('errorInput');
    }
    // Validación del input para fecha
    if (dFechaIngreso == '' || dFechaIngreso > dFechaActual ){
        inputFechaIngreso.classList.add('errorInput');
        bError = true;
    }else{
        inputFechaIngreso.classList.remove('errorInput');
    }
    // Validación del input para teléfono
    if(nTelefono == 0 || (regexNumeros.test(nTelefono) == false) || (nTelefono < 10000000) || (nTelefono > 99999999) ){
        inputTelefono.classList.add('errorInput');
        bError = true;
    }else{
        inputTelefono.classList.remove('errorInput');
    }
    // Validación del input para primer nombre del contacto de emergencia
    if (sPrimerNombreContacto == '' || (regexNombre.test(sPrimerNombreContacto) == false) ){
        inputPrimerNombreContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputPrimerNombreContacto.classList.remove('errorInput');
    }
    // Validación del input para segundo nombre del contacto de emergencia
    if (sSegundoNombreContacto == '' || (regexNombre.test(sSegundoNombreContacto) == false) ){
        inputSegundoNombreContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputSegundoNombreContacto.classList.remove('errorInput');
    }
    // Validación del input para primer apellido del contacto de emergencia
    if (sPrimerApellidoContacto == '' || (regexNombre.test(sPrimerApellidoContacto) == false) ){
        inputPrimerApellidoContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputPrimerApellidoContacto.classList.remove('errorInput');
    }
    // Validación del input para segundo apellido del contacto de emergencia
    if (sSegundoApellidoContacto == '' || (regexNombre.test(sSegundoApellidoContacto) == false) ){
        inputSegundoApellidoContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputSegundoApellidoContacto.classList.remove('errorInput');
    }
    // Validación del input para teléfono
    if(nTelefonoContacto == 0 || (regexNumeros.test(nTelefonoContacto) == false) || (nTelefonoContacto < 10000000) || (nTelefonoContacto > 99999999) ){
        inputTelefonoContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputTelefonoContacto.classList.remove('errorInput');
    }
    // Validación del input para provincia
    if (sProvincia == '' ){
        inputProvincia.classList.add('errorInput');
        bError = true;
    }else{
        inputProvincia.classList.remove('errorInput');
    }
    // Validación del input para canton
    if (sCanton == '' ){
        inputCanton.classList.add('errorInput');
        bError = true;
    }else{
        inputCanton.classList.remove('errorInput');
    }
    // Validación del input para distrito
    if (sDistrito == '' ){
        inputDistrito.classList.add('errorInput');
        bError = true;
    }else{
        inputDistrito.classList.remove('errorInput');
    }
    // Validación del input para correo electrónico
    if (sCorreo == '' || (regexCorreo.test(sCorreo) == false) ){
        inputCorreo.classList.add('errorInput');
        bError = true;
    }else{
        inputCorreo.classList.remove('errorInput');
    }
    //Rol
    return bError;
}

function validarRegistroModificar(){
    let bError = false;
    let dFechaActual = new Date();

    let sPrimerNombre = inputEditarPrimerNombre.value;
    let sSegundoNombre = inputEditarSegundoNombre.value;
    let sPrimerApellido = inputEditarPrimerApellido.value;
    let sSegundoApellido = inputEditarSegundoApellido.value;
    let nCedula = Number(inputEditarCedula.value);
    let sProvincia = inputEditarProvincia.value;
    let sCanton = inputEditarCanton.value;
    let sDistrito = inputEditarDistrito.value;
    let sDireccion = inputEditarDireccion.value;
    let dFechaIngreso = new Date(inputEditarFechaIngreso.value);
    let nTelefono = Number(inputEditarTelefono.value);
    let sCorreo = inputEditarCorreo.value;
    let sRol = inputEditarRol.value;
    let sPrimerNombreContacto = inputEditarPrimerNombreContacto.value;
    let sSegundoNombreContacto = inputEditarSegundoNombreContacto.value;
    let sPrimerApellidoContacto = inputEditarPrimerApellidoContacto.value;
    let sSegundoApellidoContacto = inputEditarSegundoApellidoContacto.value;
    let nTelefonoContacto = Number(inputEditarTelefonoContacto.value);

    // Validación del input para primer nombre
    if (sPrimerNombre == '' || (regexNombre.test(sPrimerNombre) == false) ){
        inputEditarPrimerNombre.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarPrimerNombre.classList.remove('errorInput');
    }
    // Validación del input para segundo nombre
    if (sSegundoNombre == '' || (regexNombre.test(sSegundoNombre) == false) ){
        inputEditarSegundoNombre.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarSegundoNombre.classList.remove('errorInput');
    }
    // Validación del input para primer apellido
    if (sPrimerApellido == '' || (regexNombre.test(sPrimerApellido) == false) ){
        inputEditarPrimerApellido.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarPrimerApellido.classList.remove('errorInput');
    }
    // Validación del input para segundo apellido
    if (sSegundoApellido == '' || (regexNombre.test(sSegundoApellido) == false) ){
        inputEditarSegundoApellido.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarSegundoApellido.classList.remove('errorInput');
    }
    // Validación del input para cédula
    if(nCedula == 0 || (regexNumeros.test(nCedula) == false) || (nCedula < 100000000) || (nCedula > 999999999)){
        inputEditarCedula.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarCedula.classList.remove('errorInput');
    }
    // Validación del input para dirección
    if(sDireccion == 0 || (regexDireccion.test(sDireccion) == false) ){
        inputEditarDireccion.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarDireccion.classList.remove('errorInput');
    }
    // Validación del input para fecha
    if (dFechaIngreso == '' || dFechaIngreso > dFechaActual ){
        inputEditarFechaIngreso.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarFechaIngreso.classList.remove('errorInput');
    }
    // Validación del input para teléfono
    if(nTelefono == 0 || (regexNumeros.test(nTelefono) == false) || (nTelefono < 10000000) || (nTelefono > 99999999) ){
        inputEditarTelefono.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarTelefono.classList.remove('errorInput');
    }
    // Validación del input para primer nombre del contacto de emergencia
    if (sPrimerNombreContacto == '' || (regexNombre.test(sPrimerNombreContacto) == false) ){
        inputEditarPrimerNombreContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarPrimerNombreContacto.classList.remove('errorInput');
    }
    // Validación del input para segundo nombre del contacto de emergencia
    if (sSegundoNombreContacto == '' || (regexNombre.test(sSegundoNombreContacto) == false) ){
        inputEditarSegundoNombreContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarSegundoNombreContacto.classList.remove('errorInput');
    }
    // Validación del input para primer apellido del contacto de emergencia
    if (sPrimerApellidoContacto == '' || (regexNombre.test(sPrimerApellidoContacto) == false) ){
        inputPrimerApellidoContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputPrimerApellidoContacto.classList.remove('errorInput');
    }
    // Validación del input para segundo apellido del contacto de emergencia
    if (sSegundoApellidoContacto == '' || (regexNombre.test(sSegundoApellidoContacto) == false) ){
        inputEditarSegundoApellidoContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarSegundoApellidoContacto.classList.remove('errorInput');
    }
    // Validación del input para teléfono
    if(nTelefonoContacto == 0 || (regexNumeros.test(nTelefonoContacto) == false) || (nTelefonoContacto < 10000000) || (nTelefonoContacto > 99999999) ){
        inputEditarTelefonoContacto.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarTelefonoContacto.classList.remove('errorInput');
    }
    // Validación del input para provincia
    if (sProvincia == '' ){
        inputEditarProvincia.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarProvincia.classList.remove('errorInput');
    }
    // Validación del input para canton
    if (sCanton == '' ){
        inputEditarCanton.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarCanton.classList.remove('errorInput');
    }
    // Validación del input para distrito
    if (sDistrito == '' ){
        inputEditarDistrito.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarDistrito.classList.remove('errorInput');
    }
    // Validación del input para correo electrónico
    if (sCorreo == '' || (regexCorreo.test(sCorreo) == false) ){
        inputEditarCorreo.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarCorreo.classList.remove('errorInput');
    }
    //Rol
    return bError;
}

/**
 * Descripción: Filtra los usuarios de una lista de usuarios registrados cuyo nombre haga match, 
 * y las muestra en una tabla junto con las opciones para editar y eliminar.
 * @param: pFiltro
 */
function mostrarBusqueda(pFiltro){
    let tbody = document.querySelector('#tblBusqueda tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for(let i = 0; i < listaUsuarios.length; i++){
        let nombreCompleto = listaUsuarios[i]['primerNombre'] +' '+ listaUsuarios[i]['segundoNombre'] + ' '+listaUsuarios[i]['primerApellido'] + ' '+listaUsuarios[i]['segundoApellido'];

        if( (nombreCompleto.toLowerCase()).includes(pFiltro.toLowerCase()) ){
            let fila = tbody.insertRow();

            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaTelefono = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaContactoEmergencia = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();

            celdaNombre.innerHTML = nombreCompleto;

            celdaCedula.innerHTML = listaUsuarios[i]['cedula'];
            celdaTelefono.innerHTML = listaUsuarios[i]['telefono'];
            celdaCorreo.innerHTML = listaUsuarios[i]['correo'];

            let botonContactoEmergencia = document.createElement('a');
            botonContactoEmergencia.href = '#';
            botonContactoEmergencia.classList.add('far');
            botonContactoEmergencia.classList.add('fa-address-card');
            celdaContactoEmergencia.appendChild(botonContactoEmergencia);
            
            let botonEditar = document.createElement('a');
            botonEditar.classList.add('far');
            botonEditar.classList.add('fa-edit');

            botonEditar.dataset.id = listaUsuarios[i]['_id'];
            botonEditar.addEventListener('click', editar);

            celdaEditar.appendChild(botonEditar);

            let botonEliminar = document.createElement('a');
            botonEliminar.classList.add('far');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset.id = listaUsuarios[i]['_id'];
            botonEliminar.addEventListener('click', eliminar); 

            celdaEliminar.appendChild(botonEliminar);
        }
    }
    if(listaUsuarios.length == 0){
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    }else{
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
};

/**
 * Descripción: Limpia los inputs del formulario de registro
 * podiendo en '' cada uno de los campos.
 */
function limpiarFormulario(){
    inputPrimerNombre.value = '';
    inputSegundoNombre.value = '';
    inputPrimerApellido.value = '';
    inputSegundoApellido.value = '';
    inputCedula.value = '';
    inputProvincia.value = '';
    inputCanton.value = '';
    inputDistrito.value = '';
    inputDireccion.value = '';
    inputFechaIngreso.value = '';
    inputTelefono.value = '';
    inputCorreo.value = '';
    inputRol.value = '';
    inputPrimerNombreContacto.value = '';
    inputSegundoNombreContacto.value = '';
    inputPrimerApellidoContacto.value = '';
    inputSegundoApellidoContacto.value = '';
    inputTelefonoContacto.value = '';
};

/**
 * Descripción: Muestra una lista de las provincias de Costa Rica.
 */
function mostrarProvincias(){
    let selectProvincias = document.getElementById('txtProvincia');
    selectProvincias.innerHTML = '';

    for(let i=0; i < sListaProvincias.length; i++){
        let sProvincia = sListaProvincias[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sProvincia;
        nuevaOpcion.value = sProvincia;
        selectProvincias.add(nuevaOpcion);
    }
};

/**
 * Descripción: Muestra una lista de los cantones de Costa Rica, según la provincia que
 * esté seleccionada.
 */
function mostrarCantones(){
    let selectCantones = document.getElementById('txtCanton');
    selectCantones.innerHTML = '';

    for(let i=0; i < sListaCantones.length; i++){
        if (nNumeroProvincia == sListaCantones[i]['Provincia_idProvincia']){
            let sCanton = sListaCantones[i]['nombre'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sCanton;
            nuevaOpcion.value = sCanton;
            selectCantones.add(nuevaOpcion);
        }
    }
};

/**
 * Descripción: Muestra una lista de los distritos de Costa Rica, según el cantón que
 * esté seleccionado.
 */
function mostrarDistritos(){
    let selectDistritos = document.getElementById('txtDistrito');
    selectDistritos.innerHTML = '';

    for(let i=0; i < sListaDistritos.length; i++){
        if (nNumeroCanton == sListaDistritos[i]['Canton_idCanton']){
            let sDistrito = sListaDistritos[i]['nombre'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sDistrito;
            nuevaOpcion.value = sDistrito;
            selectDistritos.add(nuevaOpcion);
        }
    }
};

/**
 * Descripción: Obtiene el número de la provincia que está seleccionada.
 */
function setNumeroProvincia(){
    let sProvincia = inputProvincia.value;
    for(let i=0; i < sListaProvincias.length; i++){
        if (sProvincia == sListaProvincias[i]['nombre']){
            nNumeroProvincia = sListaProvincias[i]['idProvincia'];
        }
    }
    mostrarCantones();
};

/**
 * Descripción: Obtiene el número del cantón que está seleccionado.
 */
function setNumeroCanton(){
    let sCanton = inputCanton.value;
    for(let i=0; i < sListaCantones.length; i++){
        if (sCanton == sListaCantones[i]['nombre']){
            nNumeroCanton = sListaCantones[i]['idCanton'];
        }
    }
    mostrarDistritos();
};

function eliminar(){
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar el usuario?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.value) {
            eliminarUsuario(id);
            listaUsuarios = obtenerUsuarios();
            mostrarBusqueda();
          swal(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          )
        }
      })
};

function editar(){
    let id = this.dataset.id;

    document.getElementById("modificar").click();
    let usuario = obtenerUsuarioPorId(id);

    inputEditarPrimerNombre.value = usuario['primerNombre'];
    inputEditarSegundoNombre.value = usuario['segundoNombre'];
    inputEditarPrimerApellido.value = usuario['primerApellido'];
    inputEditarSegundoApellido.value = usuario['segundoApellido'];
    inputEditarCedula.value = usuario['cedula'];
    inputEditarProvincia.value = usuario['provincia'];
    inputEditarCanton.value = usuario['canton'];
    inputEditarDistrito.value = usuario['distrito'];
    inputEditarDireccion.value = usuario['direccion'];
    inputEditarFechaIngreso.valueAsDate = new Date(usuario['fechaIngreso']);
    inputEditarTelefono.value = usuario['telefono'];
    inputEditarCorreo.value = usuario['correo'];
    inputEditarRol.value = usuario['rol'];
    inputEditarPrimerNombreContacto.value = usuario['primerNombreContacto'];
    inputEditarSegundoNombreContacto.value = usuario['segundoNombreContacto'];
    inputEditarPrimerApellidoContacto.value = usuario['primerApellidoContacto'];
    inputEditarSegundoApellidoContacto.value = usuario['segundoApellidoContacto'];
    inputEditarTelefonoContacto.value = usuario['telefonoContacto'];
    chkEstado.checked = usuario['estado'];
    inputId.value = usuario['_id'];
};

function mostrarEditarProvincias(){
    let selectProvincias = document.getElementById('txtEditarProvincia');
    selectProvincias.innerHTML = '';

    for(let i=0; i < sListaProvincias.length; i++){
        let sProvincia = sListaProvincias[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sProvincia;
        nuevaOpcion.value = sProvincia;
        selectProvincias.add(nuevaOpcion);
    }
};

function setNumeroEditarProvincia(){
    let sProvincia = inputEditarProvincia.value;
    for(let i=0; i < sListaProvincias.length; i++){
        if (sProvincia == sListaProvincias[i]['nombre']){
            nNumeroProvincia = sListaProvincias[i]['idProvincia'];
        }
    }
    mostrarEditarCantones();
};

function setNumeroEditarCanton(){
    let sCanton = inputEditarCanton.value;
    for(let i=0; i < sListaCantones.length; i++){
        if (sCanton == sListaCantones[i]['nombre']){
            nNumeroCanton = sListaCantones[i]['idCanton'];
        }
    }
    mostrarEditarDistritos();
};

function mostrarEditarCantones(){
    let selectCantones = document.getElementById('txtEditarCanton');
    selectCantones.innerHTML = '';

    for(let i=0; i < sListaCantones.length; i++){
        if (nNumeroProvincia == sListaCantones[i]['Provincia_idProvincia']){
            let sCanton = sListaCantones[i]['nombre'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sCanton;
            nuevaOpcion.value = sCanton;
            selectCantones.add(nuevaOpcion);
        }
    }
};

function mostrarEditarDistritos(){
    let selectDistritos = document.getElementById('txtEditarDistrito');
    selectDistritos.innerHTML = '';

    for(let i=0; i < sListaDistritos.length; i++){
        if (nNumeroCanton == sListaDistritos[i]['Canton_idCanton']){
            let sDistrito = sListaDistritos[i]['nombre'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sDistrito;
            nuevaOpcion.value = sDistrito;
            selectDistritos.add(nuevaOpcion);
        }
    }
};