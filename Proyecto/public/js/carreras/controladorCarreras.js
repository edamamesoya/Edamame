'use strict';

let sListaCarreras = obtenerCarreras();
let sListaCursos = obtenerCursos();
mostrarCarreras();
mostrarBusqueda();
mostrarPestannas();

/**
 * Declaración de variables.
 */
const inputCodigo = document.querySelector('#txtCodigo');
const inputNombre = document.querySelector('#txtNombre');
const selectGrado = document.querySelector('#txtGrado');
const inputCreditos = document.querySelector('#txtCreditos');
const inputFecha = document.querySelector('#txtFecha');

const inputEditarCodigo = document.querySelector('#txtEditarCodigo');
const inputEditarNombre = document.querySelector('#txtEditarNombre');
const selectEditarGrado = document.querySelector('#txtEditarGrado');
const inputEditarCreditos = document.querySelector('#txtEditarCreditos');
const inputEditarFecha = document.querySelector('#txtEditarFecha');
const chkEstado = document.querySelector('#chkEstado');

const inputId = document.querySelector('#txtId');

const inputBuscar = document.querySelector('#txtBuscar');
const inputCarrera = document.querySelector('#txtCarrera');
const botonRegistrar = document.querySelector('#btnRegistrar');
const botonModificar = document.querySelector('#btnEditar');
const botonCursosAsignados = document.querySelector('#btnCursosAsignados');
const botonAsignarCursos = document.querySelector('#btnAsignarCursos');
const botonAsignar = document.querySelector('#btnAsignar');
const botonDesasignar = document.querySelector('#btnDesasignar');

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);

botonAsignar.addEventListener('click', asignarCursos);
botonDesasignar.addEventListener('click', desasignarCursos);
inputBuscar.addEventListener('keyup', function(){
    mostrarBusqueda(inputBuscar.value)
});
botonCursosAsignados.addEventListener('click', verAsignados);
botonAsignarCursos.addEventListener('click', verPorAsignar);
inputCarrera.addEventListener('change', function(){
    verAsignados()
});

/**
 * Declaración de expresiones regulares.
 */
let regexCodigo = /^[a-zA-Z0-9\-]+$/;
let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let regexCreditos = /^[0-9]+$/;

/**
 * Descripción: Registra una carrera con los datos obtenidos del usuario.
 */
function obtenerDatos(){
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let sGrado = selectGrado.value;
    let nCreditos = inputCreditos.value;
    let dFechaCreacion = inputFecha.value;

    let msgError = '';

    let bError = false;
    bError = validarRegistro();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la carrera, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#30336b'
          });
    }else{
        let respuesta = registrarCarrera(sCodigo , sNombre, sGrado, nCreditos, dFechaCreacion);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            sListaCarreras = obtenerCarreras();
            limpiarFormulario();
            mostrarBusqueda();
            mostrarCursosAsignados();
            mostrarCarreras();
            document.getElementById("buscar").click();
        }else{
            if(respuesta.msg['code'] == 11000){
                console.log(respuesta.msg);
                msgError = 'Ya existe una carrera con ese nombre';
            }
            swal({
                title: 'Registro incorrecto',
                text: msgError,
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }   
    }
};

