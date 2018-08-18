'use strict';

let sListaSedes = obtenerSedes();
mostrarBusqueda();

document.getElementById("buscar").click();

const inputNombre = document.querySelector('#txtNombre');
const inputProvincia = document.querySelector('#txtProvincia');
const inputCanton = document.querySelector('#txtCanton');
const inputDistrito = document.querySelector('#txtDistrito');
const selectTipo = document.querySelector('#txtTipo');
const botonRegistrar = document.querySelector('#btnRegistrar');
const inputBuscar = document.querySelector('#txtBuscar');

const inputEditarNombre = document.querySelector('#txtEditarNombre');
const inputEditarProvincia = document.querySelector('#txtEditarProvincia');
const inputEditarCanton = document.querySelector('#txtEditarCanton');
const inputEditarDistrito = document.querySelector('#txtEditarDistrito');
const chkEstado = document.querySelector('#chkEstado');
const inputId = document.querySelector('#txtId');
const botonModificar = document.querySelector('#btnEditar');

let latitudSede = 0;
let longitudSede = 0;

inputBuscar.addEventListener('keyup', function () {
    mostrarBusqueda(inputBuscar.value)
});
selectTipo.addEventListener('change', function () {
    mostrarMapa(selectTipo.value)
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
    let sTipo = selectTipo.value;

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
        let respuesta = registrarSede(sNombre, sProvincia, sCanton, sDistrito, sTipo, longitudSede, latitudSede);
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
    let sTipo = selectTipo.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true;
    } else {
        inputNombre.classList.remove('errorInput');
    }
    // Validación del input para provincia
    if(sTipo == 'Fisica'){
        if (sProvincia == '') {
            inputProvincia.classList.add('errorInput');
            bError = true;
        } else {
            inputProvincia.classList.remove('errorInput');
        }
    }
    // Validación del input para canton
    if(sTipo == 'Fisica'){
        if (sCanton == '') {
            inputCanton.classList.add('errorInput');
            bError = true;
        } else {
            inputCanton.classList.remove('errorInput');
        }
    }
    // Validación del input para distrito
    if(sTipo == 'Fisica'){
        if (sDistrito == '') {
            inputDistrito.classList.add('errorInput');
            bError = true;
        } else {
            inputDistrito.classList.remove('errorInput');
        }
    }
    // Validación del select para tipo
    if (sTipo == '') {
        selectTipo.classList.add('errorInput');
        bError = true;
    } else {
        selectTipo.classList.remove('errorInput');
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
            let celdaTipo = fila.insertCell();
            let celdaUbicacion = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaVerMas = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();

            celdaNombre.innerHTML = sListaSedes[i]['nombre'];
            celdaTipo.innerHTML = sListaSedes[i]['tipo'];

            if(sListaSedes[i]['tipo'] == 'Fisica'){
                celdaUbicacion.innerHTML = sListaSedes[i]['provincia'] + ', ' + sListaSedes[i]['canton'] + ', ' + sListaSedes[i]['distrito'];
            }else{
                celdaUbicacion.innerHTML = 'Virtual';
            }

            let bEstado = sListaSedes[i]['estado'];
            if(bEstado){
                celdaEstado.innerHTML = 'Activa';
            }else{
                celdaEstado.innerHTML = 'Inactiva';
            }

            let botonVerMas = document.createElement('a');
            botonVerMas.classList.add('fas');
            botonVerMas.classList.add('fa-info');
    
            botonVerMas.dataset.id = sListaSedes[i]['_id'];
            botonVerMas.addEventListener('click', mostrarModel);
    
            celdaVerMas.appendChild(botonVerMas);

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

function mostrarProvincias() {
    let selectProvincias = document.getElementById('txtProvincia');
    selectProvincias.innerHTML = '';

    let placeholder = document.createElement('option');
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.text = 'Seleccione una opción';
    placeholder.value = '';
    selectProvincias.add(placeholder);

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

function mostrarMapa(sTipo){
    if(sTipo == 'Fisica'){
        document.getElementById('mapaSede').classList.add('visibleIB');
        document.getElementById('mapaSede').classList.remove('invisible');

        document.getElementById('divProvincia').classList.add('visibleIB');
        document.getElementById('divProvincia').classList.remove('invisible');

        document.getElementById('divCanton').classList.add('visibleIB');
        document.getElementById('divCanton').classList.remove('invisible');

        document.getElementById('divDistrito').classList.add('visibleIB');
        document.getElementById('divDistrito').classList.remove('invisible');
    }else{
        document.getElementById('mapaSede').classList.add('invisible');
        document.getElementById('mapaSede').classList.remove('visibleIB');

        document.getElementById('divProvincia').classList.add('invisible');
        document.getElementById('divProvincia').classList.remove('visibleIB');

        document.getElementById('divCanton').classList.add('invisible');
        document.getElementById('divCanton').classList.remove('visibleIB');

        document.getElementById('divDistrito').classList.add('invisible');
        document.getElementById('divDistrito').classList.remove('visibleIB');
    }
};

var map;
//Funcion del api de Google Maps que crea el mapa 
function initMap() {
    var locations = [
        {lat: 10.62927056178705, lng: -85.44156694140622},
        {lat: 9.980727507108876, lng: -83.06852006640622}
    ]

    //configuracion del mapa (tendra zoom de 7) y se centrara en la posicion guardada
    let opciones = {
        zoom: 8,
        center: { lat: 9.934739, lng: -84.087502 },
        mapTypeControl: false
    }

    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapaSede'), opciones);

    // Create an array of alphabetical characters used to label the markers.
    var labels = ['1', '2'];
    var nombre = ['Sede Liberia', 'Sede Limón'];

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i],
        title: nombre[i]
      });
    });

    var markerCluster = new MarkerClusterer(mapa, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


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

function mostrarModel(){
    document.getElementById('modal').classList.remove('ocultar');
    let sede = '';

    let id = this.dataset.id;
    for(let i=0; i < sListaSedes.length; i++){
        if(sListaSedes[i]['_id'] == id){
            sede = sListaSedes[i];
        }
    }
    verUbicacionMapa(sede['latitud'], sede['longitud']);
};

function verUbicacionMapa(latitud, longitud){
    let opciones = {
        zoom: 15,
        center: { lat: 9.934739, lng: -84.087502 },
        mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        draggable: false
    }

    let mapa = new google.maps.Map(document.getElementById('ubicacionSede'), opciones );

    let marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: mapa,
        draggable: false
    });
};