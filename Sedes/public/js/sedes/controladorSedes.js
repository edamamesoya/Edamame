'use strict';

let listaSedes = obtenerSedes();
mostrarListaSedes()

document.getElementById("defaultOpen").click();

let inputNombre = document.querySelector('#txtNombre');
let inputProvincia = document.querySelector('#txtProvincia');
let inputCanton = document.querySelector('#txtCanton');
let inputDistrito = document.querySelector('#txtDistrito');
let botonRegistrar = document.querySelector('#btnRegistrar');


let sNombre = '';
let nNumeroProvincia = 0;
let nNumeroCanton = 0;
let nNumeroDistrito = 0;

let sListaProvincias = [];
let sListaCantones = [];
let sListaDistritos = [];

sListaProvincias = obtenerProvincias();
sListaCantones = obtenerCantones();
sListaDistritos = obtenerDistritos();

mostrarProvincias();
mostrarCantones();
mostrarDistritos();

inputProvincia.addEventListener('change', setNumeroProvincia);
inputCanton.addEventListener('change', setNumeroCanton);
botonRegistrar.addEventListener('click', obtenerDatos);

let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;

function obtenerDatos(){
    let sNombre = inputNombre.value;
    let sProvincia = inputProvincia.value;
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;

    let bError = false;
    bError = validar();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la sede, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarSede(sNombre, sProvincia, sCanton, sDistrito);
        if (respuesta.success == true) {
            swal({
                title: 'Registro Correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            listaSedes = obtenerSedes();
        } else {
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }
    mostrarListaSedes();
};

function validar() {
    let bError = false;

    let sNombre = inputNombre.value;
    let sProvincia = inputProvincia.value;
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true;
    } else {
        inputNombre.classList.remove('errorInput');
    }
    // Validación del input para provincia
    if (sProvincia == '' ){
        inputProvincia.classList.add('errorInput');
        bError = true;
    }else{
        inputProvincia.classList.remove('errorInput');
    }
    // Validación del input para canton
    if (sCanton == '' ){
        inputCanton.classList.add('errorInput');
        bError = true;
    }else{
        inputCanton.classList.remove('errorInput');
    }
    // Validación del input para distrito
    if (sDistrito == '' ){
        inputDistrito.classList.add('errorInput');
        bError = true;
    }else{
        inputDistrito.classList.remove('errorInput');
    }
    return bError;
};

function mostrarListaSedes() {
    let listaSedes = obtenerSedes();
    let tbody = document.querySelector('#tblSedes tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {
        let fila = tbody.insertRow();


        let celdaNombre = fila.insertCell();
        let celdaProvincia = fila.insertCell();

        celdaNombre.innerHTML = listaSedes[i]['nombre'];
        celdaProvincia.innerHTML = listaSedes[i]['provincia'];

    }
};

function mostrarProvincias() {
    let selectProvincias = document.querySelector('#lstProvincias');
    selectProvincias.innerHTML = '';
    for (let i = 0; i < sListaProvincias.length; i++) {
        let nuevaOpcion = new Option(sListaProvincias[i]['nombre']);
        nuevaOpcion.value = sListaProvincias[i]['nombre'];
        selectProvincias.appendChild(nuevaOpcion);
    }
};

function mostrarCantones() {
    let selectCantones = document.querySelector('#lstCantones');
    selectCantones.innerHTML = '';
    for (let i = 0; i < sListaCantones.length; i++) {
        if (nNumeroProvincia == sListaCantones[i]['Provincia_idProvincia']) {
            let nuevaOpcion = new Option(sListaCantones[i]['nombre']);
            nuevaOpcion.value = sListaCantones[i]['nombre'];
            selectCantones.appendChild(nuevaOpcion);
        }
    }
};

function mostrarDistritos() {

    let selectDistritos = document.querySelector('#lstDistritos');
    selectDistritos.innerHTML = '';
    for (let i = 0; i < sListaDistritos.length; i++) {
        if (nNumeroCanton == sListaDistritos[i]['Canton_idCanton']) {
            let nuevaOpcion = new Option(sListaDistritos[i]['nombre']);
            nuevaOpcion.value = sListaDistritos[i]['nombre'];
            selectDistritos.appendChild(nuevaOpcion);
        }
    }
};

function setNumeroProvincia() {
    let sProvincia = inputProvincia.value;
    for (let i = 0; i < sListaProvincias.length; i++) {
        if (sProvincia == sListaProvincias[i]['nombre']) {
            nNumeroProvincia = sListaProvincias[i]['idProvincia'];
        }
    }
    mostrarCantones();
};

function setNumeroCanton() {
    let sCanton = inputCanton.value;
    for (let i = 0; i < sListaCantones.length; i++) {
        if (sCanton == sListaCantones[i]['nombre']) {
            nNumeroCanton = sListaCantones[i]['idCanton'];
        }
    }
    mostrarDistritos();
};

