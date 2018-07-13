'use strict';
let sListaCursos = obtenerCursos();

mostrarListaGrupos()
mostrarCursos()

document.getElementById("defaultOpen").click();

let inputNumeroGrupo = document.querySelector('#txtNumeroGrupo');
let inputNumeroLaboratorio = document.querySelector('#txtNumeroLab');
let inputNombreProfesor = document.querySelector('#txtNombrePro');
let inputNumeroEstudiantes = document.querySelector('#txtNumeroEst');
let inputHorarioDomingo = document.querySelector('#txtHorarioGrupoDomingo');
let inputHorarioLunes = document.querySelector('#txtHorarioGrupoLunes');
let inputHorarioMartes = document.querySelector('#txtHorarioGrupoMartes');
let inputHorarioMiercoles = document.querySelector('#txtHorarioGrupoMiercoles');
let inputHorarioJueves = document.querySelector('#txtHorarioGrupoJueves');
let inputHorarioViernes = document.querySelector('#txtHorarioGrupoViernes');
let inputHorarioSabado = document.querySelector('#txtHorarioGrupoSabado');
let inputHorarioVirtual = document.querySelector('#txtHorarioGrupoVirtual');
let inputTiempoEntrada = document.querySelector('#txtTiempoGrupoEntrada');
let inputTiempoSalida = document.querySelector('#txtTiempoGrupoSalida');
let selectCursos = document.querySelector('#txtCurso');
let botonRegistrar = document.querySelector('#btnRegistrar');
let inputBuscar = document.querySelector('#txtBuscarCodigo');
botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', mostrarBusqueda);


let nNumeroGrupo = 0;
let nNumeroLaboratorio = 0;
let sNombreProfesor = '';
let nNumeroEstudiantes = 0;
let reglaLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let reglaNumeros = /^[0-9]+$/;


function obtenerDatos() {

    let id = selectCursos.value;
    let nNumeroGrupo = inputNumeroGrupo.value;
    let nNumeroLaboratorio = inputNumeroLaboratorio.value;
    let sNombreProfesor = inputNombreProfesor.value;
    let nNumeroEstudiantes = inputNumeroEstudiantes.value;
    let sHorarioDomingo = inputHorarioDomingo.value;
    let sHorarioLunes = inputHorarioLunes.value;
    let sHorarioMartes = inputHorarioMartes.value;
    let sHorarioMiercoles = inputHorarioMiercoles.value;
    let sHorarioJueves = inputHorarioJueves.value;
    let sHorarioViernes = inputHorarioViernes.value;
    let sHorarioSabado = inputHorarioSabado.value;
    let sHorarioVirtual = inputHorarioVirtual.value;
    let sTiempoEntrada = inputTiempoEntrada.value;
    let sTiempoSalida = inputTiempoSalida.value;

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
        let respuesta = registrarGrupo(id, nNumeroGrupo, nNumeroLaboratorio, sNombreProfesor, nNumeroEstudiantes, sHorarioDomingo, sHorarioLunes, sHorarioMartes, sHorarioMiercoles, sHorarioJueves, sHorarioViernes, sHorarioSabado, sHorarioVirtual, sTiempoEntrada, sTiempoSalida);
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
        let celdaTiempoEntrada = fila.insertCell();
        let celdaTiempoSalida = fila.insertCell();

        celdaNumeroGrupo.innerHTML = listaGrupos[i]['numeroGrupo'];
        celdaNumeroLaboratorio.innerHTML = listaGrupos[i]['numeroLaboratorio'];
        celdaNombreProfesor.innerHTML = listaGrupos[i]['nombreProfesor'];
        celdaNumeroEstudiantes.innerHTML = listaGrupos[i]['numeroEstudiantes'];
        celdaTiempoEntrada.innerHTML = listaGrupos[i]['tiempoEntrada'];
        celdaTiempoSalida.innerHTML = listaGrupos[i]['tiempoSalida'];
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

function mostrarCursos(){
    let selectCursos = document.querySelector('#lstCursos');
    selectCursos.innerHTML = '';
    for(let i=0; i < sListaCursos.length; i++){
        let nuevaOpcion = new Option(sListaCursos[i]['nombre']);
        nuevaOpcion.value = sListaCursos[i]['nombre'];
        selectCursos.appendChild(nuevaOpcion);
    }
};