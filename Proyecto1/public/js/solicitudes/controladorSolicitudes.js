'use strict';

let sListaCursos = obtenerCursos();

mostrarListaSolicitudes()
mostrarCursos()

document.getElementById("defaultOpen").click();

let inputNombre = document.querySelector('#txtNombre');
let selectCursos = document.querySelector('#txtCurso');
let botonRegistrar = document.querySelector('#btnRegistrar')

botonRegistrar.addEventListener('click', obtenerDatos);

let reglaLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;


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
        } else {
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }
    mostrarListaSolicitudes();
};

function validar() {
    let bError = false;

    sNombre = inputNombre.value;

    //validar nombre
    if (sNombre == '' || (reglaLetras.test(sNombre) == false)) {
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

function abrirFuncion(evt, funcion) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(funcion).style.display = "block";
    evt.currentTarget.className += " active";
};

function mostrarCursos(){
    let selectCursos = document.querySelector('#lstCursos');
    selectCursos.innerHTML = '';
    for(let i=0; i < sListaCursos.length; i++){
        let nuevaOpcion = new Option(sListaCursos[i]['nombre']);
        nuevaOpcion.value = sListaCursos[i]['nombre'];
        selectCursos.appendChild(nuevaOpcion);
    }
};