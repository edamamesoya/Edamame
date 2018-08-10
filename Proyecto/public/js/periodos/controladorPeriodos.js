'use strict'

let ListaPeriodos = obtenerPeriodos();
mostrarListaPeriodos();

let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputFechaInicio = document.querySelector('#txtFechaInicio');
let inputFechaConclusion = document.querySelector('#txtFechaConclusion')

const inputEditarCodigo = document.querySelector('#txtEditarCodigo');
const inputEditarNombre = document.querySelector('#txtEditarNombre');
const inputEditarFechaInicio = document.querySelector('#txtEditarFechaInicio');
const inputEditarFechaConclusion = document.querySelector('#txtEditarFechaConclusion');
const chkEstado = document.querySelector('#chkEstado');

const inputId = document.querySelector('#txtId');

const inputBuscar = document.querySelector('#txtBuscar');
const botonRegistrar = document.querySelector('#btnRegistrar');
const botonModificar = document.querySelector('#btnEditar');

botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);
inputBuscar.addEventListener('keyup', mostrarBusquedaPeriodos);

limpiarFormulario();

//Regex//
let regexCodigo = /^[a-zA-Z0-9\-\_ ]+$/;
let regexNombre = /^[a-zA-Z0-9 ]+$/;
//Fin Regex//

inputBuscar.value = '';
mostrarBusquedaPeriodos();

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
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
        limpiarFormulario();
        location.reload();
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
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

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

        botonEditar.dataset.id = ListaPeriodos[i]['_id'];
        botonEditar.addEventListener('click', editar);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');

        botonEliminar.dataset.id = ListaPeriodos[i]['_id'];
        botonEliminar.addEventListener('click', eliminar);

        celdaEliminar.appendChild(botonEliminar);
    }
    if (ListaPeriodos.length == 0) {
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    } else {
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
};

function validar() {
    let listaPeriodos = obtenerPeriodos();
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let dFechaInicio = new Date(inputFechaInicio.value);
    let dFechaConclusion = new Date(inputFechaConclusion.value);
    let dFechaConclusionPasada = new Date(listaPeriodos[listaPeriodos.length - 1]['fechaconclusion']);

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

    if (inputFechaInicio.value == '' || dFechaInicio < dFechaConclusionPasada) {
        inputFechaInicio.classList.add('errorInput');
        bError = true
    } else {
        inputFechaInicio.classList.remove('errorInput');
    }



    if (inputFechaConclusion.value == '' || dFechaConclusion < dFechaInicio) {
        inputFechaConclusion.classList.add('errorInput');
        bError = true
    } else {
        inputFechaConclusion.classList.remove('errorInput');
    }

    return bError;
};

function validarRegistroModificar() {
    let bError = false;
    let sCodigo = inputEditarCodigo.value;
    let sNombre = inputEditarNombre.value;

    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false)) {
        inputEditarCodigo.classList.add('errorInput');
        bError = true;
    } else {
        inputEditarCodigo.classList.remove('errorInput');
    }

    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputEditarNombre.classList.add('errorInput');
        bError = true
    } else {
        inputEditarNombre.classList.remove('errorInput');
    }

    if (inputEditarFechaInicio.value == '') {
        inputEditarFechaInicio.classList.add('errorInput');
        bError = true
    } else {
        inputEditarFechaInicio.classList.remove('errorInput');
    }

    if (inputEditarFechaConclusion.value == '') {
        inputEditarFechaConclusion.classList.add('errorInput');
        bError = true
    } else {
        inputEditarFechaConclusion.classList.remove('errorInput');
    }

    return bError;
}

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

        botonEditar.dataset.id = ListaPeriodos[i]['_id'];
        botonEditar.addEventListener('click', editar);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');

        botonEliminar.dataset.id = ListaPeriodos[i]['_id'];
        botonEliminar.addEventListener('click', eliminar);

        celdaEliminar.appendChild(botonEliminar);
    }

    if (ListaPeriodos.length == 0) {
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    } else {
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }

};


function limpiarFormulario() {
    let listaPeriodos = obtenerPeriodos();
    let dFechaActual = new Date();
    if (listaPeriodos.length > 0) {
        let dFechaConclusionPasada = new Date(listaPeriodos[listaPeriodos.length - 1]['fechaconclusion']);
        inputCodigo.value = '';
        inputNombre.value = '';
        if (dFechaActual > dFechaConclusionPasada) {
            inputFechaInicio.valueAsDate = dFechaActual;
        } else {
            inputFechaInicio.valueAsDate = dFechaConclusionPasada;
        }
    } else {
        inputFechaInicio.valueAsDate = dFechaActual;
    }
};

function limpiarFormularioModificar() {
    inputEditarCodigo.value = '';
    inputEditarNombre.value = '';
    inputEditarFechaInicio.value = '';
    inputEditarFechaConclusion.value = '';
};

function eliminar() {
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar el periodo?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.value) {
            eliminarPeriodo(id);
            ListaPeriodos = obtenerPeriodos();
            mostrarBusquedaPeriodos();
            mostrarListaPeriodos();
            swal(
                'Eliminada!',
                'El periodo ha sido eliminado.',
                'success'
            )
        }
    })
};

function editar() {
    let id = this.dataset.id;

    document.getElementById("modificar").click();
    let periodo = obtenerPeriodoPorId(id);

    inputEditarCodigo.value = periodo['codigo'];
    inputEditarNombre.value = periodo['nombre'];
    inputEditarFechaInicio.valueAsDate = new Date(periodo['fechainicio']);
    inputEditarFechaConclusion.valueAsDate = new Date(periodo['fechaconclusion']);
    chkEstado.checked = periodo['estado'];
    inputId.value = periodo['_id'];
};

function modificarDatos() {
    let sCodigo = inputEditarCodigo.value;
    let sNombre = inputEditarNombre.value;
    let dFechaInicio = inputEditarFechaInicio.value;
    let dFechaConclusion = inputEditarFechaConclusion.value;
    let sEstado = chkEstado.checked;
    let sId = inputId.value;

    let bError = false;
    bError = validarRegistroModificar();

    if (bError == true) {
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo modificar el periodo, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = actualizarPeriodo(sId, sCodigo, sNombre, dFechaInicio, dFechaConclusion, sEstado);
        if (respuesta.success == true) {
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            ListaPeriodos = obtenerPeriodos();
            limpiarFormularioModificar();
            location.reload();
            mostrarBusquedaPeriodos();
            mostrarListaPeriodos();
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