function modificarDatos(){
    let sCodigo = inputEditarCodigo.value;
    let sNombre = inputEditarNombre.value;
    let sGrado = selectEditarGrado.value;
    let nCreditos = inputEditarCreditos.value;
    let dFechaCreacion = inputEditarFecha.value;
    let sEstado = chkEstado.checked;
    let sId = inputId.value;

    let bError = false;
    bError = validarRegistroModificar();
    
    if(bError == true){
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo modificar la carrera, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = actualizarCarrera(sId, sCodigo , sNombre, sGrado, nCreditos, dFechaCreacion, sEstado);
        if(respuesta.success == true){
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            sListaCarreras = obtenerCarreras();
            limpiarFormularioModificar();
            mostrarBusqueda();
            mostrarCursosAsignados();
            mostrarCarreras();
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

/**
 * Descripción: Valida los campos del registro y devuelve 'false'
 * en caso de que todos sean válidos o devuelve 'true' en caso de
 * que al menos uno no lo sea.
 * @return: {boolean} bError
 */
function validarRegistro(){
    let bError = false;
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let sGrado = selectGrado.value;
    let nCreditos = Number(inputCreditos.value);
    let dFechaCreacion = new Date(inputFecha.value);
    let dFechaActual = new Date();

    // Validación del input para código
    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false) ){
        inputCodigo.classList.add('errorInput');
        document.getElementById('tooltipCodigo').classList.add('visible');
        document.getElementById('tooltipCodigo').classList.remove('invisible');
        bError = true;
    }else{
        inputCodigo.classList.remove('errorInput');
        document.getElementById('tooltipCodigo').classList.add('invisible');
        document.getElementById('tooltipCodigo').classList.remove('visible');
    }

    // Validación del input para nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false) ){
        inputNombre.classList.add('errorInput');
        document.getElementById('tooltipNombre').classList.add('visible');
        document.getElementById('tooltipNombre').classList.remove('invisible');
        bError = true;
    }else{
        inputNombre.classList.remove('errorInput');
        document.getElementById('tooltipNombre').classList.add('invisible');
        document.getElementById('tooltipNombre').classList.remove('visible');
    }

    // Validación del select grado
    if (sGrado == ''){
        selectGrado.classList.add('errorInput');
        bError = true;
    }else{
        selectGrado.classList.remove('errorInput');
    }

    // Validación del input para créditos
    if(nCreditos == 0 || (regexCreditos.test(nCreditos) == false) ){
        inputCreditos.classList.add('errorInput');
        bError = true;
    }else{
        inputCreditos.classList.remove('errorInput');
    }

    // Validación del input para fecha
    if (inputFecha.value == '' || dFechaCreacion > dFechaActual ){
        inputFecha.classList.add('errorInput');
        bError = true;
    }else{
        inputFecha.classList.remove('errorInput');
    }
    return bError;
}

function validarRegistroModificar(){
    let bError = false;
    let sCodigo = inputEditarCodigo.value;
    let sNombre = inputEditarNombre.value;
    let sGrado = selectEditarGrado.value;
    let nCreditos = Number(inputEditarCreditos.value);
    let dFechaCreacion = new Date(inputEditarFecha.value);
    let dFechaActual = new Date();

    // Validación del input para código
    if (sCodigo == '' || (regexCodigo.test(sCodigo) == false) ){
        inputEditarCodigo.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarCodigo.classList.remove('errorInput');
    }

    // Validación del input para nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false) ){
        inputEditarNombre.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarNombre.classList.remove('errorInput');
    }

    // Validación del select grado
    if (sGrado == ''){
        selectGrado.classList.add('errorInput');
        bError = true;
    }else{
        selectGrado.classList.remove('errorInput');
    }

    // Validación del input para créditos
    if(nCreditos == 0 || (regexCreditos.test(nCreditos) == false) ){
        inputEditarCreditos.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarCreditos.classList.remove('errorInput');
    }

    // Validación del input para fecha
    if (dFechaCreacion == '' || dFechaCreacion > dFechaActual ){
        inputEditarFecha.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarFecha.classList.remove('errorInput');
    }
    return bError;
};

/**
 * Descripción: Filtra las carreras de una lista de carreras registradas cuyo nombre haga match, 
 * y las muestra en una tabla junto con las opciones para editar y eliminar.
 * @param: pFiltro
 */
