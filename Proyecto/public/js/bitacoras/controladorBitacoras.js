'use strict';

let sListaBitacoras = obtenerBitacoras();
let sListaUsuarios = obtenerUsuarios();
mostrarBusqueda();
mostrarBitacoras();

const selectBitacora = document.querySelector('#txtBitacora');
const selectActividad = document.querySelector('#txtActividad');
const inputDescripcion = document.querySelector('#txtDescripcion');
const inputHoras = document.querySelector('#txtHoras');
const inputFecha = document.querySelector('#txtFecha');
const btnRegistrar = document.querySelector('#btnRegistrar');

const inputEditarBitacora = document.querySelector('#txtEditarBitacora');
const selectEditarActividad = document.querySelector('#txtEditarActividad');
const inputEditarDescripcion = document.querySelector('#txtEditarDescripcion');
const inputEditarHoras = document.querySelector('#txtEditarHoras');
const inputEditarFecha = document.querySelector('#txtEditarFecha');
const btnModificar = document.querySelector('#btnEditar');
const btnAprobar = document.querySelector('#btnAprobar');
const btnRechazar = document.querySelector('#btnRechazar');

const inputIdBitacora = document.querySelector('#txtIdBitacora');
const inputIdEntrada = document.querySelector('#txtIdEntrada');

const btnCerrar = document.querySelector('#btnCerrar');

btnAprobar.addEventListener('click', aprobarBitacora);
btnRechazar.addEventListener('click', rechazarBitacora);
btnRegistrar.addEventListener('click', nuevaEntrada);
btnModificar.addEventListener('click', modificarEntrada);
btnCerrar.addEventListener('click', cerrarModal);
/**
 * Declaración de variables.
 */
const inputBuscar = document.querySelector('#txtBuscar');

inputBuscar.addEventListener('keyup', function(){
    mostrarBusqueda(inputBuscar.value)
});

/**
 * Declaración de expresiones regulares.
 */
const regexCodigo = /^[a-zA-Z0-9\-]+$/;
const regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
const regexHoras = /^[0-9]+$/;
const regexDescripcion = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ0-9\(\)\@\"\'\:\.\,\;\-\#\_\\\/\?\¿\!\¡ ]+$/;

function verificarUsuario(){
    let sCorreo = localStorage.getItem('correoUsuarioActivo');
    for (let i=0; i < sListaUsuarios.length; i++){
        if (sListaUsuarios[i]['correo'] == sCorreo){
            return sListaUsuarios[i];
        }
    }
};

function limpiarFormulario(){
    selectBitacora.value = '';
    selectActividad.value = '';
    inputDescripcion.value = '';
    inputHoras.value = '';
    inputFecha.value = '';
};

function limpiarFormularioModificar(){
    inputEditarBitacora.value = '';
    selectEditarActividad.value = '';
    inputEditarDescripcion.value = '';
    inputEditarHoras.value = '';
    inputEditarFecha.value = '';
};

