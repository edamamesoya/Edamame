'use strict'
mostrarListaCarreras()
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCreditos = document.querySelector('#txtCreditos');
let inputFecha = document.querySelector('#txtFecha');
let inputEstado = document.querySelector('#rdEstado');

botonRegistrar.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = inputCreditos.value;
    let dFechaCreacion = inputFecha.value;
    let bEstado = inputEstado.checked;

    //bError = validar();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la carrera, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = registrarCarrera(sCodigo , sNombre, nCreditos, dFechaCreacion, bEstado);
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
        mostrarListaCarreras();  
    }
};

function mostrarListaCarreras(){
    let listaCarreras = obtenerCarreras();
    let tbody = document.querySelector('#tblCarreras tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaCarreras.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCreditos = fila.insertCell();
        let celdaFechaCreacion = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaCodigo.innerHTML = listaCarreras[i]['codigo'];
        celdaNombre.innerHTML = listaCarreras[i]['nombre'];
        celdaCreditos.innerHTML = listaCarreras[i]['creditos'];
        celdaFechaCreacion.innerHTML = listaCarreras[i]['fechaCreacion'];
        celdaEstado.innerHTML = listaCarreras[i]['estado'];
    }
};