function mostrarBusqueda(pFiltro){
    let tbody = document.querySelector('#tblBusqueda tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for(let i = 0; i < sListaCarreras.length; i++){
        if( (sListaCarreras[i]['codigo'].toLowerCase()).includes(pFiltro.toLowerCase()) || (sListaCarreras[i]['nombre'].toLowerCase()).includes(pFiltro.toLowerCase())){
        let fila = tbody.insertRow();

        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCreditos = fila.insertCell();
        let celdaFechaCreacion = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaCodigo.innerHTML = sListaCarreras[i]['codigo'];
        celdaNombre.innerHTML = sListaCarreras[i]['nombre'];
        celdaCreditos.innerHTML = sListaCarreras[i]['creditos'];
        
        let dFecha = new Date(sListaCarreras[i]['fechaCreacion']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        let bEstado = sListaCarreras[i]['estado'];
        if(bEstado){
            celdaEstado.innerHTML = 'Activa';
        }else{
            celdaEstado.innerHTML = 'Inactiva';
        }

        let botonEditar = document.createElement('a');
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');

        botonEditar.dataset.id = sListaCarreras[i]['_id'];
        botonEditar.addEventListener('click', editar);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');

        botonEliminar.dataset.id = sListaCarreras[i]['_id'];
        botonEliminar.addEventListener('click', eliminar);

        celdaEliminar.appendChild(botonEliminar);
        }
    }
    if(sListaCarreras.length == 0){
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    }else{
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
};

/**
 * Descripción: Limpia los inputs del formulario de registro
 * podiendo en '' cada uno de los campos.
 */
function limpiarFormulario(){
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCreditos.value = '';
    inputFecha.value = '';
};

function limpiarFormularioModificar(){
    inputEditarCodigo.value = '';
    inputEditarNombre.value = '';
    inputEditarCreditos.value = '';
    inputEditarFecha.value = '';
};

/**
 * Descripción: Agrega al html una lista de las carreras registradas.
 */
function mostrarCarreras(){
    sListaCarreras = obtenerCarreras();

    let selectCarreras = document.getElementById('txtCarrera');
    selectCarreras.innerHTML = '';

    let placeholder = document.createElement('option');
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.text = 'Seleccione una opción';
    placeholder.value = '';
    selectCarreras.add(placeholder);

    for(let i=0; i < sListaCarreras.length; i++){
        let sCarrera = sListaCarreras[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCarrera;
        nuevaOpcion.value = sCarrera;
        selectCarreras.add(nuevaOpcion);
    }
};

/**
 * Descripción: Hace visible la pestaña de cursos asignados a una
 * carrera y hace invisible la pestaña de cursos sin asignar.
 */
function verAsignados(){
    document.querySelector('#btnAsignar').classList.add('invisible');
    document.querySelector('#btnAsignar').classList.remove('visible');

    document.querySelector('#btnDesasignar').classList.add('visible');
    document.querySelector('#btnDesasignar').classList.remove('invisible');

    mostrarCursosAsignados();
};

/**
 * Descripción: Hace visible la pestaña de cursos sin asignar a una
 * carrera y hace invisible la pestaña de cursos asignados.
 */
function verPorAsignar(){
    document.querySelector('#btnAsignar').classList.add('visible');
    document.querySelector('#btnAsignar').classList.remove('invisible');

    document.querySelector('#btnDesasignar').classList.add('invisible');
    document.querySelector('#btnDesasignar').classList.remove('visible');

    mostrarCursosPorAsignar();
};

/**
 * Descripción: Muestra los cursos asignados a una carrera seleccionada.
 */
function mostrarCursosAsignados(){     
    sListaCursos = obtenerCursos();
    sListaCarreras = obtenerCarreras();
    let sCarreraActual = document.querySelector('#txtCarrera').value;
    let nombreCurso = '';
    let codigoCurso = '';
    let nCantCursos = 0;

    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';

    for(let i=0; i < sListaCarreras.length; i++){
        if (sCarreraActual == sListaCarreras[i]['nombre']){
            nCantCursos = sListaCarreras[i]['cursosAsignados'].length;
            for (let j=0; j < sListaCarreras[i]['cursosAsignados'].length; j++) { 
                nombreCurso = sListaCarreras[i]['cursosAsignados'][j]['nombreCurso'];
                codigoCurso = sListaCarreras[i]['cursosAsignados'][j]['codigoCurso'];

                let fila = tbody.insertRow();

                let celdaSeleccionar = fila.insertCell();
                let celdaCurso = fila.insertCell();
                let celdaRequisitos = fila.insertCell();

                let checkCurso = document.createElement('input');
                checkCurso.type = "checkbox";
                checkCurso.name = nombreCurso;
                checkCurso.value = codigoCurso;

                celdaSeleccionar.appendChild(checkCurso);
                celdaCurso.innerHTML = nombreCurso;

                let botonRequisitos = document.createElement('a');
                botonRequisitos.classList.add('fas');
                botonRequisitos.classList.add('fa-plus');

                // botonEditar.dataset.id = sListaCarreras[i]['_id'];
                // botonRequisitos.addEventListener('click', editar);

                celdaRequisitos.appendChild(botonRequisitos);
            }
        }
    }
    if(nCantCursos == 0){
        document.getElementById('mensajeAsignados').classList.add('visible');
        document.getElementById('mensajeAsignados').classList.remove('invisible');
    }else{
        document.getElementById('mensajeAsignados').classList.add('invisible');
        document.getElementById('mensajeAsignados').classList.remove('visible');
    }
    document.getElementById('mensajePorAsignar').classList.add('invisible');
};

/**
 * Descripción: Muestra los cursos sin asignar a una carrera seleccionada.
 */
function mostrarCursosPorAsignar(){     
    sListaCarreras = obtenerCarreras();
    sListaCursos = obtenerCursos();
    let nCantCursos = 0;
    let sCarreraActual = document.querySelector('#txtCarrera').value;

    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';

    for(let i=0; i < sListaCarreras.length; i++){
        if (sCarreraActual == sListaCarreras[i]['nombre']){
            for(let k=0; k < sListaCursos.length; k++){ 
                let bAsignado = false;
                for (let j=0; j < sListaCarreras[i]['cursosAsignados'].length; j++) {
                    if (sListaCursos[k]['nombre'] == sListaCarreras[i]['cursosAsignados'][j]['nombreCurso']){
                        bAsignado = true;
                    }
                }
                if(!bAsignado){
                    nCantCursos++;

                    let fila = tbody.insertRow();

                    let celdaSeleccionar = fila.insertCell();
                    let celdaCurso = fila.insertCell();
                    let celdaRequisitos = fila.insertCell();

                    let checkCurso = document.createElement('input');
                    checkCurso.type = "checkbox";
                    checkCurso.name = sListaCursos[k]['nombre'];
                    checkCurso.value = sListaCursos[k]['codigo'];

                    celdaSeleccionar.appendChild(checkCurso);
                    celdaCurso.innerHTML = sListaCursos[k]['nombre'];

                    let botonRequisitos = document.createElement('a');
                    botonRequisitos.classList.add('fas');
                    botonRequisitos.classList.add('fa-plus');

                    // botonEditar.dataset.id = sListaCarreras[i]['_id'];
                    // botonRequisitos.addEventListener('click', editar);

                    celdaRequisitos.appendChild(botonRequisitos);
                }

            }
        }
    }
    if(nCantCursos == 0){
        document.getElementById('mensajePorAsignar').classList.add('visible');
        document.getElementById('mensajePorAsignar').classList.remove('invisible');
    }else{
        document.getElementById('mensajePorAsignar').classList.add('invisible');
        document.getElementById('mensajePorAsignar').classList.remove('visible');
    }
    document.getElementById('mensajeAsignados').classList.add('invisible');
};

/**
 * Descripción: Hace visible los botones para seleccionar los cursos
 * asignados/sin asignar.
 */
function mostrarPestannas() {
    let x = document.querySelector('#btnPestanna');
    x.classList.add('visible');
    x.classList.remove('invisible');
};

/**
 * Descripción: Hace visible la pestaña de cursos sin asignar a una
 * carrera y hace invisible la pestaña de cursos asignados.
 */
function asignarCursos(){
    let idCarrera = '';

    for (let j=0; j < sListaCarreras.length; j++) {
        if (sListaCarreras[j]['nombre'] == inputCarrera.value){
            idCarrera = sListaCarreras[j]['_id'];
        }
    }
    let curso = document.querySelectorAll('#tblCursos input[type=checkbox]');
    for (let i=0; i < curso.length; i++) {
        if (curso[i].checked){
            let respuesta = agregarCurso(idCarrera, curso[i].value, curso[i].name);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            botonCursosAsignados.click();
        }else{
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        } 
        }
    } 
};

function desasignarCursos(){
    let idCarrera = '';
    let carrera = '';
    let idCurso = '';

    for (let j=0; j < sListaCarreras.length; j++) {
        if (sListaCarreras[j]['nombre'] == inputCarrera.value){
            idCarrera = sListaCarreras[j]['_id'];
            carrera = sListaCarreras[j];
        }
    }
    let curso = document.querySelectorAll('#tblCursos input[type=checkbox]');
    for (let i=0; i < curso.length; i++) {
        if (curso[i].checked){
            for (let j=0; j < carrera['cursosAsignados'].length; j++){
                if (curso[i].name == carrera['cursosAsignados'][j]['nombreCurso']){
                    idCurso = carrera['cursosAsignados'][j]['_id'];
                }
            }
            let respuesta = desenlazarCurso(idCarrera, idCurso);
        if(respuesta.success == true){
            swal({
                title: 'Desenlace correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            botonCursosAsignados.click();
        }else{
            swal({
                title: 'Desenlace incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
              });
        } 
        }
    } 
};

function eliminar(){
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar la carrera?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.value) {
            eliminarCarrera(id);
            sListaCarreras = obtenerCarreras();
            mostrarBusqueda();
            mostrarCursosAsignados();
            mostrarCarreras();
          swal(
            'Eliminada!',
            'La carrera ha sido eliminada.',
            'success'
          )
        }
      })
};

function editar(){
    let id = this.dataset.id;

    document.getElementById("modificar").click();
    let carrera = obtenerCarreraPorId(id);

    inputEditarCodigo.value = carrera['codigo'];
    inputEditarNombre.value = carrera['nombre'];
    selectEditarGrado.value = carrera['grado'];
    inputEditarCreditos.value = carrera['creditos'];
    inputEditarFecha.valueAsDate = new Date(carrera['fechaCreacion']);
    chkEstado.checked = carrera['estado'];
    inputId.value = carrera['_id'];
};