function mostrarBusqueda(pFiltro){
    let usuarioActivo = verificarUsuario();
    let sNombre = usuarioActivo['primerNombre'];

    let tbody = document.querySelector('#tblBusqueda tbody');
    if(!pFiltro){
        pFiltro = '';
    }
    tbody.innerHTML = '';

    if(usuarioActivo['rol'] == 'asistente'){
        for(let i = 0; i < sListaBitacoras.length; i++){
            if( (sListaBitacoras[i]['asistente'] == sNombre) && (sListaBitacoras[i]['curso'].toLowerCase()).includes(pFiltro.toLowerCase()) ){
                let fila = tbody.insertRow();
        
                let celdaCurso = fila.insertCell();
                let celdaAsistente = fila.insertCell();
                let celdaProfesor = fila.insertCell();
                let celdaHoras = fila.insertCell();
                let celdaFechaCreacion = fila.insertCell();
                let celdaEstado = fila.insertCell();
                let celdaVerMas = fila.insertCell();

                celdaCurso.innerHTML = sListaBitacoras[i]['curso'];
                celdaAsistente.innerHTML = sListaBitacoras[i]['asistente'];
                celdaProfesor.innerHTML = sListaBitacoras[i]['profesor'];

                let nHorasTotales = 0;
                for(let j=0; j < sListaBitacoras[i]['entradas'].length; j++){
                    nHorasTotales += Number(sListaBitacoras[i]['entradas'][j]['horas']);
                }
                celdaHoras.innerHTML = nHorasTotales;
                
                let dFecha = new Date(sListaBitacoras[i]['fechaCreacion']);
                let nMes = dFecha.getUTCMonth() + 1;
                let nDia = dFecha.getUTCDate();
                let nAnno = dFecha.getUTCFullYear();
                celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
                
                celdaEstado.innerHTML = sListaBitacoras[i]['estado'];

                let botonVerMas = document.createElement('a');
                    botonVerMas.classList.add('fas');
                    botonVerMas.classList.add('fa-info');
            
                    botonVerMas.dataset.id = sListaBitacoras[i]['_id'];
                    botonVerMas.addEventListener('click', mostrarModel);
            
                    celdaVerMas.appendChild(botonVerMas);
            }
        }
    }else{
        if(usuarioActivo['rol'] == 'profesor'){
            for(let i = 0; i < sListaBitacoras.length; i++){
                if( (sListaBitacoras[i]['profesor'] == sNombre) && (sListaBitacoras[i]['curso'].toLowerCase()).includes(pFiltro.toLowerCase()) ){
                    let fila = tbody.insertRow();
            
                    let celdaCurso = fila.insertCell();
                    let celdaAsistente = fila.insertCell();
                    let celdaProfesor = fila.insertCell();
                    let celdaHoras = fila.insertCell();
                    let celdaFechaCreacion = fila.insertCell();
                    let celdaEstado = fila.insertCell();
                    let celdaVerMas = fila.insertCell();
            
                    celdaCurso.innerHTML = sListaBitacoras[i]['curso'];
                    celdaAsistente.innerHTML = sListaBitacoras[i]['asistente'];
                    celdaProfesor.innerHTML = sListaBitacoras[i]['profesor'];

                    let nHorasTotales = 0;
                    for(let j=0; j < sListaBitacoras[i]['entradas'].length; j++){
                        nHorasTotales += Number(sListaBitacoras[i]['entradas'][j]['horas']);
                    }
                    celdaHoras.innerHTML = nHorasTotales;
                    
                    let dFecha = new Date(sListaBitacoras[i]['fechaCreacion']);
                    let nMes = dFecha.getUTCMonth() + 1;
                    let nDia = dFecha.getUTCDate();
                    let nAnno = dFecha.getUTCFullYear();
                    celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
                    
                    celdaEstado.innerHTML = sListaBitacoras[i]['estado'];

                    let botonVerMas = document.createElement('a');
                    botonVerMas.classList.add('fas');
                    botonVerMas.classList.add('fa-info');
            
                    botonVerMas.dataset.id = sListaBitacoras[i]['_id'];
                    botonVerMas.addEventListener('click', mostrarModel);
            
                    celdaVerMas.appendChild(botonVerMas);
                }
            }
        }else{
            for(let i = 0; i < sListaBitacoras.length; i++){
                if( (sListaBitacoras[i]['curso'].toLowerCase()).includes(pFiltro.toLowerCase()) || (sListaBitacoras[i]['asistente'].toLowerCase()).includes(pFiltro.toLowerCase()) ){
                    let fila = tbody.insertRow();
            
                    let celdaCurso = fila.insertCell();
                    let celdaAsistente = fila.insertCell();
                    let celdaProfesor = fila.insertCell();
                    let celdaHoras = fila.insertCell();
                    let celdaFechaCreacion = fila.insertCell();
                    let celdaEstado = fila.insertCell();
                    let celdaVerMas = fila.insertCell();
            
                    celdaCurso.innerHTML = sListaBitacoras[i]['curso'];
                    celdaAsistente.innerHTML = sListaBitacoras[i]['asistente'];
                    celdaProfesor.innerHTML = sListaBitacoras[i]['profesor'];
                    
                    let nHorasTotales = 0;
                    for(let j=0; j < sListaBitacoras[i]['entradas'].length; j++){
                        nHorasTotales += Number(sListaBitacoras[i]['entradas'][j]['horas']);
                    }
                    celdaHoras.innerHTML = nHorasTotales;
                    
                    let dFecha = new Date(sListaBitacoras[i]['fechaCreacion']);
                    let nMes = dFecha.getUTCMonth() + 1;
                    let nDia = dFecha.getUTCDate();
                    let nAnno = dFecha.getUTCFullYear();
                    celdaFechaCreacion.innerHTML = nDia + '/' + nMes + '/' + nAnno;
                    
                    celdaEstado.innerHTML = sListaBitacoras[i]['estado'];

                    let botonVerMas = document.createElement('a');
                    botonVerMas.classList.add('fas');
                    botonVerMas.classList.add('fa-info');
            
                    botonVerMas.dataset.id = sListaBitacoras[i]['_id'];
                    botonVerMas.addEventListener('click', mostrarModel);
            
                    celdaVerMas.appendChild(botonVerMas);
                }
            }
        }
    }
    if(sListaBitacoras.length == 0){
        document.getElementById('mensajeLista').classList.remove('listaVacia');
    }else{
        document.getElementById('mensajeLista').classList.add('listaVacia');
    }
};

