'use strict';

let sListaGrupos = obtenerGrupos();
let sListaCursos = obtenerCursos();
let sListaLaboratorios = obtenerLaboratorios();

mostrarBusqueda();
mostrarCursos();
mostrarLaboratorios();

document.getElementById("buscar").click();

let inputNumeroGrupo = document.querySelector('#txtNumeroGrupo');
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
let selectLaboratorios = document.querySelector('#txtLaboratorio');
let inputBuscar = document.querySelector('#txtBuscar');
let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', function(){
    mostrarBusqueda(inputBuscar.value)
});


let nNumeroGrupo = 0;
let sNombreProfesor = '';
let nNumeroEstudiantes = 0;
let reglaLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let reglaNumeros = /^[0-9]+$/;


function obtenerDatos() {

    let id = selectCursos.value;
    let idLab = selectLaboratorios.value;
    let nNumeroGrupo = inputNumeroGrupo.value;
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
        let respuesta = registrarGrupo(id, idLab, nNumeroGrupo, sNombreProfesor, nNumeroEstudiantes, sHorarioDomingo, sHorarioLunes, sHorarioMartes, sHorarioMiercoles, sHorarioJueves, sHorarioViernes, sHorarioSabado, sHorarioVirtual, sTiempoEntrada, sTiempoSalida);
        if (respuesta.success == true) {
            swal({
                title: 'Registro Correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            // mostrarListaGrupos();
            sListaGrupos = obtenerGrupos();
            limpiarFormulario();
            mostrarBusqueda();
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
}

function validar() {


    let bError = false;

    nNumeroGrupo = Number(inputNumeroGrupo.value);
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
    //Validar numero de Estudiantes
    if (nNumeroEstudiantes == '' || (reglaNumeros.test(nNumeroEstudiantes) == false)) {
        inputNumeroEstudiantes.classList.add('errorInput');
        bError = true;
    } else {
        inputNumeroEstudiantes.classList.remove('errorInput');
    }

    return bError;
};

function mostrarBusqueda(pFiltro){
    let tbody = document.querySelector('#tblBusqueda tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for (let i = 0; i < sListaGrupos.length; i++) {
        if( (sListaGrupos[i]['nombreProfesor'].toLowerCase()).includes(pFiltro.toLowerCase()) ){
            let fila = tbody.insertRow();

            let celdaNumeroGrupo = fila.insertCell();
            let celdaNombreProfesor = fila.insertCell();
            let celdaNumeroEstudiantes = fila.insertCell();
            let celdaTiempoEntrada = fila.insertCell();
            let celdaTiempoSalida = fila.insertCell();

            celdaNumeroGrupo.innerHTML = sListaGrupos[i]['numeroGrupo'];
            celdaNombreProfesor.innerHTML = sListaGrupos[i]['nombreProfesor'];
            celdaNumeroEstudiantes.innerHTML = sListaGrupos[i]['numeroEstudiantes'];
            celdaTiempoEntrada.innerHTML = sListaGrupos[i]['tiempoEntrada'];
            celdaTiempoSalida.innerHTML = sListaGrupos[i]['tiempoSalida'];
        }
    }
};

function limpiarFormulario(){
    inputNumeroGrupo.value = '';
    inputNombreProfesor.value = '';
    inputNumeroEstudiantes.value = '';
    selectCursos.value = '';
    selectLaboratorios.value = '';
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

function mostrarLaboratorios(){
    let selectLaboratorios = document.querySelector('#lstLaboratorios');
    selectLaboratorios.innerHTML = '';
    for(let i=0; i < sListaLaboratorios.length; i++){
        let nuevaOpcion = new Option(sListaLaboratorios[i]['nombre']);
        nuevaOpcion.value = sListaLaboratorios[i]['nombre'];
        selectLaboratorios.appendChild(nuevaOpcion);
    }
};