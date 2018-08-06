'use strict';

let sListaGrupos = obtenerGrupos();
let sListaCursos = obtenerCursos();
let sListaLaboratorios = obtenerLaboratorios();

mostrarBusqueda();
mostrarCursos();
mostrarLaboratorios();

let inputNumeroGrupo = document.querySelector('#txtNumeroGrupo');
let inputNumeroGrupoVirtual = document.querySelector('#txtNumeroGrupoVirtual');
let inputNombreProfesor = document.querySelector('#txtNombrePro');
let inputNumeroEstudiantesVirtual = document.querySelector('#txtNumeroEstudiantesVirtual');
let inputNombreProfesor1 = document.querySelector('#txtNombreProfesorVirtual');
let inputNombreProfesor2 = document.querySelector('#txtNombreProfesorVirtual2');
let inputNombreProfesor3 = document.querySelector('#txtNombreProfesorVirtual3');
let inputNumeroEstudiantes = document.querySelector('#txtNumeroEst');
const inputId = document.querySelector('#txtId');
const inputGrupo = document.querySelector('#txtGrupo');
let selectCursos = document.querySelector('#txtCurso');
let selectLaboratorios = document.querySelector('#txtLaboratorio');
let inputBuscar = document.querySelector('#txtBuscar');
let botonRegistrar = document.querySelector('#btnRegistrar');
let botonRegistrarVirtual = document.querySelector('#btnRegistrarVirtual');


botonRegistrar.addEventListener('click', obtenerDatos);
botonRegistrarVirtual.addEventListener('click', obtenerDatosVirtual);
inputBuscar.addEventListener('keyup', function () {
    mostrarBusqueda(inputBuscar.value)
});


let nNumeroGrupo = 0;
let sNombreProfesor = '';
let nNumeroEstudiantes = 0;
let reglaLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let reglaNumeros = /^[0-9]+$/;
//traer grupo virtual
$(document).ready(function () {
    $('#btnVirtual').on('click', function () {
        $('#txtVirtual').toggle();
    });
});
//traer grupo presencial
$(document).ready(function () {
    $('#btnPresencial').on('click', function () {
        $('#txtPresencial').toggle();
    });
});
//agregar profesor 2
$(document).ready(function () {
    $('#btnAgregar').on('click', function () {
        $('#txtNombrePro2').show();
    });
});
//agregar profesor 3
$(document).ready(function () {
    $('#btnAgregar1').on('click', function () {
        $('#txtNombrePro3').show();
    });
});

function obtenerDatosVirtual() {
    let sCurso = selectCursos.value;
    let nNumeroGrupoVirtual = Number(inputNumeroGrupoVirtual.value);
    let nNumeroEstudiantesVirtual = Number(inputNumeroEstudiantesVirtual.value);
    let sNombreProfesor1 = String(inputNombreProfesor1.value);
    let sNombreProfesor2 = String(inputNombreProfesor2.value);
    let sNombreProfesor3 = String(inputNombreProfesor3.value);

    let bError = false;

    bError = validarVirtual();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el Grupo, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarGrupo(sCurso, nNumeroGrupoVirtual, nNumeroEstudiantesVirtual, sNombreProfesor1, sNombreProfesor2, sNombreProfesor3);
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
};


function validarVirtual() {


    let bError = false;


    let nNumeroGrupoVirtual = inputNumeroGrupoVirtual.value;
    let nNumeroEstudiantesVirtual = inputNumeroEstudiantesVirtual.value;
    let sNombreProfesor1 = inputNombreProfesor1.value;
    let sNombreProfesor2 = inputNombreProfesor2.value;
    let sNombreProfesor3 = inputNombreProfesor3.value;

    //validar numero de grupo
    if (nNumeroGrupoVirtual == '' || (reglaNumeros.test(nNumeroGrupoVirtual) == false)) {
        inputNumeroGrupoVirtual.classList.add('errorInput');
        bError = true;
    } else {
        inputNumeroGrupoVirtual.classList.remove('errorInput');
    }
    //Validar numero de Estudiantes
    if (nNumeroEstudiantesVirtual == '' || (reglaNumeros.test(nNumeroEstudiantesVirtual) == false)) {
        inputNumeroEstudiantesVirtual.classList.add('errorInput');
        bError = true;
    } else {
        inputNumeroEstudiantesVirtual.classList.remove('errorInput');
    }
    //validar nombre Profesor
    if (sNombreProfesor1 == '' || (reglaLetras.test(sNombreProfesor1) == false)) {
        inputNombreProfesor1.classList.add('errorInput');
        bError = true;
    } else {
        inputNombreProfesor1.classList.remove('errorInput');
    }
    //Validar nombre Profesor 2
    if (sNombreProfesor2 == '' || (reglaLetras.test(sNombreProfesor2) == false)) {
        inputNombreProfesor2.classList.add('errorInput');
        bError = true;
    } else {
        inputNombreProfesor2.classList.remove('errorInput');
    }
    //Validar nombre Profesor 3
    if (sNombreProfesor3 == '' || (reglaLetras.test(sNombreProfesor3) == false)) {
        inputNombreProfesor3.classList.add('errorInput');
        bError = true;
    } else {
        inputNombreProfesor3.classList.remove('errorInput');
    }


    return bError;
};

