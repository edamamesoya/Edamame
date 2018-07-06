'use strict'

mostrarListaLaboratorios()

let botonRegistrar = document.querySelector('#btnRegistrar');
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCupos = document.querySelector('#txtCupos');
let inputEstado = document.querySelector('#rdEstado');
let inputBuscar = document.querySelector('#txtBuscarCodigo');

botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', mostrarBusquedaLaboratorios);

//Regex//
let regexCodigo = /^[a-zA-Z0-9]+$/;
let regexCupos = /^[0-9]+$/;
let regexNombre = /^[a-zA-Z ]+$/;
//Fin Regex//

function obtenerDatos(){
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCupos = Number(inputCupos.value);
    let bEstado = inputEstado.checked;
    bError = validar();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el laboratorio. Por favor, revise los campos en rojo.',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = registrarLaboratorio(sCodigo , sNombre, nCupos, bEstado);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
              });
        }else{
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        }
        limpiarFormulario();
        mostrarListaLaboratorios();  
    }
};

function mostrarListaLaboratorios(){
    let listaLaboratorios = obtenerLaboratorios();
    let tbody = document.querySelector('#tblLaboratorios tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaLaboratorios.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCupos = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaCodigo.innerHTML = listaLaboratorios[i]['codigo'];
        celdaNombre.innerHTML = listaLaboratorios[i]['nombre'];
        celdaCupos.innerHTML = listaLaboratorios[i]['cupos'];
        celdaEstado.innerHTML = listaLaboratorios[i]['estado'];
    }
};

function validar(){
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCupos = inputCupos.value;

    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false)){
        inputCodigo.classList.add('errorInput');
        bError = true;
    }else{
        inputCodigo.classList.remove('errorInput');
    }

    if (sNombre == '' || (regexNombre.test(sNombre) == false)){
        inputNombre.classList.add('errorInput');
        bError = true
    }else{
        inputNombre.classList.remove('errorInput');
    }

    if(nCupos == 0 || (regexCupos.test(nCupos) == false)){
        inputCupos.classList.add('errorInput');
        bError = true
    }else{
        inputCupos.classList.remove('errorInput');
    }

    return bError;
}

function mostrarBusquedaLaboratorios(){
    let listaLaboratorios = obtenerBusquedaLaboratorios(inputBuscar.value);

    let tbody = document.querySelector('#tblBusqueda tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaLaboratorios.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCupos = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaCodigo.innerHTML = listaLaboratorios[i]['codigo'];
        celdaNombre.innerHTML = listaLaboratorios[i]['nombre'];
        celdaCupos.innerHTML = listaLaboratorios[i]['cupos'];

        let bEstado = listaLaboratorios[i]['estado'];
        if(bEstado){
            celdaEstado.innerHTML = 'Activo';
        }else{
            celdaEstado.innerHTML = 'Inactivo';
        }

        let botonEditar = document.createElement('a');
        botonEditar.href = '#';
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');
        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.href = '#';
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');
        celdaEliminar.appendChild(botonEliminar);
    }
};

function abrirFuncion(evt, funcion) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabContent");
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

function limpiarFormulario(){
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCupos.value = '';
};