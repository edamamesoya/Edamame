'use strict';

let listaSedes = obtenerSedes();
mostrarSedes();
mostrarListaLaboratorios();

const botonRegistrar = document.querySelector('#btnRegistrar');
const botonEditar = document.querySelector('#btnEditar');
const botonEliminar = document.querySelector('#btnEliminar');

let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCupo = document.querySelector('#txtCupos');
let selectSede = document.querySelector('#txtSede');
let inputEstado = document.querySelector('#rdEstado');
let inputBuscar = document.querySelector('#txtBuscar');

botonRegistrar.addEventListener('click', obtenerDatos);
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
    }
};

function mostrarSedes() {
    let selectSede = document.getElementById('txtSede');
    selectSede.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {
        let sSede = listaSedes[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sSede;
        nuevaOpcion.value = sSede;
        selectSede.add(nuevaOpcion);
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

    return bError
}

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
        botonEditar.dataset._id = listaLaboratorios[i]['_id'];

        botonEditar.addEventListener('click', buscar_por_id);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.href = '#';
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');
        botonEliminar.dataset._id = listaLaboratorios[i]['_id'];

        botonEliminar.addEventListener('click', remover_laboratorio);

        celdaEliminar.appendChild(botonEliminar);
    }
};

function limpiarFormulario() {
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCupo.value = '';
    selectSede.value = '';
};

function obtenerDatosEditar() {

    let bError = false;

    let sNombre = inputNombre.value;
    let sCodigo = inputCodigo.value;
    let sTelefono = inputTelefono.value;
    let nCupo = Number(inputCupo.value);
    let _id = inputId.value;




    // bError = validar();
    if (bError == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar el laboratorio',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
        console.log('No se pudo registrar el laboratorio');
    } else {

        editarPersona(_id, sCodigo, sNombre, sTelefono, nCupo, elementoImagen.src);
        swal({
            type: 'success',
            title: 'Actualización exitosa',
            text: 'El laboratorio se actualizó adecuadamente',
            confirmButtonText: 'Entendido'
        });
        listaLaboratorios = obtenerLaboratorios();
        mostrarListaLaboratorios();
        limpiarFormulario();
        botonRegistrar.hidden = false;
        botonEditar.hidden = true;

    }

};

function buscar_por_id(){
    //Binding
    let _id = this.dataset._id;
    botonRegistrar.hidden = true;
    botonEditar.hidden = false;
    let laboratorio = obtener_persona_por_id(_id);


    inputNombre.value = laboratorio['nombre_completo'];    
    inputCodigo.value = laboratorio['correo'];
    inputTelefono.value = laboratorio['telefono'];
    inputCupo.value = laboratorio['edad'];
    elementoImagen.src = laboratorio['foto'];
    inputId.value = laboratorio['_id'];
};

function remover_laboratorio(){
    let _id = this.dataset._id;
    swal({
        title: 'Está seguro?',
        text: "El laboratorio se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
      }).then((result) => {
        if (result.value) {
            eliminar_laboratorio(_id);
            listaLaboratorios = obtenerListaLaboratorios();
            mostrarListaLaboratorios();
          swal(
            'Eliminado!',
            'El laboratorio ha sido eliminado con éxito',
            'success'
          )
        }
      });
   
}