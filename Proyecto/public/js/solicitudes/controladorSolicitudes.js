'use strict';

let sListaCursos = obtenerCursos();

mostrarListaSolicitudes();
mostrarCursos();

let inputNombre = document.querySelector('#txtNombre');
let selectCursos = document.querySelector('#txtCursos');
let botonRegistrar = document.querySelector('#btnRegistrar')

botonRegistrar.addEventListener('click', obtenerDatos);

let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;


let sNombre = '';

function obtenerDatos(){
    let curso = selectCursos.value;
    let sNombre = inputNombre.value;

    let bError = false;
    bError = validar();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la solicitud, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarSolicitud(curso, sNombre);
        if (respuesta.success == true) {
            swal({
                title: 'Registro Correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
            mostrarListaSolicitudes();
            document.getElementById("buscar").click();
        } else {
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }
};

function validar() {
    let bError = false;

    sNombre = inputNombre.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true;
    } else {
        inputNombre.classList.remove('errorInput');
    }

    return bError;
};

function mostrarListaSolicitudes() {
    let listaSolicitudes = obtenerSolicitudes();
    let tbody = document.querySelector('#tblSolicitudes tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaSolicitudes.length; i++) {
        let fila = tbody.insertRow();


        let celdaNombre = fila.insertCell();
        let celdaCurso = fila.insertCell();

        celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
        celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];

    }
};

function mostrarCursos(){
    let selectCursos = document.getElementById('txtCursos');
    selectCursos.innerHTML = '';

    for(let i=0; i < sListaCursos.length; i++){
        let sCurso = sListaCursos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCurso;
        nuevaOpcion.value = sCurso;
        selectCursos.add(nuevaOpcion);
    }
};

function limpiarFormulario(){
    inputNombre.value = '';
    selectCursos.value = '';
};