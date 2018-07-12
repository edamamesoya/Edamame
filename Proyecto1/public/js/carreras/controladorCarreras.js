'use strict'

/**
 * Lista las carreras al cargar la página.
 */
mostrarListaCarreras()

/**
 * Declaración de variables.
 */
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCreditos = document.querySelector('#txtCreditos');
let inputFecha = document.querySelector('#txtFecha');
let inputBuscar = document.querySelector('#txtBuscarCodigo');
let botonRegistrar = document.querySelector('#btnRegistrar');

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', mostrarBusqueda);

/**
 * Declaración de expresiones regulares.
 */
let regexCodigo = /^[a-zA-Z0-9\-]+$/;
let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let regexCreditos = /^[0-9]+$/;

//Carga toda la lista de carreras
inputBuscar.value = '';
mostrarBusqueda()

/**
 * Descripción: breve descripción sobre la funcionalidad
 * @param: n/a
 * @return: n/a
 */
function obtenerDatos(){
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = inputCreditos.value;
    let dFechaCreacion = inputFecha.value;

    let bError = false;
    bError = validarRegistro();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la carrera, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = registrarCarrera(sCodigo , sNombre, nCreditos, dFechaCreacion);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
              });
        }else{
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        }
        limpiarFormulario();
        mostrarBusqueda();
        mostrarListaCarreras();  
        document.getElementById("buscar").click();
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
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = Number(inputCreditos.value);
    let dFechaCreacion = new Date(inputFecha.value);
    let dFechaActual = new Date();

    // Validación del input para código
    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false) ){
        inputCodigo.classList.add('errorInput');
        bError = true;
    }else{
        inputCodigo.classList.remove('errorInput');
    }

    // Validación del input para nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false) ){
        inputNombre.classList.add('errorInput');
        bError = true;
    }else{
        inputNombre.classList.remove('errorInput');
    }

    // Validación del input para créditos
    if(nCreditos == 0 || (regexCreditos.test(nCreditos) == false) ){
        inputCreditos.classList.add('errorInput');
        bError = true;
    }else{
        inputCreditos.classList.remove('errorInput');
    }

    // Validación del input para fecha
    if (dFechaCreacion == '' || dFechaCreacion > dFechaActual ){
        inputFecha.classList.add('errorInput');
        bError = true;
    }else{
        inputFecha.classList.remove('errorInput');
    }
    return bError;
}

/**
 * Descripción: Recibe la lista de carreras desde una petición al servicio
 * y los muestra en la tabla tblCarreras con un formato más adecuado para
 * el usuario.
 * @param: n/a
 * @return: n/a
 */
function mostrarListaCarreras(){
    let listaCarreras = obtenerCarreras();
    let tbody = document.querySelector('#tblCarreras tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaCarreras.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCreditos = fila.insertCell();
        let celdaFechaCreacion = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaCodigo.innerHTML = listaCarreras[i]['codigo'];
        celdaNombre.innerHTML = listaCarreras[i]['nombre'];
        celdaCreditos.innerHTML = listaCarreras[i]['creditos'];

        let dFecha = new Date(listaCarreras[i]['fechaCreacion']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        let bEstado = listaCarreras[i]['estado'];
        if(bEstado){
            celdaEstado.innerHTML = 'Activa';
        }else{
            celdaEstado.innerHTML = 'Inactiva';
        }
    }
};

/**
 * Descripción: Envía como parámetro el String al servicio para
 * obtener una lista de carreras cuyo nombre haga match, y las 
 * muestra en una tabla junto con las opciones para editar y 
 * eliminar.
 * @param: n/a
 * @return: n/a
 */
function mostrarBusqueda(){
    let listaCarreras = obtenerBusqueda(inputBuscar.value);

    let tbody = document.querySelector('#tblBusqueda tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaCarreras.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCreditos = fila.insertCell();
        let celdaFechaCreacion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaCodigo.innerHTML = listaCarreras[i]['codigo'];
        celdaNombre.innerHTML = listaCarreras[i]['nombre'];
        celdaCreditos.innerHTML = listaCarreras[i]['creditos'];
        
        let dFecha = new Date(listaCarreras[i]['fechaCreacion']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        let bEstado = listaCarreras[i]['estado'];
        if(bEstado){
            celdaEstado.innerHTML = 'Activa';
        }else{
            celdaEstado.innerHTML = 'Inactiva';
        }

        let botonEditar = document.createElement('a');
        botonEditar.href = '';
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');
        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.href = '#';
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');
        celdaEliminar.appendChild(botonEliminar);
    }
};

/**
 * Descripción: Limpia los inputs del formulario de registro
 * podiendo en '' cada uno de los campos.
 * @param: n/a
 * @return: n/a
 */
function limpiarFormulario(){
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCreditos.value = '';
    inputFecha.value = '';
};