'use strict'

mostrarListaPeriodos();

let botonRegistrar = document.querySelector('#btnRegistrar');
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputFechaInicio = document.querySelector('#txtFechaInicio');
let inputFechaConclusion = document.querySelector('#txtFechaConclusion')
let inputEstado = document.querySelector('#rdEstado');
let inputBuscar = document.querySelector('#txtBuscar');

botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', mostrarBusquedaPeriodos);

//Regex//
let regexCodigo = /^[a-zA-Z0-9\-\_ ]+$/;
let regexNombre = /^[a-zA-Z0-9 ]+$/;
//Fin Regex//

inputBuscar.value = '';
mostrarBusquedaPeriodos();
recomendarFecha();

function obtenerDatos() {
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let dFechaInicio = new Date(inputFechaInicio.value);
    let dFechaConclusion = new Date(inputFechaConclusion.value)
    let bEstado = true;
    bError = validar();

    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el periodo. Por favor, revise los campos en rojo.',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarPeriodo(sCodigo, sNombre, dFechaInicio, dFechaConclusion, bEstado);
        if (respuesta.success == true) {
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
        } else {
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        }
        limpiarFormulario();
        mostrarBusquedaPeriodos();
        mostrarListaPeriodos();
        document.getElementById("buscar").click();
    }
};

function mostrarListaPeriodos() {
    let listaPeriodos = obtenerPeriodos();
    let tbody = document.querySelector('#tblPeriodos tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaPeriodos.length; i++) {
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaFechaInicio = fila.insertCell();
        let celdaFechaConclusion = fila.insertCell();
        let celdaEstado = fila.insertCell();

        let dFechaInicio = new Date(listaPeriodos[i]['fechainicio']);
        let nMesInicio = dFechaInicio.getUTCMonth() + 1;
        let nDiaInicio = dFechaInicio.getUTCDate();
        let nAnnoInicio = dFechaInicio.getUTCFullYear();
        celdaCodigo.innerHTML = listaPeriodos[i]['codigo'];
        celdaNombre.innerHTML = listaPeriodos[i]['nombre'];
        celdaFechaInicio.innerHTML = nDiaInicio + '/' + nMesInicio + '/' + nAnnoInicio;

        let dFechaConclusion = new Date(listaPeriodos[i]['fechaconclusion']);
        let nMesConclusion = dFechaConclusion.getUTCMonth() + 1;
        let nDiaConclusion = dFechaConclusion.getUTCDate();
        let nAnnoConclusion = dFechaConclusion.getUTCFullYear();
        celdaFechaConclusion.innerHTML = nDiaConclusion + '/' + nMesConclusion + '/' + nAnnoConclusion;

        let bEstado = listaPeriodos[i]['estado'];
        if (bEstado) {
            celdaEstado.innerHTML = 'Activo';
        } else {
            celdaEstado.innerHTML = 'Inactivo';
        }
    }
};

function validar() {
    let listaPeriodos = obtenerPeriodos();
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let dFechaInicio = new Date(inputFechaInicio.value);
    let dFechaConclusion = new Date(inputFechaConclusion.value);
    let dFechaActual = new Date();
    let bCoincidenciaCodigo = false;

    for (let i = 0; i < listaPeriodos.length; i++) {
        if (sCodigo == '' || (regexCodigo.test(sCodigo) == false) || sCodigo == listaPeriodos[i]['codigo']) {
            bCoincidenciaCodigo = true;
        }
    };

    if (bCoincidenciaCodigo == true) {
        inputCodigo.classList.add('errorInput');
        bError = true;
    } else {
        inputCodigo.classList.remove('errorInput');
    };

    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true
    } else {
        inputNombre.classList.remove('errorInput');
    };

    if (inputFechaInicio.value == '' || dFechaInicio < new Date(listaPeriodos[(listaPeriodos.length - 1)]['fechaconclusion'])){
        inputFechaInicio.classList.add('errorInput');
        bError = true
    } else {
        inputFechaInicio.classList.remove('errorInput');
    };

    if (inputFechaConclusion.value == '' || dFechaConclusion <= dFechaInicio) {
        inputFechaConclusion.classList.add('errorInput');
        bError = true
    } else {
        inputFechaConclusion.classList.remove('errorInput');
    };

    return bError;
};

function mostrarBusquedaPeriodos() {
    let listaPeriodos = obtenerBusquedaPeriodos(inputBuscar.value);

    let tbody = document.querySelector('#tblBusqueda tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaPeriodos.length; i++) {
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaFechaInicio = fila.insertCell();
        let celdaFechaConclusion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaCodigo.innerHTML = listaPeriodos[i]['codigo'];
        celdaNombre.innerHTML = listaPeriodos[i]['nombre'];

        let dFechaInicio = new Date(listaPeriodos[i]['fechainicio']);
        let nMesInicio = dFechaInicio.getUTCMonth() + 1;
        let nDiaInicio = dFechaInicio.getUTCDate();
        let nAnnoInicio = dFechaInicio.getUTCFullYear();
        celdaCodigo.innerHTML = listaPeriodos[i]['codigo'];
        celdaNombre.innerHTML = listaPeriodos[i]['nombre'];
        celdaFechaInicio.innerHTML = nDiaInicio + '/' + nMesInicio + '/' + nAnnoInicio;

        let dFechaConclusion = new Date(listaPeriodos[i]['fechaconclusion']);
        let nMesConclusion = dFechaConclusion.getUTCMonth() + 1;
        let nDiaConclusion = dFechaConclusion.getUTCDate();
        let nAnnoConclusion = dFechaConclusion.getUTCFullYear();
        celdaFechaConclusion.innerHTML = nDiaConclusion + '/' + nMesConclusion + '/' + nAnnoConclusion;

        let bEstado = listaPeriodos[i]['estado'];
        if (bEstado) {
            celdaEstado.innerHTML = 'Activo';
        } else {
            celdaEstado.innerHTML = 'Inactivo';
        }

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


function limpiarFormulario() {
    inputCodigo.value = '';
    inputNombre.value = '';
    inputFechaInicio.valueAsDate = new Date();
    inputFechaConclusion.value = '';
};

function recomendarFecha() {
    inputCodigo.value
    inputFechaInicio.valueAsDate = new Date();

}