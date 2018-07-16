'use strict';

let sListaCarreras = obtenerCarreras();
let sListaCursos = obtenerCursos();
mostrarCarreras();
mostrarBusqueda();
mostrarPestannas();

/**
 * Declaración de variables.
 */
let inputCodigo = document.querySelector('#txtCodigo');
let inputNombre = document.querySelector('#txtNombre');
let inputCreditos = document.querySelector('#txtCreditos');
let inputFecha = document.querySelector('#txtFecha');
let inputBuscar = document.querySelector('#txtBuscar');
let inputCarrera = document.querySelector('#txtCarrera');
let botonRegistrar = document.querySelector('#btnRegistrar');
let botonCursosAsignados = document.querySelector('#btnCursosAsignados');
let botonAsignarCursos = document.querySelector('#btnAsignarCursos');
let botonAsignar = document.querySelector('#btnAsignar');

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
botonRegistrar.addEventListener('click', obtenerDatos);
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
        let respuesta = registrarCarrera(sCodigo , sNombre, nCreditos, dFechaCreacion);
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

    // Validación del input para créditos
    if(nCreditos == 0 || (regexCreditos.test(nCreditos) == false) ){
        inputCreditos.classList.add('errorInput');
        bError = true;
    }else{
        inputCreditos.classList.remove('errorInput');
    }

    // Validación del input para fecha
    if (dFechaCreacion == '' || dFechaCreacion > dFechaActual ){
        inputFecha.classList.add('errorInput');
        bError = true;
    }else{
        inputFecha.classList.remove('errorInput');
    }
    return bError;
}

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
        botonEditar.href = '';
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');
        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.href = '#';
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');
        celdaEliminar.appendChild(botonEliminar);
        }
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

/**
 * Descripción: Agrega al html una lista de las carreras registradas.
 */
function mostrarCarreras(){
    sListaCarreras = obtenerCarreras();
    
    let selectCarreras = document.querySelector('#lstCarreras');
    selectCarreras.innerHTML = '';
    for(let i=0; i < sListaCarreras.length; i++){
        let nuevaOpcion = new Option(sListaCarreras[i]['nombre']);
        nuevaOpcion.value = sListaCarreras[i]['nombre'];
        selectCarreras.appendChild(nuevaOpcion);
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
    // sListaCarreras = obtenerCarreras();
    // sListaCursos = obtenerCursos();
    // let sCarreraActual = document.querySelector('#txtCarrera').value;

    // let x=[];
    // let b=false;

    // let selectCursosAsignados = document.querySelector('#lstCursosAsignados');
    // selectCursosAsignados.innerHTML = '';

    // for (let i=0; i < sListaCarreras.length; i++) { 
    //     if (sCarreraActual == sListaCarreras[i]['nombre']){
    //         for(let k=0; k < sListaCursos; k++){ 
    //             b=false;
    //             for (let j=0; j < sListaCarreras[i]['cursosAsignados'].length; j++) {
    //                 if (sListaCurso[k]['nombre'] != sListaCarreras[i]['cursosAsignados'][j]['nombreCurso']){
    //                     b = true;
    //                 }
    //             }
    //             if(b){
    //                 x.push(sListaCurso[k]);
    //             }
    //         }
    //     }
    // }
    // for (let i=0; i < x.length; i++) { 
    //     let etiquetaCursoPorAsignar = document.createElement('label');
    //     let cursoPorAsignar = document.createElement('input');
    
    //     cursoPorAsignar.setAttribute('type', 'checkbox');
    //     cursoPorAsignar.setAttribute('name', x[i]['nombre']);
    //     cursoPorAsignar.setAttribute('value', x[i]['codigo']);
    
    //     etiquetaCursoPorAsignar.innerHTML = x[i]['nombre'];
    //     etiquetaCursoPorAsignar.setAttribute('for', x[i]['nombre']);
    
    //     document.getElementById('lstCursosPorAsignar').appendChild(cursoPorAsignar);
    //     document.getElementById('lstCursosPorAsignar').appendChild(etiquetaCursoPorAsignar);
    //     }
    sListaCursos = obtenerCursos();

    let selectCursosPorAsignar = document.querySelector('#lstCursosPorAsignar');
    selectCursosPorAsignar.innerHTML = '';
    
    for (let i=0; i < sListaCursos.length; i++) { 

    let etiquetaCursoPorAsignar = document.createElement('label');
    let cursoPorAsignar = document.createElement('input');

    cursoPorAsignar.setAttribute('type', 'checkbox');
    cursoPorAsignar.setAttribute('name', sListaCursos[i]['nombre']);
    cursoPorAsignar.setAttribute('value', sListaCursos[i]['codigo']);

    etiquetaCursoPorAsignar.innerHTML = sListaCursos[i]['nombre'];
    etiquetaCursoPorAsignar.setAttribute('for', sListaCursos[i]['nombre']);

    document.getElementById('lstCursosPorAsignar').appendChild(cursoPorAsignar);
    document.getElementById('lstCursosPorAsignar').appendChild(etiquetaCursoPorAsignar);
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