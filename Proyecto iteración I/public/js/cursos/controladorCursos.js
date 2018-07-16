'use strict';

let sListaCursos = obtenerCursos();
let sListaCarreras = obtenerCarreras();
mostrarBusqueda();
mostrarCarreras();
mostrarRequisitos();

/**
 * Declaración de variables.
 */
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCreditos = document.querySelector('#txtCreditos');
let inputCarrera = document.querySelector('#txtCarrera');
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputBuscar = document.querySelector('#txtBuscar');

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
let regexCodigo = /^[a-zA-Z0-9\-]+$/;
let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ0-9 ]+$/;
let regexCreditos = /^[0-9]+$/;

/**
 * Descripción: Registra un curso con los datos obtenidos del usuario.
 */
function obtenerDatos(){
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = inputCreditos.value;
    let sCarrera = inputCarrera.value;
    let sListaRequisitos = [];

    let requisito = document.querySelectorAll('#lstRequisitos input[type=checkbox]');
    for (let i=0; i < requisito.length; i++) {
        if (requisito[i].checked){
            sListaRequisitos.push(requisito[i].value);
        }
    }
    console.log(sListaRequisitos);
    let a = JSON.stringify(sListaRequisitos);

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
        let respuesta = registrarCurso(sCodigo , sNombre, nCreditos, sCarrera, a);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            sListaCursos = obtenerCursos();
            mostrarBusqueda();
            mostrarRequisitos();
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
 * @return: {boolean} bError
 */
function validarRegistro(){
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = inputCreditos.value;
    let sCarrera = inputCarrera.value;

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
    return bError;
}

/**
 * Descripción: Filtra los cursos de una lista de cursos registradas cuyo nombre haga match, 
 * y las muestra en una tabla junto con las opciones para editar y eliminar.
 * @param: pFiltro
 */
function mostrarBusqueda(pFiltro){
    let tbody = document.querySelector('#tblBusqueda tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for(let i = 0; i < sListaCursos.length; i++){

        if( (sListaCursos[i]['codigo'].toLowerCase()).includes(pFiltro.toLowerCase()) || (sListaCursos[i]['nombre'].toLowerCase()).includes(pFiltro.toLowerCase())){
            let fila = tbody.insertRow();

            let celdaCodigo = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCreditos = fila.insertCell();
            let celdaCarrera = fila.insertCell();
            let celdaRequisitos = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();

            celdaCodigo.innerHTML = sListaCursos[i]['codigo'];
            celdaNombre.innerHTML = sListaCursos[i]['nombre'];
            celdaCreditos.innerHTML = sListaCursos[i]['creditos'];
            celdaCarrera.innerHTML = sListaCursos[i]['carrera'];

            let sRequisitos = '';
            sRequisitos = sListaCursos[i]['requisitos'].toString().replace("[", "");
            sRequisitos = sRequisitos.toString().replace("]", "");
            for(let j = 0; j < sRequisitos.length; j++) {
                sRequisitos = sRequisitos.toString().replace("\"", "");
            }

            if(sListaCursos[i]['requisitos'] == '[]'){
                celdaRequisitos.innerHTML = 'No tiene';
            }else{
                // for(let j = 0; j < sListaCursos[i]['requisitos'].length; j++){
                //     sRequisitos = sRequisitos + sListaCursos[i]['requisitos'][j];
                //     sRequisitos = sRequisitos + ', ';
                // }
                celdaRequisitos.innerHTML = sRequisitos;
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
    }
};

/**
 * Descripción: Limpia los inputs del formulario de registro
 * podiendo '' en cada uno de los campos.
 */
function limpiarFormulario(){
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCreditos = '';
    inputCarrera.value = '';
};

/**
 * Descripción: Agrega al html una lista de las carreras registradas.
 */
function mostrarCarreras(){
    let selectCarreras = document.querySelector('#lstCarreras');
    selectCarreras.innerHTML = '';
    for(let i=0; i < sListaCarreras.length; i++){
        let nuevaOpcion = new Option(sListaCarreras[i]['nombre']);
        nuevaOpcion.value = sListaCarreras[i]['nombre'];
        selectCarreras.appendChild(nuevaOpcion);
    }
};

/**
 * Descripción: Agrega al html una lista de cursos registrados.
 */
function mostrarRequisitos() {     
    let selectRequisitos = document.querySelector('#lstRequisitos');
    selectRequisitos.innerHTML = '';

    for (let i=0; i < sListaCursos.length; i++) { 

    let etiquetaRequisito = document.createElement('label');
    let requisito = document.createElement('input');

    requisito.setAttribute('type', 'checkbox');
    requisito.setAttribute('name', sListaCursos[i]['nombre']);
    requisito.setAttribute('value', sListaCursos[i]['codigo']);

    etiquetaRequisito.innerHTML = sListaCursos[i]['nombre'];
    etiquetaRequisito.setAttribute('for', sListaCursos[i]['nombre']);

    document.getElementById('lstRequisitos').appendChild(requisito);
    document.getElementById('lstRequisitos').appendChild(etiquetaRequisito);
    }
};