'use strict';

let sListaGrupos = obtenerGrupos();
let sListaCursos = obtenerCursos();
let sListaUsuarios = obtenerUsuarios();
let sListaLaboratorios = obtenerLaboratorios();

mostrarBusqueda();
mostrarCursos();
mostrarProfesores();

const selectCurso = document.querySelector('#txtCurso');
const selectTipo = document.querySelector('#txtTipo');
const inputNumero = document.querySelector('#txtNumero');
const inputCupo = document.querySelector('#txtCupo');
const selectProfesor = document.querySelector('#txtProfesor');
const selectLaboratorio = document.querySelector('#txtLaboratorio');

const inputBuscar = document.querySelector('#txtBuscar');
const btnRegistrar = document.querySelector('#btnRegistrar');

btnRegistrar.addEventListener('click', obtenerDatos);
inputBuscar.addEventListener('keyup', function () {
    mostrarBusqueda(inputBuscar.value)
});
selectCurso.addEventListener('change', function () {
    mostrarNumero(selectCurso.value)
});
selectTipo.addEventListener('change', function () {
    mostrarLaboratorio(selectTipo.value)
});


let regexLetras = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let regexNumero = /^[0-9]+$/;

function obtenerDatos() {
    let sCurso = selectCurso.value;
    let sTipo = selectTipo.value;
    let sNumero = inputNumero.value;
    let nCupo = Number(inputCupo.value);
    let sProfesor = selectProfesor.value;
    let sLaboratorio = selectLaboratorio.value;

    let bError = false;

    bError = validar();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el grupo, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarGrupo(sNumero, sCurso, nCupo, sProfesor, sTipo, sLaboratorio);
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
            mostrarLaboratorio('');
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

    let sCurso = selectCurso.value;
    let sTipo = selectTipo.value;
    let sNumero = inputNumero.value;
    let nCupo = Number(inputCupo.value);
    let sProfesor = selectProfesor.value;
    let sLaboratorio = selectLaboratorio.value;

    //validar curso
    if (sCurso == '') {
        selectCurso.classList.add('errorInput');
        bError = true;
    } else {
        selectCurso.classList.remove('errorInput');
    }
    //Validar tipo
    if (sTipo == '') {
        selectTipo.classList.add('errorInput');
        bError = true;
    } else {
        selectTipo.classList.remove('errorInput');
    }
    //validar número
    if (sNumero == '') {
        inputNumero.classList.add('errorInput');
        bError = true;
    } else {
        inputNumero.classList.remove('errorInput');
    }
    //Validar cupo
    if (nCupo == 0 || (regexNumero.test(nCupo) == false)) {
        inputCupo.classList.add('errorInput');
        bError = true;
    } else {
        inputCupo.classList.remove('errorInput');
    }
    //Validar profesor
    if (sProfesor == '') {
        selectProfesor.classList.add('errorInput');
        bError = true;
    } else {
        selectProfesor.classList.remove('errorInput');
    }
    //Validar laboratorio
    if (sTipo == 'Presencial'){
        if (sLaboratorio == '') {
            selectLaboratorio.classList.add('errorInput');
            bError = true;
        } else {
            selectLaboratorio.classList.remove('errorInput');
        }
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
        if ((sListaGrupos[i]['curso'].toLowerCase()).includes(pFiltro.toLowerCase())) {
            let fila = tbody.insertRow();

            let celdaCurso = fila.insertCell();
            let celdaGrupo = fila.insertCell();
            let celdaProfesor = fila.insertCell();
            let celdaTipo = fila.insertCell();
            let celdaLaboratorio = fila.insertCell();
            let celdaCupo = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();

            celdaCurso.innerHTML = sListaGrupos[i]['curso'];
            celdaGrupo.innerHTML = sListaGrupos[i]['numero'];
            celdaProfesor.innerHTML = sListaGrupos[i]['profesores'];
            celdaTipo.innerHTML = sListaGrupos[i]['tipo'];

            if(sListaGrupos[i]['tipo'] == 'Presencial'){
                celdaLaboratorio.innerHTML = sListaGrupos[i]['laboratorio'];
            }else{
                celdaLaboratorio.innerHTML = 'No aplica';
            }

            celdaCupo.innerHTML = sListaGrupos[i]['cupo'];

            let botonEditar = document.createElement('a');
            botonEditar.classList.add('far');
            botonEditar.classList.add('fa-edit');   
            celdaEditar.appendChild(botonEditar);

            let botonEliminar = document.createElement('a');
            botonEliminar.classList.add('far');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset.id = sListaGrupos[i]['_id'];
            botonEliminar.addEventListener('click', eliminar);

            celdaEliminar.appendChild(botonEliminar);
        }
    }
    if(sListaGrupos.length == 0){
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    }else{
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
};

function limpiarFormulario() {
    selectCurso.value = '';
    selectTipo.value = '';
    inputNumero.value = '';
    inputCupo.value = '';
    selectProfesor.value = '';
    selectLaboratorio.value = '';
};

function mostrarCursos() {
    let cursos = document.getElementById('txtCurso');
    cursos.innerHTML = '';

    let placeholder = document.createElement('option');
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.text = 'Seleccione una opción';
    placeholder.value = '';
    cursos.add(placeholder);

    for (let i = 0; i < sListaCursos.length; i++) {
        let sCurso = sListaCursos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCurso;
        nuevaOpcion.value = sCurso;
        cursos.add(nuevaOpcion);
    }
};

function mostrarProfesores() {
    let profesores = document.getElementById('txtProfesor');
    profesores.innerHTML = '';

    let placeholder = document.createElement('option');
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.text = 'Seleccione una opción';
    placeholder.value = '';
    profesores.add(placeholder);

    for (let i = 0; i < sListaUsuarios.length; i++) {
        if (sListaUsuarios[i]['rol'] == 'profesor'){
            let sProfesor = sListaUsuarios[i]['primerNombre'] + ' ' + sListaUsuarios[i]['primerApellido'] + ' ' + sListaUsuarios[i]['segundoApellido'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sProfesor;
            nuevaOpcion.value = sProfesor;
            profesores.add(nuevaOpcion);
        }
    }
};

function mostrarNumero(sCurso){
    let nCursos = 1;
    for(let i=0; i < sListaGrupos.length; i++){
        if (sListaGrupos[i]['curso'] == sCurso){
            nCursos++;
        }
    }
    inputNumero.value = 'G' + nCursos;
};

function mostrarLaboratorio(sTipo){
    if(sTipo == 'Presencial'){
        document.getElementById('divLaboratorio').classList.add('visibleIB');
        document.getElementById('divLaboratorio').classList.remove('invisible');

        let laboratorios = document.getElementById('txtLaboratorio');
        laboratorios.innerHTML = '';

        let placeholder = document.createElement('option');
        placeholder.disabled = true;
        placeholder.selected = true;
        placeholder.text = 'Seleccione una opción';
        placeholder.value = '';
        laboratorios.add(placeholder);

        for (let i = 0; i < sListaLaboratorios.length; i++) {
            let sLaboratorio = sListaLaboratorios[i]['nombre'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sLaboratorio;
            nuevaOpcion.value = sLaboratorio;
            laboratorios.add(nuevaOpcion);
        }
    }else{
        document.getElementById('divLaboratorio').classList.add('invisible');
        document.getElementById('divLaboratorio').classList.remove('visibleIB');
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
            swal(
                'Eliminado!',
                'El grupo ha sido eliminado.',
                'success'
            )
        }
    })
};