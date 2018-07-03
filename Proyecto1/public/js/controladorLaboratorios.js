'use strict'

mostrarListaLaboratorios()
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCupos = document.querySelector('#txtCupos');
let inputEstado = document.querySelector('#rdEstado');

botonRegistrar.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCupos = Number(inputCupos.value);
    let bEstado = inputEstado.checked;

    //bError = validar();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el laboratorio, revise los campos en rojo',
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