function obtenerDatos() {

    let sCurso = selectCursos.value;
    let sLaboratorio = selectLaboratorios.value;
    let nNumeroGrupo = inputNumeroGrupo.value;
    let sNombreProfesor = inputNombreProfesor.value;
    let nNumeroEstudiantes = inputNumeroEstudiantes.value;


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
        let respuesta = registrarGrupo(sCurso, sLaboratorio, nNumeroGrupo, sNombreProfesor, nNumeroEstudiantes);
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
};

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

function mostrarBusqueda(pFiltro) {
    let tbody = document.querySelector('#tblBusqueda tbody');
    if (!pFiltro) {
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for (let i = 0; i < sListaGrupos.length; i++) {
        if ((sListaGrupos[i]['nombreProfesor'].toLowerCase()).includes(pFiltro.toLowerCase())) {
            let fila = tbody.insertRow();

            let celdaNumeroGrupo = fila.insertCell();
            let celdaNombreProfesor = fila.insertCell();
            let celdaNumeroEstudiantes = fila.insertCell();
            let celdaTiempoEntrada = fila.insertCell();
            let celdaTiempoSalida = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();

            celdaNumeroGrupo.innerHTML = sListaGrupos[i]['numeroGrupo'];
            celdaNombreProfesor.innerHTML = sListaGrupos[i]['nombreProfesor'];
            celdaNumeroEstudiantes.innerHTML = sListaGrupos[i]['numeroEstudiantes'];
            celdaTiempoEntrada.innerHTML = sListaGrupos[i]['tiempoEntrada'];
            celdaTiempoSalida.innerHTML = sListaGrupos[i]['tiempoSalida'];

            let botonEditar = document.createElement('a');
            botonEditar.classList.add('far');
            botonEditar.classList.add('fa-edit');
    
            botonEditar.dataset.id = sListaGrupos[i]['_id'];
            //botonEditar.addEventListener('click', editar);
    
            celdaEditar.appendChild(botonEditar);

            let botonEliminar = document.createElement('a');
            botonEliminar.classList.add('far');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset.id = sListaGrupos[i]['_id'];
            botonEliminar.addEventListener('click', eliminar);

            celdaEliminar.appendChild(botonEliminar);

        }
    }
};

function mostrarGrupos(){
    sListaGrupos = obtenerGrupos();

    let selectGrupos = document.getElementById('txtGrupo');
    selectGrupos.innerHTML = '';

    for(let i=0; i < sListaGrupos.length; i++){
        let sGrupo = sListaGrupos[i]['numero'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sGrupo;
        nuevaOpcion.value = sGrupo;
        selectGrupos.add(nuevaOpcion);
    }
};
function limpiarFormulario() {
    inputNumeroGrupo.value = '';
    inputNombreProfesor.value = '';
    inputNumeroEstudiantes.value = '';
    selectCursos.value = '';
    selectLaboratorios.value = '';
    inputHorarioDomingo.value = '';
    inputHorarioLunes.value = '';
    inputHorarioMartes.value = '';
    inputHorarioMiercoles.value = '';
    inputHorarioJueves.value = '';
    inputHorarioViernes.value = '';
    inputHorarioSabado.value = '';
    inputHorarioVirtual.value = '';
};

function mostrarCursos() {
    let selectCursos = document.getElementById('txtCurso');
    selectCursos.innerHTML = '';

    for (let i = 0; i < sListaCursos.length; i++) {
        let sCurso = sListaCursos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCurso;
        nuevaOpcion.value = sCurso;
        selectCursos.add(nuevaOpcion);
    }
};

function mostrarLaboratorios() {
    let selectLaboratorios = document.getElementById('txtLaboratorio');
    selectLaboratorios.innerHTML = '';

    for (let i = 0; i < sListaLaboratorios.length; i++) {
        let sLaboratorio = sListaLaboratorios[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sLaboratorio;
        nuevaOpcion.value = sLaboratorio;
        selectLaboratorios.add(nuevaOpcion);
    }
};

function eliminar() {
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar el grupo?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.value) {
            eliminarGrupo(id);
            sListaGrupos = obtenerGrupos();
            mostrarBusqueda();
            mostrarGrupos();
            swal(
                'Eliminada!',
                'La sede ha sido eliminada.',
                'success'
            )
        }
    })
};