'use strict';

mostrarListaCursos()
document.getElementById("defaultOpen").click();


//declaración de variables para obtener datos

let botonRegistrar = document.querySelector('#btnRegistrar');
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCreditos = document.querySelector('#txtCreditos');
let inputRequisitos = document.querySelector('#txtRequisitos');
let inputFecha = document.querySelector('#txtFecha');
let inputEstado = document.querySelector('#rdButton');
let inputBuscar = document.querySelector('#txtBuscarCodigo');


botonRegistrar.addEventListener('click' , obtenerDatos);

inputBuscar.addEventListener('keyup', mostrarBusqueda);


let regexCodigo = /^[a-zA-Z0-9]+$/;
let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let regexCreditos = /^[0-9]+$/;

function obtenerDatos(){

    console.log('obtener Datos!');


    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = Number(inputCreditos.value);
    let sRequisitos = inputRequisitos.value;
    let dFecha = Date(inputFecha.value);
    let bEstado = inputEstado.checked;
    
    //bError = validar();
    bError = validarRegistro();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el curso, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Continuar'
          });
    }else{
        let respuesta = registrarCurso(sCodigo, sNombre, nCreditos, sRequisitos, dFecha, bEstado);
        if(respuesta.success == true){
            console.log("sucess registrar");
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Continuar'
              });
        }else{
            console.log("fail registrar");
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Continuar'
              });
        } 
    }
  
    limpiarFormulario();
        mostrarListaCursos();
};

function validarRegistro(){
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = Number(inputCreditos.value);
    let sRequisitos = inputRequisitos.value;
    let dFechaCreacion = new Date(inputFecha.value);
    let dFechaActual = new Date();

    // Validación del input para código
    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false) ){
        inputCodigo.classList.add('errorInput');
        bError = true;
    }else{
        inputCodigo.classList.remove('errorInput');
    }

    // Validación del input para nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false) ){
        inputNombre.classList.add('errorInput');
        bError = true;
    }else{
        inputNombre.classList.remove('errorInput');
    }

    // validacion para espacios en blanco???

     // Validación del input para créditos
     if(nCreditos == 0 || (regexCreditos.test(nCreditos) == false) ){
        inputCreditos.classList.add('errorInput');
        bError = true;
    }else{
        inputCreditos.classList.remove('errorInput');
    }

    //Validacion para los requisitos

    if(sRequisitos == ''){

        inputRequisitos.classList.add('errorInput');
        bError = true;
    }else{
        inputRequisitos.classList.remove('errorInput');
    }

    // Validación del input para fecha
    if (dFechaCreacion == '' || dFechaCreacion > dFechaActual ){
        inputFecha.classList.add('errorInput');
        bError = true;
    }else{
        inputFecha.classList.remove('errorInput');
    }

    // agregar validarEstado();
    return bError;
}

function mostrarListaCursos(){
    let listaCursos = obtenerCursos();
    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaCursos.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCreditos = fila.insertCell();
        let celdaRequisitos = fila.insertCell();
        let celdaFechaCreacion = fila.insertCell();
        let celdaEstado = fila.insertCell();

        celdaCodigo.innerHTML = listaCursos[i]['codigo'];
        celdaNombre.innerHTML = listaCursos[i]['nombre'];
        celdaCreditos.innerHTML = listaCursos[i]['creditos'];
        celdaRequisitos.innerHTML = listaCursos[i]['requisitos'];

        let dFecha = new Date(listaCursos[i]['fechaCreacion']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        let bEstado = listaCursos[i]['estado'];
        if(bEstado){
            celdaEstado.innerHTML = 'Activa';
        }else{
            celdaEstado.innerHTML = 'Inactiva';
        }
    }
};

function mostrarBusqueda(){
    let listaCursos = obtenerBusqueda(inputBuscar.value);

    let tbody = document.querySelector('#tblBusqueda tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaCursos.length; i++){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCreditos = fila.insertCell();
        let celdaRequisitos = fila.insertCell();
        let celdaFechaCreacion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaCodigo.innerHTML = listaCursos[i]['codigo'];
        celdaNombre.innerHTML = listaCursos[i]['nombre'];
        celdaCreditos.innerHTML = listaCursos[i]['creditos'];
        celdaRequisitos.innerHTML = listaCursos[i]['requisitos']
        let dFecha = new Date(listaCarreras[i]['fechaCreacion']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        let bEstado = listaCursos[i]['estado'];
        if(bEstado){
            celdaEstado.innerHTML = 'Activa';
        }else{
            celdaEstado.innerHTML = 'Inactiva';
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

function limpiarFormulario(){
    inputCodigo.value = '';
    inputNombre.value = '';
    inputRequisitos = '';
    inputCreditos.value = '';
    inputFecha.value = '';
};


function abrirFuncion(evento, funcion) {
    let i, tabContent, tablinks;

    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(funcion).style.display = "block";
    evento.currentTarget.className += " active";
};

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }


