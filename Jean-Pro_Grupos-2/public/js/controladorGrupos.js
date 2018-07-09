'use strict';
mostrarListaGrupos()

document.getElementById("defaultOpen").click();

let inputNumeroGrupo = document.querySelector('#txtNumeroGrupo');
let inputNumeroLaboratorio = document.querySelector('#txtNumeroLab');
let inputNombreProfesor = document.querySelector('#txtNombrePro');
let inputNumeroEstudiantes = document.querySelector('#txtNumeroEst');
let inputDiasSemana = document.querySelector('#txtSelecionarDia');
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputBuscar = document.querySelector('#txtBuscarCodigo');
botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', mostrarBusqueda);


let nNumeroGrupo = 0;
let nNumeroLaboratorio = 0;
let sNombreProfesor = '';
let nNumeroEstudiantes = 0;
let sDiasSemana = '';
let reglaLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let reglaNumeros = /^[0-9]+$/;


function obtenerDatos() {

    let nNumeroGrupo = inputNumeroGrupo.value;
    let nNumeroLaboratorio = inputNumeroLaboratorio.value;
    let sNombreProfesor = inputNombreProfesor.value;
    let nNumeroEstudiantes = inputNumeroEstudiantes.value;
    let sDiasSemana = inputDiasSemana.value;

    let bError = false;
    bError = validar();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el Grupo, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarGrupo(nNumeroGrupo, nNumeroLaboratorio, sNombreProfesor, nNumeroEstudiantes, sDiasSemana);
        if (respuesta.success == true) {
            swal({
                title: 'Registro Correcto',
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
    }
    mostrarListaGrupos();
}

function validar() {


    let bError = false;

    nNumeroGrupo = Number(inputNumeroGrupo.value);
    nNumeroLaboratorio = Number(inputNumeroLaboratorio.value);
    sNombreProfesor = inputNombreProfesor.value;
    nNumeroEstudiantes = Number(inputNumeroEstudiantes.value);
    sDiasSemana = inputDiasSemana.value;

    //validar nombre
    if (sNombreProfesor == '' || (reglaLetras.test(sNombreProfesor) == false)) {
        inputNombreProfesor.classList.add('errorInput');
        bError = true;
    } else {
        inputNombreProfesor.classList.remove('errorInput');
    }
    //validar numero de grupo
    if (nNumeroGrupo == '' || (reglaNumeros.test(nNumeroGrupo) == false)) {
        inputNumeroGrupo.classList.add('errorInput');
        bError = true;
    } else {
        inputNumeroGrupo.classList.remove('errorInput');
    }
    //validar numero de Laboratorio
    if (nNumeroLaboratorio == '' || (reglaNumeros.test(nNumeroLaboratorio) == false)) {
        inputNumeroLaboratorio.classList.add('errorInput');
        bError = true;
    } else {
        inputNumeroLaboratorio.classList.remove('errorInput');
    }
    //Validar numero de Estudiantes
    if (nNumeroEstudiantes == '' || (reglaNumeros.test(nNumeroEstudiantes) == false)) {
        inputNumeroEstudiantes.classList.add('errorInput');
        bError = true;
    } else {
        inputNumeroEstudiantes.classList.remove('errorInput');
    }

    return bError;
};

function mostrarListaGrupos() {
    let listaGrupos = obtenerGrupos();
    let tbody = document.querySelector('#tblGrupos tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaGrupos.length; i++) {
        let fila = tbody.insertRow();

        let celdaNumeroGrupo = fila.insertCell();
        let celdaNumeroLaboratorio = fila.insertCell();
        let celdaNombreProfesor = fila.insertCell();
        let celdaNumeroEstudiantes = fila.insertCell();
        let celdadiasSemana = fila.insertCell();

        celdaNumeroGrupo.innerHTML = listaGrupos[i]['numeroGrupo'];
        celdaNumeroLaboratorio.innerHTML = listaGrupos[i]['numeroLaboratorio'];
        celdaNombreProfesor.innerHTML = listaGrupos[i]['nombreProfesor'];
        celdaNumeroEstudiantes.innerHTML = listaGrupos[i]['numeroEstudiantes'];
        celdadiasSemana.innerHTML = listaGrupos[i]['diasSemana'];
    }
}

function mostrarBusqueda(){
    let listaGrupos = obtenerBusqueda(inputBuscar.value);

    let tbody = document.querySelector('#tblBusqueda tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaGrupos.length; i++){
        let fila = tbody.insertRow();

        let celdaNumeroGrupo = fila.insertCell();
        let celdaNumeroLaboratorio = fila.insertCell();
        let celdaNombreProfesor = fila.insertCell();
        let celdaNumeroEstudiantes = fila.insertCell();
        let celdadiasSemana = fila.insertCell();

        celdaNumeroGrupo.innerHTML = listaGrupos[i]['numeroGrupo'];
        celdaNumeroLaboratorio.innerHTML = listaGrupos[i]['numeroLaboratorio'];
        celdaNombreProfesor.innerHTML = listaGrupos[i]['nombreProfesor'];
        celdaNumeroEstudiantes.innerHTML = listaGrupos[i]['numeroEstudiantes'];
        celdadiasSemana.innerHTML = listaGrupos[i]['diasSemana'];
          
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

    tabcontent = document.getElementsByClassName("tabcontent");
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