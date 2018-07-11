'use strict';

let listaCursos = obtenerCursos();
mostrarBusqueda();

/**
 * Declaración de variables.
 */
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCreditos = document.querySelector('#txtCreditos');
let inputCarrera = document.querySelector('#txtCarrera');
let inputRequisitos = document.querySelector('#txtRequisitos');
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputBuscar = document.querySelector('#txtBuscarCodigo');

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', function(){
    mostrarBusqueda(inputBuscar.value)
});

/**
 * Declaración de expresiones regulares.
 */
let regexCodigo = /^[a-zA-Z0-9]+$/;
let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ0-9 ]+$/;
let regexCreditos = /^[0-9]+$/;

/**
 * Descripción: breve descripción sobre la funcionalidad
 * @param: n/a
 * @return: n/a
 */
function obtenerDatos(){
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = inputCreditos.value;
    let sCarrera = inputCarrera.value;
    let sRequisitos = inputRequisitos.value;

    let bError = false;
    bError = validarRegistro();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el curso, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    }else{
        let respuesta = registrarCurso(sCodigo , sNombre, nCreditos, sCarrera, sRequisitos);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            listaCursos = obtenerCursos();
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
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = inputCreditos.value;
    let sCarrera = inputCarrera.value;
    let sRequisitos = inputRequisitos.value;

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
//Validar Carrera
//Validar Requisitos
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

    for(let i = 0; i < listaCursos.length; i++){

        if( (listaCursos[i]['codigo'].toLowerCase()).includes(pFiltro.toLowerCase()) || (listaCursos[i]['nombre'].toLowerCase()).includes(pFiltro.toLowerCase())){
            let fila = tbody.insertRow();

            let celdaCodigo = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCreditos = fila.insertCell();
            let celdaCarrera = fila.insertCell();
            let celdaRequisitos = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();

            celdaCodigo.innerHTML = listaCursos[i]['codigo'];
            celdaNombre.innerHTML = listaCursos[i]['nombre'];
            celdaCreditos.innerHTML = listaCursos[i]['creditos'];
            celdaCarrera.innerHTML = listaCursos[i]['carrera'];
            celdaRequisitos.innerHTML = listaCursos[i]['requisitos'];

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
    }
};

/**
 * Descripción: Limpia los inputs del formulario de registro
 * podiendo '' en cada uno de los campos.
 * @param: n/a
 * @return: n/a
 */
function limpiarFormulario(){
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCreditos = '';
    inputCarrera.value = '';
    inputRequisitos.value = '';
};