'use strict';

let listaSedes = obtenerSedes();
mostrarSedes();
mostrarListaLaboratorios();

let botonRegistrar = document.querySelector('#btnRegistrar');
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCupo = document.querySelector('#txtCupos');
let selectSede = document.querySelector('#txtSede');
const chkEstado = document.querySelector('#chkEstado');
let inputBuscar = document.querySelector('#txtBuscar');
const botonModificar = document.querySelector('#btnEditar');
const inputEditarCodigo = document.querySelector('#txtEditarCodigo');
const inputEditarNombre = document.querySelector('#txtEditarNombre');
const inputEditarCupo = document.querySelector('#txtEditarCupo');
const selectEditarSede = document.querySelector('#txtEditarSede');

const inputId = document.querySelector('#txtId');

botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);
inputBuscar.addEventListener('keyup', mostrarBusquedaLaboratorios);

//Regex//
let regexCodigo = /^[a-zA-Z0-9 -_]+$/;
let regexNombre = /^[a-zA-Z0-9 ]+$/;
let regexCupo = /^[0-9]+$/;
//Fin Regex//

inputBuscar.value = '';
mostrarBusquedaLaboratorios();

function obtenerDatos() {
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCupo = Number(inputCupo.value);
    let sSede = selectSede.value;
    let bEstado = true;
    bError = validar();

    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el laboratorio. Por favor, revise los campos en rojo.',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarLaboratorio(sCodigo, sNombre, nCupo, sSede, bEstado);
        if (respuesta.success == true) {
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
            mostrarBusquedaLaboratorios();
            mostrarListaLaboratorios();
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

function mostrarListaLaboratorios() {
    let listaLaboratorios = obtenerLaboratorios();
    let tbody = document.querySelector('#tblLaboratorios tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaLaboratorios.length; i++) {
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCupo = fila.insertCell();
        let celdaSede = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaCodigo.innerHTML = listaLaboratorios[i]['codigo'];
        celdaNombre.innerHTML = listaLaboratorios[i]['nombre'];
        celdaCupo.innerHTML = listaLaboratorios[i]['cupo'];
        celdaSede.innerHTML = listaLaboratorios[i]['sede'];


        let bEstado = listaLaboratorios[i]['estado'];
        if (bEstado) {
            celdaEstado.innerHTML = 'Activo';
        } else {
            celdaEstado.innerHTML = 'Inactivo';
        }
        let botonEditar = document.createElement('a');
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');

        botonEditar.dataset.id = listaLaboratorios[i]['_id'];
        botonEditar.addEventListener('click', editar);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');

        botonEliminar.dataset.id = listaLaboratorios[i]['_id'];
        botonEliminar.addEventListener('click', eliminar);

        celdaEliminar.appendChild(botonEliminar);
    }
    if (listaLaboratorios.length == 0) {
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    } else {
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
};

function mostrarSedes() {
    let selectSede = document.getElementById('txtSede');
    selectSede.innerHTML = '';
    let selectEditarSede = document.getElementById('txtEditarSede');

    for (let i = 0; i < listaSedes.length; i++) {
        let sSede = listaSedes[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sSede;
        nuevaOpcion.value = sSede;
        selectSede.add(nuevaOpcion);
    }

    for (let i = 0; i < listaSedes.length; i++) {
        let sSede = listaSedes[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sSede;
        nuevaOpcion.value = sSede;
        selectEditarSede.add(nuevaOpcion);
    }
};

function validar() {
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCupo = inputCupo.value;
    let sSede = selectSede.value;

    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false)) {
        inputCodigo.classList.add('errorInput');
        bError = true;
    } else {
        inputCodigo.classList.remove('errorInput');
    }

    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true
    } else {
        inputNombre.classList.remove('errorInput');
    }

    if (nCupo == 0 || (regexCupo.test(nCupo) == false)) {
        inputCupo.classList.add('errorInput');
        bError = true
    } else {
        inputCupo.classList.remove('errorInput');
    }

    if (sSede == '') {
        selectSede.classList.add('errorInput');
        bError = true;
    } else {
        selectSede.classList.remove('errorInput');
    }

    return bError
};

function validarRegistroModificar() {
    let bError = false;
    let sCodigo = inputEditarCodigo.value;
    let sNombre = inputEditarNombre.value;
    let nCupo = inputEditarCupo.value;
    let sSede = selectEditarSede.value;

    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false)) {
        inputCodigo.classList.add('errorInput');
        bError = true;
    } else {
        inputCodigo.classList.remove('errorInput');
    }

    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true
    } else {
        inputNombre.classList.remove('errorInput');
    }

    if (nCupo == 0 || (regexCupo.test(nCupo) == false)) {
        inputCupo.classList.add('errorInput');
        bError = true
    } else {
        inputCupo.classList.remove('errorInput');
    }

    if (sSede == '') {
        selectEditarSede.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarSede.classList.remove('errorInput');
    }

    return bError
};