function mostrarBitacoras(){
    sListaBitacoras = obtenerBitacoras();
    let usuarioActivo = verificarUsuario();
    let sNombre = usuarioActivo['primerNombre'];

    let selectBitacora = document.getElementById('txtBitacora');
    selectBitacora.innerHTML = '';

    let placeholder = document.createElement('option');
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.text = 'Seleccione una opción';
    placeholder.value = '';
    selectBitacora.add(placeholder);

    if(usuarioActivo['rol'] == 'asistente'){
        for(let i = 0; i < sListaBitacoras.length; i++){
            if( sListaBitacoras[i]['asistente'] == sNombre ){
                let sBitacora = sListaBitacoras[i]['curso'];
                let nuevaOpcion = document.createElement('option');
                nuevaOpcion.text = sBitacora;
                nuevaOpcion.value = sBitacora;
                selectBitacora.add(nuevaOpcion);
            }
        }
    }else{
        if(usuarioActivo['rol'] == 'profesor'){
            for(let i = 0; i < sListaBitacoras.length; i++){
                if( sListaBitacoras[i]['profesor'] == sNombre){
                    let sBitacora = sListaBitacoras[i]['curso'];
                    let nuevaOpcion = document.createElement('option');
                    nuevaOpcion.text = sBitacora;
                    nuevaOpcion.value = sBitacora;
                    selectBitacora.add(nuevaOpcion);
                }
            }
        }else{
            for(let i=0; i < sListaBitacoras.length; i++){
                let sBitacora = sListaBitacoras[i]['curso'];
                let nuevaOpcion = document.createElement('option');
                nuevaOpcion.text = sBitacora;
                nuevaOpcion.value = sBitacora;
                selectBitacora.add(nuevaOpcion);
            }
        }
    }
};

