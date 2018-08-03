'use strict';

let sListaSedes = obtenerSedes();
mostrarBusqueda();

document.getElementById("buscar").click();

let inputNombre = document.querySelector('#txtNombre');
let inputProvincia = document.querySelector('#txtProvincia');
let inputCanton = document.querySelector('#txtCanton');
let inputDistrito = document.querySelector('#txtDistrito');
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputBuscar = document.querySelector('#txtBuscar');
inputBuscar.addEventListener('keyup', function(){
    mostrarBusqueda(inputBuscar.value)
});


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

inputProvincia.addEventListener('change', setNumeroProvincia);
inputCanton.addEventListener('change', setNumeroCanton);
botonRegistrar.addEventListener('click', obtenerDatos);

let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;

function obtenerDatos() {
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
            sListaSedes = obtenerSedes();
            mostrarBusqueda();
            limpiarFormulario();
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
    // mostrarListaSedes();

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
    if (sProvincia == '') {
        inputProvincia.classList.add('errorInput');
        bError = true;
    } else {
        inputProvincia.classList.remove('errorInput');
    }
    // Validación del input para canton
    if (sCanton == '') {
        inputCanton.classList.add('errorInput');
        bError = true;
    } else {
        inputCanton.classList.remove('errorInput');
    }
    // Validación del input para distrito
    if (sDistrito == '') {
        inputDistrito.classList.add('errorInput');
        bError = true;
    } else {
        inputDistrito.classList.remove('errorInput');
    }
    return bError;
};

function mostrarBusqueda(pFiltro){
    let tbody = document.querySelector('#tblBusqueda tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for (let i = 0; i < sListaSedes.length; i++) {
        if( (sListaSedes[i]['nombre'].toLowerCase()).includes(pFiltro.toLowerCase()) || (sListaSedes[i]['provincia'].toLowerCase()).includes(pFiltro.toLowerCase())){
            let fila = tbody.insertRow();
            
            let celdaNombre = fila.insertCell();
            let celdaProvincia = fila.insertCell();
            let celdaCanton = fila.insertCell();
            let celdaDistrito = fila.insertCell();

            celdaNombre.innerHTML = sListaSedes[i]['nombre'];
            celdaProvincia.innerHTML = sListaSedes[i]['provincia'];
            celdaCanton.innerHTML = sListaSedes[i]['canton'];
            celdaDistrito.innerHTML = sListaSedes[i]['distrito'];
        }
    }
};

function mostrarProvincias(){
    let selectProvincias = document.getElementById('txtProvincia');
    selectProvincias.innerHTML = '';

    for(let i=0; i < sListaProvincias.length; i++){
        let sProvincia = sListaProvincias[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sProvincia;
        nuevaOpcion.value = sProvincia;
        selectProvincias.add(nuevaOpcion);
    }
};

function mostrarCantones(){
    let selectCantones = document.getElementById('txtCanton');
    selectCantones.innerHTML = '';

    for(let i=0; i < sListaCantones.length; i++){
        if (nNumeroProvincia == sListaCantones[i]['Provincia_idProvincia']){
            let sCanton = sListaCantones[i]['nombre'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sCanton;
            nuevaOpcion.value = sCanton;
            selectCantones.add(nuevaOpcion);
        }
    }
};

function mostrarDistritos(){
    let selectDistritos = document.getElementById('txtDistrito');
    selectDistritos.innerHTML = '';

    for(let i=0; i < sListaDistritos.length; i++){
        if (nNumeroCanton == sListaDistritos[i]['Canton_idCanton']){
            let sDistrito = sListaDistritos[i]['nombre'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sDistrito;
            nuevaOpcion.value = sDistrito;
            selectDistritos.add(nuevaOpcion);
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

function limpiarFormulario(){
    inputNombre.value = '';
    inputProvincia.value = '';
    inputCanton.value = '';
    inputDistrito.value = '';
};

var map;
var latitudSede;
var longitudSede;

//Funcion del api de Google Maps que crea el mapa 
function initMap() {



    //configuracion del mapa (tendra zoom de 7) y se centrara en la posicion guardada
    let opciones = {
        zoom: 7,
        center: { lat: 9.934739, lng: -84.087502 }
    }

    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapaSede'), opciones);

    //Marker (la posicion del marker es la misma posicion que donde se centra el mapa y hace que el marker sea arrastrable)
    let marker = new google.maps.Marker({
        position: { lat: 9.934739, lng: -84.087502 },
        map: mapa,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function () {
        latitudSede = marker.getPosition().lat();
        longitudSede = marker.getPosition().lng();
    });
};
function onMakerMove(marker) {
    $("#coordenadas").val(marker.getPosition().toString().replace('(', '').replace(')', ''));
};