function mostrarBusquedaLaboratorios() {
    let listaLaboratorios = obtenerBusquedaLaboratorios(inputBuscar.value);

    let tbody = document.querySelector('#tblBusqueda tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaLaboratorios.length; i++) {
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCupo = fila.insertCell();
        let celdaSede = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaCodigo.innerHTML = listaLaboratorios[i]['codigo'];
        celdaNombre.innerHTML = listaLaboratorios[i]['nombre'];
        celdaCupo.innerHTML = listaLaboratorios[i]['cupo'];
        celdaSede.innerHTML = listaLaboratorios[i]['sede'];

        let bEstado = listaLaboratorios[i]['estado'];
        if (bEstado) {
            celdaEstado.innerHTML = 'Activo';
        } else {
            celdaEstado.innerHTML = 'Inactivo';
        }

        let botonEditar = document.createElement('a');
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');

        botonEditar.dataset.id = listaLaboratorios[i]['_id'];
        botonEditar.addEventListener('click', editar);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');

        botonEliminar.dataset.id = listaLaboratorios[i]['_id'];
        botonEliminar.addEventListener('click', eliminar);

        celdaEliminar.appendChild(botonEliminar);
    }
    if (listaLaboratorios.length == 0) {
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    } else {
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
};

function limpiarFormulario() {
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCupo.value = '';
    selectSede.value = '';
};

function eliminar() {
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar el laboratorio?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.value) {
            eliminarLaboratorio(id);
            listaLaboratorios = obtenerLaboratorios();
            mostrarBusquedaLaboratorios();
            mostrarListaLaboratorios();
            swal(
                'Eliminado!',
                'El laboratorio ha sido eliminado.',
                'success'
            )
        }
    })
};

function editar() {
    let id = this.dataset.id;

    document.getElementById("modificar").click();
    let laboratorio = obtenerLaboratorioPorId(id);

    inputEditarCodigo.value = laboratorio['codigo'];
    inputEditarNombre.value = laboratorio['nombre'];
    inputEditarCupo.value = laboratorio['cupo'];
    selectEditarSede.value = laboratorio['sede'];
    chkEstado.checked = laboratorio['estado'];
    inputId.value = laboratorio['_id'];
};

function modificarDatos() {
    let sCodigo = inputEditarCodigo.value;
    let sNombre = inputEditarNombre.value;
    let nCupo = inputEditarCupo.value;
    let sSede = selectEditarSede;
    let sEstado = chkEstado.checked;
    let sId = inputId.value;

    let bError = false;
    bError = validarRegistroModificar();

    if (bError == true) {
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo modificar el laboratorio, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = actualizarLaboratorio(sId, sCodigo, sNombre, nCupo, sSede, sEstado);
        if (respuesta.success == true) {
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            ListaLaboratorios = obtenerLaboratorios();
            limpiarFormularioModificar();
            location.reload();
            mostrarBusquedaLaboratorios();
            mostrarListaLaboratorios();
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