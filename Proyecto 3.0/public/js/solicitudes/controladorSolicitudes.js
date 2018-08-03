'use strict';

let sListaSolicitudes = obtenerSolicitudes();
let sListaSedes = obtenerSedes();
let sListaPeriodos = obtenerPeriodos();
let sListaGrupos = obtenerGrupos();
let sListaCursos = obtenerCursos();

mostrarListaSolicitudes();
mostrarSedes();
mostrarPeriodos();
mostrarGrupos();
mostrarCursos();

let inputNombre = document.querySelector('#txtNombre');
let selectSedes = document.querySelector('#txtSedes');
let selectPeriodos = document.querySelector('#txtPeriodos');
let selectGrupos = document.querySelector('#txtGrupos');
let selectCursos = document.querySelector('#txtCursos');
let botonRegistrar = document.querySelector('#btnRegistrar')

botonRegistrar.addEventListener('click', obtenerDatos);

let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;


let sNombre = '';

function obtenerDatos(){
    let sede = selectSedes.value;
    let periodo = selectPeriodos.value;
    let grupo = selectGrupos.value;
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
        let respuesta = registrarSolicitud(sede, periodo, grupo, curso, sNombre);
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

function mostrarSedes(){
    let selectSedes = document.getElementById('txtSedes');
    selectSedes.innerHTML = '';

    for(let i=0; i < sListaSedes.length; i++){
        let sSede = sListaSedes[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sSede;
        nuevaOpcion.value = sSede;
        selectSedes.add(nuevaOpcion);
    }
};

function mostrarPeriodos(){
    let selectPeriodos = document.getElementById('txtPeriodos');
    selectPeriodos.innerHTML = '';

    for(let i=0; i < sListaPeriodos.length; i++){
        let sPeriodo = sListaPeriodos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sPeriodo;
        nuevaOpcion.value = sPeriodo;
        selectPeriodos.add(nuevaOpcion);
    }
};


function mostrarGrupos(){
    let selectGrupos = document.getElementById('txtGrupos');
    selectGrupos.innerHTML = '';

    for(let i=0; i < sListaGrupos.length; i++){
        let sGrupo = sListaGrupos[i]['numeroGrupo'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sGrupo;
        nuevaOpcion.value = sGrupo;
        selectGrupos.add(nuevaOpcion);
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

function mostrarListaSolicitudes() {
    let listaSolicitudes = obtenerSolicitudes();
    let tbody = document.querySelector('#tblSolicitudes tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaSolicitudes.length; i++) {
        let fila = tbody.insertRow();


        let celdaNombre = fila.insertCell();
        let celdaCurso = fila.insertCell();
        let celdaGrupo = fila.insertCell();
        let celdaPeriodo = fila.insertCell();
        let celdaSede = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
        celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];
        celdaGrupo.innerHTML = listaSolicitudes[i]['grupos'];
        celdaPeriodo.innerHTML = listaSolicitudes[i]['periodos'];
        celdaSede.innerHTML = listaSolicitudes[i]['sedes'];

        let botonEditar = document.createElement('a');
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');


        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');


        celdaEliminar.appendChild(botonEliminar);

    }
};

function limpiarFormulario(){
    inputNombre.value = '';
    selectSedes.value = '';
    selectPeriodos.value = '';
    selectGrupos.value = '';
    selectCursos.value = '';
};