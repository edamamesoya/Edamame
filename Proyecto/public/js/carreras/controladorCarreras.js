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

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);

botonAsignar.addEventListener('click', asignarCursos);
inputBuscar.addEventListener('keyup', function(){
    mostrarBusqueda(inputBuscar.value)
});
botonCursosAsignados.addEventListener('click', verAsignados);
botonAsignarCursos.addEventListener('click', verPorAsignar);
inputCarrera.addEventListener('change', mostrarCursosAsignados);

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

    let bError = false;
    bError = validarRegistro();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la carrera, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
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
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
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
    let tabAsignados = document.querySelector('#pestannaAsignados');
    let tabSinAsignar = document.querySelector('#pestannaAsignar');

    tabAsignados.classList.remove('invisible');
    tabAsignados.classList.add('visible');

    tabSinAsignar.classList.remove('visible');
    tabSinAsignar.classList.add('invisible');
    
    mostrarCursosAsignados();
};

/**
 * Descripción: Hace visible la pestaña de cursos sin asignar a una
 * carrera y hace invisible la pestaña de cursos asignados.
 */
function verPorAsignar(){
    let tabAsignados = document.querySelector('#pestannaAsignados');
    let tabSinAsignar = document.querySelector('#pestannaAsignar');

    tabAsignados.classList.remove('visible');
    tabAsignados.classList.add('invisible');

    tabSinAsignar.classList.remove('invisible');
    tabSinAsignar.classList.add('visible');

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

    let selectCursosAsignados = document.querySelector('#lstCursosAsignados');
    selectCursosAsignados.innerHTML = '';

    for (let i=0; i < sListaCarreras.length; i++) { 
        if (sCarreraActual == sListaCarreras[i]['nombre']){
            for (let j=0; j < sListaCarreras[i]['cursosAsignados'].length; j++) { 
                nombreCurso = sListaCarreras[i]['cursosAsignados'][j]['nombreCurso'];
                codigoCurso = sListaCarreras[i]['cursosAsignados'][j]['codigoCurso'];

                let etiquetaCursoAsignado = document.createElement('label');
                let cursoAsignado = document.createElement('input');
        
                cursoAsignado.setAttribute('type', 'checkbox');
                cursoAsignado.setAttribute('name', nombreCurso);
                cursoAsignado.setAttribute('value', codigoCurso);
        
                etiquetaCursoAsignado.innerHTML = nombreCurso;
                etiquetaCursoAsignado.setAttribute('for', nombreCurso);
        
                document.getElementById('lstCursosAsignados').appendChild(cursoAsignado);
                document.getElementById('lstCursosAsignados').appendChild(etiquetaCursoAsignado);
            }
        }
    }
};

/**
 * Descripción: Muestra los cursos sin asignar a una carrera seleccionada.
 */
function mostrarCursosPorAsignar(){     
    sListaCarreras = obtenerCarreras();
    sListaCursos = obtenerCursos();
    let sCarreraActual = document.querySelector('#txtCarrera').value;

    let selectCursosPorAsignar = document.querySelector('#lstCursosPorAsignar');
    selectCursosPorAsignar.innerHTML = '';

    for (let i=0; i < sListaCarreras.length; i++) { 
        if (sCarreraActual == sListaCarreras[i]['nombre']){
            for(let k=0; k < sListaCursos.length; k++){ 
                let bAsignado = false;
                for (let j=0; j < sListaCarreras[i]['cursosAsignados'].length; j++) {
                    if (sListaCursos[k]['nombre'] == sListaCarreras[i]['cursosAsignados'][j]['nombreCurso']){
                        bAsignado = true;
                    }
                }
                if(!bAsignado){
                    let etiquetaCursoPorAsignar = document.createElement('label');
                    let cursoPorAsignar = document.createElement('input');

                    cursoPorAsignar.setAttribute('type', 'checkbox');
                    cursoPorAsignar.setAttribute('name', sListaCursos[k]['nombre']);
                    cursoPorAsignar.setAttribute('value', sListaCursos[k]['codigo']);

                    etiquetaCursoPorAsignar.innerHTML = sListaCursos[k]['nombre'];
                    etiquetaCursoPorAsignar.setAttribute('for', sListaCursos[k]['nombre']);

                    document.getElementById('lstCursosPorAsignar').appendChild(cursoPorAsignar);
                    document.getElementById('lstCursosPorAsignar').appendChild(etiquetaCursoPorAsignar);
                }
            }
        }
    }
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
    let curso = document.querySelectorAll('#lstCursosPorAsignar input[type=checkbox]');
    for (let i=0; i < curso.length; i++) {
        if (curso[i].checked){
            console.log(idCarrera);
            console.log(curso.value);
            console.log(curso.name);
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