function nuevaEntrada(){
    let sId = '';
    let sActividad = selectActividad.value;
    let nHoras = inputHoras.value;
    let fFecha = inputFecha.value;
    let sDescripcion = inputDescripcion.value;

    for (let i=0; i < sListaBitacoras.length; i++){
        if(selectBitacora.value == sListaBitacoras[i]['curso']){
            sId = sListaBitacoras[i]['_id'];
        }
    }

    let bError = false;
    bError = validarEntrada();

    if(bError == true){
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la entrada, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    }else{
        let respuesta = agregarEntrada(sId, fFecha, sActividad, nHoras, sDescripcion);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
            sListaBitacoras = obtenerBitacoras();
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

function validarEntrada(){
    let bError = false;

    let sCurso = selectBitacora.value;
    let sActividad = selectActividad.value;
    let nHoras = Number(inputHoras.value);
    let fFecha = new Date(inputFecha.value);
    let sDescripcion = inputDescripcion.value;
    let dFechaActual = new Date();

    // Validación del select para curso
    if (sCurso == ''){
        selectBitacora.classList.add('errorInput');
        bError = true;
    }else{
        selectBitacora.classList.remove('errorInput');
    }

    // Validación del select para actividad
    if (sActividad == ''){
        selectActividad.classList.add('errorInput');
        bError = true;
    }else{
        selectActividad.classList.remove('errorInput');
    }

    // Validación del input de horas
    if (nHoras == 0 || nHoras < 0 || (regexHoras.test(nHoras) == false) ){
        inputHoras.classList.add('errorInput');
        bError = true;
    }else{
        inputHoras.classList.remove('errorInput');
    }

    // Validación del input para fecha
    if (inputFecha.value == '' || fFecha > dFechaActual ){
        inputFecha.classList.add('errorInput');
        bError = true;
    }else{
        inputFecha.classList.remove('errorInput');
    }

     // Validación del input para descripción
     if(regexDescripcion.test(sDescripcion) == false){
        inputDescripcion.classList.add('errorInput');
        bError = true;
    }else{
        inputDescripcion.classList.remove('errorInput');
    }
    return bError;
}

function modificarEntrada(){
    let sActividad = selectEditarActividad.value;
    let nHoras = inputEditarHoras.value;
    let fFecha = inputEditarFecha.value;
    let sDescripcion = inputEditarDescripcion.value;

    let sIdBitacora = inputIdBitacora.value;
    let sIdEntrada = inputIdEntrada.value;

    let respuesta = actualizarEntrada(sIdBitacora, sIdEntrada, fFecha, sActividad, nHoras, sDescripcion);
    if(respuesta.success == true){
        swal({
            title: 'Modificación correcta',
            text: respuesta.msg,
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        limpiarFormularioModificar();
        sListaBitacoras = obtenerBitacoras();
        mostrarBusqueda();
        document.getElementById("buscar").click();
    }else{
        swal({
            title: 'Modificación incorrecta',
            text: respuesta.msg,
            type: 'error',
            confirmButtonText: 'Entendido'
            });
    }
};

function cerrarModal(){
    document.getElementById('modal').classList.add('ocultar');
};

function mostrarModel(){
    document.getElementById('modal').classList.remove('ocultar');

    let id = this.dataset.id;
    let bitacora = obtenerBitacoraPorId(id);
    let bEstado = bitacora['estado'];

    document.querySelector('#infCurso').innerHTML = 'Bitácora: ' + bitacora['curso'];
    document.querySelector('#infAsistente').innerHTML = 'Asistente: ' + bitacora['asistente'];
    document.querySelector('#infProfesor').innerHTML = 'Profesor: ' + bitacora['profesor'];

    let nHorasTotales = 0;
    for(let i=0; i < bitacora['entradas'].length; i++){
        nHorasTotales += Number(bitacora['entradas'][i]['horas']);
    }
    document.querySelector('#infHoras').innerHTML = 'Horas totales: ' + nHorasTotales;

    document.querySelector('#infEstado').innerHTML = 'Estado: ' + bitacora['estado'];

    let tbody = document.querySelector('#tblEntradas tbody');
    tbody.innerHTML = '';
    for(let i = 0; i < bitacora['entradas'].length; i++){
        let fila = tbody.insertRow();

        let celdaActividad = fila.insertCell();
        let celdaHoras = fila.insertCell();
        let celdaDescripcion = fila.insertCell();
        let celdaFecha = fila.insertCell();

        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaActividad.innerHTML = bitacora['entradas'][i]['actividad'];
        celdaHoras.innerHTML = bitacora['entradas'][i]['horas'];
        celdaDescripcion.innerHTML = bitacora['entradas'][i]['descripcion'];

        let dFecha = new Date(bitacora['entradas'][i]['fecha']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFecha.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        let botonEditar = document.createElement('a');
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');

        botonEditar.dataset.idBitacora = bitacora['_id'];
        botonEditar.dataset.idEntrada = bitacora['entradas'][i]['_id'];
        botonEditar.addEventListener('click', editar);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');

        botonEliminar.dataset.idBitacora = bitacora['_id'];
        botonEliminar.dataset.idEntrada = bitacora['entradas'][i]['_id'];
        botonEliminar.addEventListener('click', eliminar);

        celdaEliminar.appendChild(botonEliminar);
    }
    if(bitacora['entradas'].length == 0){
        document.getElementById('bitacoraVacia').classList.remove('listaVacia');
    }else{
        document.getElementById('bitacoraVacia').classList.add('listaVacia');
    }

    let sRol = localStorage.getItem('rolUsuarioActivo');
    if(sRol == 'asistente'){
        btnAprobar.classList.add('invisible');
        btnAprobar.classList.remove('visible');
        btnRechazar.classList.add('invisible');
        btnRechazar.classList.remove('visible');
    }else{
        btnAprobar.dataset.id = id;
        btnRechazar.dataset.id = id;
        btnAprobar.classList.add('visible');
        btnAprobar.classList.remove('invisible');
        btnRechazar.classList.add('visible');
        btnRechazar.classList.remove('invisible');
    }
};

function eliminar(){
    let sIdBitacora = this.dataset.idBitacora;
    let sIdEntrada = this.dataset.idEntrada;

    swal({
        title: '¿Seguro que desea eliminar esta entrada de la bitácora?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.value) {
            eliminarEntrada(sIdBitacora, sIdEntrada);
            sListaBitacoras = obtenerBitacoras();
            mostrarBusqueda();
            cerrarModal();
          swal(
            'Eliminado!',
            'La entrada ha sido eliminada.',
            'success'
          )
        }
      })
};

function editar(){
    let sIdBitacora = this.dataset.idBitacora;
    let sIdEntrada = this.dataset.idEntrada;
    let nEntrada = 0;

    document.getElementById("modificar").click();
    let bitacora = obtenerBitacoraPorId(sIdBitacora);

    console.log(bitacora);

    inputEditarBitacora.value = bitacora['curso'];
    for(let i=0; i < sListaBitacoras.length; i++){
        for (let j=0; j < sListaBitacoras[i]['entradas'].length; j++){
            if(sIdEntrada == sListaBitacoras[i]['entradas'][j]['_id']){
                nEntrada = j;
            }
        }
    }
    selectEditarActividad.value = bitacora['entradas'][nEntrada]['actividad'];
    inputEditarDescripcion.value = bitacora['entradas'][nEntrada]['descripcion'];
    inputEditarHoras.value = bitacora['entradas'][nEntrada]['horas'];
    inputEditarFecha.valueAsDate = new Date(bitacora['entradas'][nEntrada]['fecha']);

    inputIdBitacora.value = bitacora['_id'];
    inputIdEntrada.value = bitacora['entradas'][nEntrada]['_id'];

    cerrarModal();
};

function aprobarBitacora(){
    let id = this.dataset.id;
    let sEstado = 'Aprobada';

    let respuesta = actualizarBitacora(id, sEstado);
    if(respuesta.success == true){
        swal({
            title: 'Aprobado!',
            text: respuesta.msg,
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        sListaBitacoras = obtenerBitacoras();
        mostrarBusqueda();
        cerrarModal();
    }else{
        swal({
            title: 'Aprobación fallida',
            text: respuesta.msg,
            type: 'error',
            confirmButtonText: 'Entendido'
            });
    }
};

function rechazarBitacora(){
    let id = this.dataset.id;
    let sEstado = 'Rechazada';

    let respuesta = actualizarBitacora(id, sEstado);
    if(respuesta.success == true){
        swal({
            title: 'Rechazada!',
            text: respuesta.msg,
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        sListaBitacoras = obtenerBitacoras();
        mostrarBusqueda();
        cerrarModal();
    }else{
        swal({
            title: 'Aprobación fallida',
            text: respuesta.msg,
            type: 'error',
            confirmButtonText: 'Entendido'
            });
    }
};