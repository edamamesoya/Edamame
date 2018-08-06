'use strict';

let sListaCursos = obtenerCursos();
mostrarBusqueda();

/**
 * Declaración de variables.
 */
const inputCodigo = document.querySelector('#txtCodigo');
const inputNombre = document.querySelector('#txtNombre');
const inputCreditos = document.querySelector('#txtCreditos');

const inputEditarCodigo = document.querySelector('#txtEditarCodigo');
const inputEditarNombre = document.querySelector('#txtEditarNombre');
const inputEditarCreditos = document.querySelector('#txtEditarCreditos');
const chkEstado = document.querySelector('#chkEstado');

const inputId = document.querySelector('#txtId');

const botonRegistrar = document.querySelector('#btnRegistrar');
const botonModificar = document.querySelector('#btnEditar');
const inputBuscar = document.querySelector('#txtBuscar');

/**
 * Declaración de eventos relacionados a elementos HTML.
 */
botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);
inputBuscar.addEventListener('keyup', function(){
    mostrarBusqueda(inputBuscar.value)
});

/**
 * Declaración de expresiones regulares.
 */
const regexCodigo = /^[a-zA-Z0-9\-]+$/;
const regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ0-9 ]+$/;
const regexCreditos = /^[0-9]+$/;

/**
 * Descripción: Registra un curso con los datos obtenidos del usuario.
 */
function obtenerDatos(){
    let sCodigo = inputCodigo.value;
    let sNombre = inputNombre.value;
    let nCreditos = inputCreditos.value;
    // let sListaRequisitos = [];

    // let requisito = document.querySelectorAll('#lstRequisitos input[type=checkbox]');
    // for (let i=0; i < requisito.length; i++) {
    //     if (requisito[i].checked){
    //         sListaRequisitos.push(requisito[i].value);
    //     }
    // }
    // console.log(sListaRequisitos);
    // let a = JSON.stringify(sListaRequisitos);

    let bError = false;
    bError = validarRegistro();
    
    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el curso, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    }else{
        let respuesta = registrarCurso(sCodigo , sNombre, nCreditos);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            sListaCursos = obtenerCursos();
            mostrarBusqueda();
            limpiarFormulario();
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
    let nCreditos = inputEditarCreditos.value;

    let sEstado = chkEstado.checked;
    let sId = inputId.value;

    let bError = false;
    bError = validarRegistroModificar();
    
    if(bError == true){
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo modificar el curso, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        let respuesta = actualizarCurso(sId, sCodigo , sNombre, nCreditos, sEstado);
        if(respuesta.success == true){
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            sListaCursos = obtenerCursos();
            limpiarFormularioModificar();
            mostrarBusqueda();
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
    let nCreditos = inputCreditos.value;

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
    return bError;
};

function validarRegistroModificar(){
    let bError = false;
    let sCodigo = inputEditarCodigo.value;
    let sNombre = inputEditarNombre.value;
    let nCreditos = Number(inputEditarCreditos.value);

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

    // Validación del input para créditos
    if(nCreditos == 0 || (regexCreditos.test(nCreditos) == false) ){
        inputEditarCreditos.classList.add('errorInput');
        bError = true;
    }else{
        inputEditarCreditos.classList.remove('errorInput');
    }

    return bError;
};

/**
 * Descripción: Filtra los cursos de una lista de cursos registradas cuyo nombre haga match, 
 * y las muestra en una tabla junto con las opciones para editar y eliminar.
 * @param: pFiltro
 */
function mostrarBusqueda(pFiltro){
    let cursosEncontrados = 0;
    let tbody = document.querySelector('#tblBusqueda tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    for(let i = 0; i < sListaCursos.length; i++){

        if( (sListaCursos[i]['codigo'].toLowerCase()).includes(pFiltro.toLowerCase()) || (sListaCursos[i]['nombre'].toLowerCase()).includes(pFiltro.toLowerCase())){
            let fila = tbody.insertRow();

            let celdaCodigo = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCreditos = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();

            celdaCodigo.innerHTML = sListaCursos[i]['codigo'];
            celdaNombre.innerHTML = sListaCursos[i]['nombre'];
            celdaCreditos.innerHTML = sListaCursos[i]['creditos'];

            // let sRequisitos = '';
            // sRequisitos = sListaCursos[i]['requisitos'].toString().replace("[", "");
            // sRequisitos = sRequisitos.toString().replace("]", "");
            // for(let j = 0; j < sRequisitos.length; j++) {
            //     sRequisitos = sRequisitos.toString().replace("\"", "");
            // }

            // if(sListaCursos[i]['requisitos'] == '[]'){
            //     celdaRequisitos.innerHTML = 'No tiene';
            // }else{
            //     celdaRequisitos.innerHTML = sRequisitos;
            // }

            let bEstado = sListaCursos[i]['estado'];
            if(bEstado){
                celdaEstado.innerHTML = 'Activo';
            }else{
                celdaEstado.innerHTML = 'Inactivo';
            }

            let botonEditar = document.createElement('a');
            botonEditar.classList.add('far');
            botonEditar.classList.add('fa-edit');

            botonEditar.dataset.id = sListaCursos[i]['_id'];
            botonEditar.addEventListener('click', editar);

            celdaEditar.appendChild(botonEditar);

            let botonEliminar = document.createElement('a');
            botonEliminar.classList.add('far');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset.id = sListaCursos[i]['_id'];
            botonEliminar.addEventListener('click', eliminar); 

            celdaEliminar.appendChild(botonEliminar);

            cursosEncontrados++;
        }
    }

    if(sListaCursos.length == 0){
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    }else{
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
    // if(cursosEncontrados == 0){
    //     console.log('No existen cursos que cumplan con el criterio de búsqueda');
    // }
};

/**
 * Descripción: Limpia los inputs del formulario de registro
 * podiendo '' en cada uno de los campos.
 */
function limpiarFormulario(){
    inputCodigo.value = '';
    inputNombre.value = '';
    inputCreditos.value = '';
};

function limpiarFormularioModificar(){
    inputEditarCodigo.value = '';
    inputEditarNombre.value = '';
    inputEditarCreditos.value = '';
};

// function mostrarRequisitos() {     
//     let selectRequisitos = document.querySelector('#lstRequisitos');
//     selectRequisitos.innerHTML = '';

//     for (let i=0; i < sListaCursos.length; i++) { 

//     let etiquetaRequisito = document.createElement('label');
//     let requisito = document.createElement('input');

//     requisito.setAttribute('type', 'checkbox');
//     requisito.setAttribute('name', sListaCursos[i]['nombre']);
//     requisito.setAttribute('value', sListaCursos[i]['codigo']);

//     etiquetaRequisito.innerHTML = sListaCursos[i]['nombre'];
//     etiquetaRequisito.setAttribute('for', sListaCursos[i]['nombre']);

//     document.getElementById('lstRequisitos').appendChild(requisito);
//     document.getElementById('lstRequisitos').appendChild(etiquetaRequisito);
//     }
// };

function eliminar(){
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar el curso?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.value) {
            eliminarCurso(id);
            sListaCursos = obtenerCursos();
            mostrarBusqueda();
          swal(
            'Eliminado!',
            'El curso ha sido eliminado.',
            'success'
          )
        }
      })
};

function editar(){
    let id = this.dataset.id;

    document.getElementById("modificar").click();
    let curso = obtenerCursoPorId(id);

    inputEditarCodigo.value = curso['codigo'];
    inputEditarNombre.value = curso['nombre'];
    inputEditarCreditos.value = curso['creditos'];
    chkEstado.checked = curso['estado'];
    inputId.value = curso['_id'];
};