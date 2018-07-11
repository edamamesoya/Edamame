'use strict';

let listaUsuarios = obtenerUsuarios();
mostrarBusqueda();

/**
 * Declaración de variables.
 */
let inputPrimerNombre = document.querySelector('#txtPrimerNombre');
let inputSegundoNombre = document.querySelector('#txtSegundoNombre');
let inputPrimerApellido = document.querySelector('#txtPrimerApellido');
let inputSegundoApellido = document.querySelector('#txtSegundoApellido');
let inputCedula = document.querySelector('#txtCedula');
let inputProvincia = document.querySelector('#txtProvincia');
let inputCanton = document.querySelector('#txtCanton');
let inputDistrito = document.querySelector('#txtDistrito');
let inputDireccion = document.querySelector('#txtDireccion');
let inputFechaIngreso = document.querySelector('#txtFechaIngreso');
let inputTelefono = document.querySelector('#txtTelefono');
let inputCorreo = document.querySelector('#txtCorreo');
let inputRol = document.querySelector('#txtRol');
let inputPrimerNombreContacto = document.querySelector('#txtPrimerNombreContacto');
let inputSegundoNombreContacto = document.querySelector('#txtSegundoNombreContacto');
let inputPrimerApellidoContacto = document.querySelector('#txtPrimerApellidoContacto');
let inputSegundoApellidoContacto = document.querySelector('#txtSegundoApellidoContacto');
let inputTelefonoContacto = document.querySelector('#txtTelefonoContacto');

let inputBuscar = document.querySelector('#txtBuscarNombre');
let botonRegistrar = document.querySelector('#btnRegistrar');

/**
 * Declaración variables para ubicación 
 */
let nNumeroProvincia = 0;
let nNumeroCanton = 0;
let nNumeroDistrito = 0;

let sListaProvincias = [];
let sListaCantones = [];
let sListaDistritos = [];

sListaProvincias = obtenerProvincias();
sListaCantones = obtenerCantones();
sListaDistritos = obtenerDistritos();

mostrarProvincias();
mostrarCantones();
mostrarDistritos();

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
inputProvincia.addEventListener('change', setNumeroProvincia);
inputCanton.addEventListener('change', setNumeroCanton);
botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup' , function(){
    mostrarBusqueda(inputBuscar.value)
});

/**
 * Declaración de expresiones regulares.
 */
let regexCodigo = /^[a-zA-Z0-9]+$/;
let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ]+$/;
let regexDireccion = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ0-9 ]+$/;
let regexNumeros = /^[0-9]+$/;
let regexCorreo = /[a-zA-ZÑñáéíóúÁÉÍÓÚ]+@ucenfotec+\.ac\.cr+/;

/**
 * Descripción: breve descripción sobre la funcionalidad
 * @param: n/a
 * @return: n/a
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

/**
 * Descripción: Valida los campos del registro y devuelve 'false'
 * en caso de que todos sean válidos o devuelve 'true' en caso de
 * que al menos uno no lo sea.
 * @param: n/a
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
    if(nCedula == 0 || (regexNumeros.test(nCedula) == false) ){
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

/**
 * Descripción: Envía como parámetro el String al servicio para
 * obtener una lista de carreras cuyo nombre haga match, y las 
 * muestra en una tabla junto con las opciones para editar y 
 * eliminar.
 * @param: n/a
 * @return: n/a
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

            let celdaNombre = fila.insertCell();
            let celdaCedula = fila.insertCell();
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
            botonEditar.href = '#';
            botonEditar.classList.add('far');
            botonEditar.classList.add('fa-edit');
            celdaEditar.appendChild(botonEditar);

            let botonEliminar = document.createElement('a');
            botonEliminar.href = '#';
            botonEliminar.classList.add('far');
            botonEliminar.classList.add('fa-trash-alt');
            celdaEliminar.appendChild(botonEliminar);
        }
    }
};

/**
 * Descripción: Limpia los inputs del formulario de registro
 * podiendo en '' cada uno de los campos.
 * @param: n/a
 * @return: n/a
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

function mostrarProvincias(){
    let selectProvincias = document.querySelector('#lstProvincias');
    selectProvincias.innerHTML = '';
    for(let i=0; i < sListaProvincias.length; i++){
        let nuevaOpcion = new Option(sListaProvincias[i]['nombre']);
        nuevaOpcion.value = sListaProvincias[i]['nombre'];
        selectProvincias.appendChild(nuevaOpcion);
    }
};

function mostrarCantones(){
    let selectCantones = document.querySelector('#lstCantones');
    selectCantones.innerHTML = '';
    for(let i=0; i < sListaCantones.length; i++){
        if (nNumeroProvincia == sListaCantones[i]['Provincia_idProvincia']){
            let nuevaOpcion = new Option(sListaCantones[i]['nombre']);
            nuevaOpcion.value = sListaCantones[i]['nombre'];
            selectCantones.appendChild(nuevaOpcion);
        }
    }
};

function mostrarDistritos(){

    let selectDistritos = document.querySelector('#lstDistritos');
    selectDistritos.innerHTML = '';
    for(let i=0; i < sListaDistritos.length; i++){
        if (nNumeroCanton == sListaDistritos[i]['Canton_idCanton']){
            let nuevaOpcion = new Option(sListaDistritos[i]['nombre']);
            nuevaOpcion.value = sListaDistritos[i]['nombre'];
            selectDistritos.appendChild(nuevaOpcion);
        }
    }
};

function setNumeroProvincia(){
    let sProvincia = inputProvincia.value;
    for(let i=0; i < sListaProvincias.length; i++){
        if (sProvincia == sListaProvincias[i]['nombre']){
            nNumeroProvincia = sListaProvincias[i]['idProvincia'];
        }
    }
    mostrarCantones();
};

function setNumeroCanton(){
    let sCanton = inputCanton.value;
    for(let i=0; i < sListaCantones.length; i++){
        if (sCanton == sListaCantones[i]['nombre']){
            nNumeroCanton = sListaCantones[i]['idCanton'];
        }
    }
    mostrarDistritos();
};