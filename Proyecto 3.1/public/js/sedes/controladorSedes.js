'use strict';

let sListaSedes = obtenerSedes();
mostrarBusqueda();

document.getElementById("buscar").click();

let inputNombre = document.querySelector('#txtNombre');
let inputProvincia = document.querySelector('#txtProvincia');
let inputCanton = document.querySelector('#txtCanton');
let inputDistrito = document.querySelector('#txtDistrito');
const inputSede = document.querySelector('#txtSede');
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputBuscar = document.querySelector('#txtBuscar');

let inputEditarNombre = document.querySelector('#txtEditarNombre');
let inputEditarProvincia = document.querySelector('#txtEditarProvincia');
let inputEditarCanton = document.querySelector('#txtEditarCanton');
let inputEditarDistrito = document.querySelector('#txtEditarDistrito');
const chkEstado = document.querySelector('#chkEstado');
const inputId = document.querySelector('#txtId');
const botonModificar = document.querySelector('#btnEditar');

let latitudSede;
let longitudSede;
inputBuscar.addEventListener('keyup', function () {
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

inputEditarProvincia.addEventListener('change', setNumeroProvincia);
inputEditarCanton.addEventListener('change', setNumeroCanton);
inputProvincia.addEventListener('change', setNumeroProvincia);
inputCanton.addEventListener('change', setNumeroCanton);
botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);

let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;

function obtenerDatos() {
    let sNombre = inputNombre.value;
    let sProvincia = inputProvincia.value;
    let sCanton = inputCanton.value;
    let sDistrito = inputDistrito.value;
    let latitudSede;
    let longitudSede;

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
        let respuesta = registrarSede(sNombre, sProvincia, sCanton, sDistrito, longitudSede, latitudSede);
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

function modificarDatos(){
    let sNombre = inputEditarNombre.value;
    let sProvincia = inputEditarProvincia.value;
    let sCanton = inputEditarCanton.value;
    let sDistrito = inputEditarDistrito.value;
    let sEstado = chkEstado.checked;
    let sId = inputId.value;

    let bError = false;
    bError = validarModificar();

    if(bError == true){
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo modificar la sede, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = actualizarSede(sNombre, sProvincia, sCanton, sDistrito, sEstado, sId);
        if(respuesta.success == true){
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            sListaSedes = obtenerSedes();
            limpiarFormularioModificar();
            mostrarBusqueda();
            mostrarSedes();
            document.getElementById("buscar").click();
        }else{
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

function validarModificar() {
    let bError = false;

    let sNombre = inputEditarNombre.value;
    let sProvincia = inputEditarProvincia.value;
    let sCanton = inputEditarCanton.value;
    let sDistrito = inputEditarDistrito.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputEditarNombre.classList.add('errorInput');
        bError = true;
    } else {
        inputEditarNombre.classList.remove('errorInput');
    }
    // Validación del input para provincia
    if (sProvincia == '') {
        inputEditarProvincia.classList.add('errorInput');
        bError = true;
    } else {
        inputEditarProvincia.classList.remove('errorInput');
    }
    // Validación del input para canton
    if (sCanton == '') {
        inputEditarCanton.classList.add('errorInput');
        bError = true;
    } else {
        inputEditarCanton.classList.remove('errorInput');
    }
    // Validación del input para distrito
    if (sDistrito == '') {
        inputEditarDistrito.classList.add('errorInput');
        bError = true;
    } else {
        inputEditarDistrito.classList.remove('errorInput');
    }
    return bError;
};

function mostrarBusqueda(pFiltro) {
    let tbody = document.querySelector('#tblBusqueda tbody');
    if (!pFiltro) {
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for (let i = 0; i < sListaSedes.length; i++) {
        if ((sListaSedes[i]['nombre'].toLowerCase()).includes(pFiltro.toLowerCase()) || (sListaSedes[i]['provincia'].toLowerCase()).includes(pFiltro.toLowerCase())) {
            let fila = tbody.insertRow();

            let celdaNombre = fila.insertCell();
            let celdaProvincia = fila.insertCell();
            let celdaCanton = fila.insertCell();
            let celdaDistrito = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();

            celdaNombre.innerHTML = sListaSedes[i]['nombre'];
            celdaProvincia.innerHTML = sListaSedes[i]['provincia'];
            celdaCanton.innerHTML = sListaSedes[i]['canton'];
            celdaDistrito.innerHTML = sListaSedes[i]['distrito'];

            let bEstado = sListaSedes[i]['estado'];
            if(bEstado){
                celdaEstado.innerHTML = 'Activa';
            }else{
                celdaEstado.innerHTML = 'Inactiva';
            }

            let botonEditar = document.createElement('a');
            botonEditar.classList.add('far');
            botonEditar.classList.add('fa-edit');
    
            botonEditar.dataset.id = sListaSedes[i]['_id'];
            botonEditar.addEventListener('click', editar);
    
            celdaEditar.appendChild(botonEditar);

            let botonEliminar = document.createElement('a');
            botonEliminar.classList.add('far');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset.id = sListaSedes[i]['_id'];
            botonEliminar.addEventListener('click', eliminar);

            celdaEliminar.appendChild(botonEliminar);

        }
    }
};

function mostrarSedes(){
    sListaSedes = obtenerSedes();

    let selectSedes = document.getElementById('txtSede');
    selectSedes.innerHTML = '';

    for(let i=0; i < sListaSedes.length; i++){
        let sSede = sListaSedes[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sSede;
        nuevaOpcion.value = sSede;
        selectSedes.add(nuevaOpcion);
    }
};

function mostrarProvincias() {
    let selectProvincias = document.getElementById('txtProvincia');
    selectProvincias.innerHTML = '';

    for (let i = 0; i < sListaProvincias.length; i++) {
        let sProvincia = sListaProvincias[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sProvincia;
        nuevaOpcion.value = sProvincia;
        selectProvincias.add(nuevaOpcion);
    }
};

function mostrarCantones() {
    let selectCantones = document.getElementById('txtCanton');
    selectCantones.innerHTML = '';

    for (let i = 0; i < sListaCantones.length; i++) {
        if (nNumeroProvincia == sListaCantones[i]['Provincia_idProvincia']) {
            let sCanton = sListaCantones[i]['nombre'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sCanton;
            nuevaOpcion.value = sCanton;
            selectCantones.add(nuevaOpcion);
        }
    }
};

function mostrarDistritos() {
    let selectDistritos = document.getElementById('txtDistrito');
    selectDistritos.innerHTML = '';

    for (let i = 0; i < sListaDistritos.length; i++) {
        if (nNumeroCanton == sListaDistritos[i]['Canton_idCanton']) {
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

function limpiarFormulario() {
    inputNombre.value = '';
    inputProvincia.value = '';
    inputCanton.value = '';
    inputDistrito.value = '';
};

function limpiarFormularioModificar() {
    inputEditarNombre.value = '';
    inputEditarProvincia.value = '';
    inputEditarCanton.value = '';
    inputEditarDistrito.value = '';
};

var map;
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

function eliminar() {
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar la Sede?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.value) {
            eliminarSede(id);
            sListaSedes = obtenerSedes();
            mostrarBusqueda();
            mostrarSedes();
            swal(
                'Eliminada!',
                'La sede ha sido eliminada.',
                'success'
            )
        }
    })
};

function editar(){
    let id = this.dataset.id;

    document.getElementById("modificar").click();
    let sede = obtenerSedePorId(id);


    inputEditarNombre.value = sede['nombre'];
    inputEditarProvincia.value = sede['provincia'];
    inputEditarCanton.value = sede['canton'];
    inputEditarDistrito.value = sede['distrito'];
    chkEstado.checked = sede['estado'];
    inputId.value = sede['_id'];
};