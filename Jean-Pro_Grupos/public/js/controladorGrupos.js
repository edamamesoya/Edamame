'use strict';
mostrarListaGrupos()

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);


let inputNumeroGrupo = document.querySelector('#txtNumeroGrupo');
let inputNumeroLaboratorio = document.querySelector('#txtNumeroLab');
let inputNombreProfesor = document.querySelector('#txtNombrePro');
let inputNumeroEstudiantes = document.querySelector('#txtNumeroEst');
let inputDiasSemana = document.querySelector('#txtSelecionarDia');


let nNumeroGrupo = 0;
let nNumeroLaboratorio = 0;
let sNombreProfesor = '';
let nNumeroEsttudiantes = 0;
let odiasSemana = '';
let reglaLetras = /^[a-zA-Z ]+$/;
let reglaNumeros = /^[0-9]+$/;


function obtenerDatos() {
    let bError = false;
    let nNumeroGrupo = inputNumeroGrupo.value;
    let nNumeroLaboratorio = inputNumeroLaboratorio.value;
    let sNombreProfesor = inputNombreProfesor.value;
    let nNumeroEstudiantes = inputNumeroEstudiantes.value;
    let sdiasSemana = inputDiasSemana.value;

    bError = validar();
    if (bError == true) {
        swal({
            title: 'Registro Incorrecto',
            text: 'No se pudo registrar el Grupo, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarGrupo(nNumeroGrupo, nNumeroLaboratorio, sNombreProfesor, nNumeroEstudiantes, sdiasSemana);
        swal({
            title: 'Registro Correcto',
            text: 'Se Registro de forma Correcta',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
    }
    mostrarListaGrupos();
}

function validar() {
    let bError = false;

    nNumeroGrupo = Number(inputNumeroGrupo.value);
    nNumeroLaboratorio = Number(inputNumeroLaboratorio.value);
    sNombreProfesor = inputNombreProfesor.value;
    nNumeroEstudiantes = Number(inputNumeroEstudiantes.value);
    sdiasSemana = inputDiasSemana.value;

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
