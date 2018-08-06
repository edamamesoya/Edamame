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

function obtenerDatos() {
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
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
        celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];
        celdaEstado.innerHTML = listaSolicitudes[i]['estado'];

        let botonEditar = document.createElement('a');
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');

        botonEditar.dataset.id = listaSolicitudes[i]['_id'];
        botonEditar.addEventListener('click', editar);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');

        botonEliminar.dataset.id = listaSolicitudes[i]['_id'];
        botonEliminar.addEventListener('click', eliminar);

        celdaEliminar.appendChild(botonEliminar);
    }

    if (listaSolicitudes.length == 0) {
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    } else {
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
};

function mostrarCursos() {
    let selectCursos = document.getElementById('txtCursos');
    selectCursos.innerHTML = '';

    for (let i = 0; i < sListaCursos.length; i++) {
        let sCurso = sListaCursos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCurso;
        nuevaOpcion.value = sCurso;
        selectCursos.add(nuevaOpcion);
    }
};

function limpiarFormulario() {
    inputNombre.value = '';
    selectCursos.value = '';
};

function eliminar() {
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar la solicitud?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.value) {
            eliminarSolicitud(id);
            listaSolicitudes = obtenerSolicitudes();
            mostrarBusqueda();
            swal(
                'Eliminada!',
                'La solicitud ha sido eliminado.',
                'success'
            )
        }
    })
};

function editar() {
    let id = this.dataset.id;

    document.getElementById("modificar").click();
    let solicitud = obtenerSolicitudPorId(id);

    inputEditarNombre.value = solicitud['nombre'];
    inputEditarProfe.value = solicitud['profe'];
    inputEstado.value = solicitud['estado'];
    inputId.value = solicitud['_id'];
};

function mostrarEditarCursos() {
    let selectCursos = document.getElementById('txtEditarCursos');
    selectCursos.innerHTML = '';

    for (let i = 0; i < sListaCursos.length; i++) {
        let sCurso = sListaCursos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCurso;
        nuevaOpcion.value = sCurso;
        selectCursos.add(nuevaOpcion);
    }
};