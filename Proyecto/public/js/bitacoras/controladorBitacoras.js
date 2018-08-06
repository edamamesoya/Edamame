'use strict';

let sListaBitacoras = obtenerBitacoras();
let sListaUsuarios = obtenerUsuarios();
mostrarBusqueda();
mostrarBitacoras();

const selectBitacora = document.querySelector('#txtBitacora');
const selectActividad = document.querySelector('#txtActividad');
const inputHoras = document.querySelector('#txtHoras');
const inputFecha = document.querySelector('#txtFecha');
const btnRegistrar = document.querySelector('#btnRegistrar');

const btnCerrar = document.querySelector('#btnCerrar');

btnRegistrar.addEventListener('click', nuevaEntrada);
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
let regexCodigo = /^[a-zA-Z0-9\-]+$/;
let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;
let regexCreditos = /^[0-9]+$/;

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
    inputHoras.value = '';
    inputFecha.value = '';
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
    
            let celdaActividad = fila.insertCell();
            let celdaEstudiantes = fila.insertCell();
            let celdaHoras = fila.insertCell();
            let celdaFechaCreacion = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaEditar = fila.insertCell();
            let celdaEliminar = fila.insertCell();
    
            celdaActividad.innerHTML = sListaBitacoras[i]['curso'];
            celdaEstudiantes.innerHTML = sListaBitacoras[i]['asistente'];

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
            
            let bEstado = sListaBitacoras[i]['estado'];
            if(bEstado){
                celdaEstado.innerHTML = 'Aprobada';
            }else{
                celdaEstado.innerHTML = 'Sin aprobar';
            }
    
            let botonEditar = document.createElement('a');
            botonEditar.classList.add('far');
            botonEditar.classList.add('fa-edit');
    
            botonEditar.dataset.id = sListaBitacoras[i]['_id'];
            botonEditar.addEventListener('click', mostrarModel);
    
            celdaEditar.appendChild(botonEditar);
    
            let botonEliminar = document.createElement('a');
            botonEliminar.classList.add('far');
            botonEliminar.classList.add('fa-trash-alt');
    
            botonEliminar.dataset.id = sListaBitacoras[i]['_id'];
            // botonEliminar.addEventListener('click', eliminar);
    
            celdaEliminar.appendChild(botonEliminar);
            }
        }
    }else{
        if(usuarioActivo['rol'] == 'profesor'){
            for(let i = 0; i < sListaBitacoras.length; i++){
                if( (sListaBitacoras[i]['profesor'] == sNombre) && (sListaBitacoras[i]['curso'].toLowerCase()).includes(pFiltro.toLowerCase()) ){
                let fila = tbody.insertRow();
        
                let celdaActividad = fila.insertCell();
                let celdaEstudiantes = fila.insertCell();
                let celdaHoras = fila.insertCell();
                let celdaFechaCreacion = fila.insertCell();
                let celdaEstado = fila.insertCell();
                let celdaEditar = fila.insertCell();
                let celdaEliminar = fila.insertCell();
        
                celdaActividad.innerHTML = sListaBitacoras[i]['curso'];
                celdaEstudiantes.innerHTML = sListaBitacoras[i]['asistente'];

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
                
                let bEstado = sListaBitacoras[i]['estado'];
                if(bEstado){
                    celdaEstado.innerHTML = 'Aprobada';
                }else{
                    celdaEstado.innerHTML = 'Sin aprobar';
                }
        
                let botonEditar = document.createElement('a');
                botonEditar.classList.add('far');
                botonEditar.classList.add('fa-edit');
        
                botonEditar.dataset.id = sListaBitacoras[i]['_id'];
                botonEditar.addEventListener('click', mostrarModel);
        
                celdaEditar.appendChild(botonEditar);
        
                let botonEliminar = document.createElement('a');
                botonEliminar.classList.add('far');
                botonEliminar.classList.add('fa-trash-alt');
        
                botonEliminar.dataset.id = sListaBitacoras[i]['_id'];
                // botonEliminar.addEventListener('click', eliminar);
        
                celdaEliminar.appendChild(botonEliminar);
                }
            }
        }else{
            for(let i = 0; i < sListaBitacoras.length; i++){
                if( (sListaBitacoras[i]['curso'].toLowerCase()).includes(pFiltro.toLowerCase()) || (sListaBitacoras[i]['asistente'].toLowerCase()).includes(pFiltro.toLowerCase()) ){
                let fila = tbody.insertRow();
        
                let celdaActividad = fila.insertCell();
                let celdaEstudiantes = fila.insertCell();
                let celdaHoras = fila.insertCell();
                let celdaFechaCreacion = fila.insertCell();
                let celdaVerMas = fila.insertCell();
                let celdaEditar = fila.insertCell();
                let celdaEliminar = fila.insertCell();
        
                celdaActividad.innerHTML = sListaBitacoras[i]['curso'];
                celdaEstudiantes.innerHTML = sListaBitacoras[i]['asistente'];
                
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
                
                let botonVerMas = document.createElement('a');
                botonVerMas.classList.add('fas');
                botonVerMas.classList.add('fa-info');
        
                botonVerMas.dataset.id = sListaBitacoras[i]['_id'];
                botonVerMas.addEventListener('click', mostrarModel);
        
                celdaVerMas.appendChild(botonVerMas);
        
                let botonEditar = document.createElement('a');
                botonEditar.classList.add('far');
                botonEditar.classList.add('fa-edit');
        
                botonEditar.dataset.id = sListaBitacoras[i]['_id'];
                // botonEditar.addEventListener('click', mostrarModel);
        
                celdaEditar.appendChild(botonEditar);
        
                let botonEliminar = document.createElement('a');
                botonEliminar.classList.add('far');
                botonEliminar.classList.add('fa-trash-alt');
        
                botonEliminar.dataset.id = sListaBitacoras[i]['_id'];
                // botonEliminar.addEventListener('click', eliminar);
        
                celdaEliminar.appendChild(botonEliminar);
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
    let estudiantes = '';

    for (let i=0; i < sListaBitacoras.length; i++){
        if(selectBitacora.value == sListaBitacoras[i]['curso']){
            sId = sListaBitacoras[i]['_id'];
        }
    }

    let respuesta = agregarEntrada(sId, fFecha, sActividad, nHoras, estudiantes);
        if(respuesta.success == true){
            swal({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            document.getElementById("buscar").click();
            limpiarFormulario();
        }else{
            swal({
                title: 'Registro incorrecto',
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

    document.querySelector('#infCurso').innerHTML = bitacora['curso'];
    document.querySelector('#infAsistente').innerHTML = 'Asistente: ' + bitacora['asistente'];
    document.querySelector('#infProfesor').innerHTML = 'Profesor: ' + bitacora['profesor'];

    let nHorasTotales = 0;
    for(let i=0; i < bitacora['entradas'].length; i++){
        nHorasTotales += Number(bitacora['entradas'][i]['horas']);
    }
    document.querySelector('#infHoras').innerHTML = 'Horas totales: ' + nHorasTotales;

    if(bEstado){
        document.querySelector('#infEstado').innerHTML = 'Estado: Aprobada';
    }else{
        document.querySelector('#infEstado').innerHTML = 'Estado: Sin Aprobar';
    }

    let tbody = document.querySelector('#tblEntradas tbody');
    tbody.innerHTML = '';
    for(let i = 0; i < bitacora['entradas'].length; i++){
        let fila = tbody.insertRow();

        let celdaActividad = fila.insertCell();
        let celdaHoras = fila.insertCell();
        let celdaEstudiantes = fila.insertCell();
        let celdaFecha = fila.insertCell();

        // let celdaEstado = fila.insertCell();
        let celdaEditar = fila.insertCell();
        let celdaEliminar = fila.insertCell();

        celdaActividad.innerHTML = bitacora['entradas'][i]['actividad'];
        celdaHoras.innerHTML = bitacora['entradas'][i]['horas'];
        celdaEstudiantes.innerHTML = bitacora['entradas'][i]['estudiantes'];

        let dFecha = new Date(bitacora['entradas'][i]['fecha']);
        let nMes = dFecha.getUTCMonth() + 1;
        let nDia = dFecha.getUTCDate();
        let nAnno = dFecha.getUTCFullYear();
        celdaFecha.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        
        // let bEstado = sListaBitacoras[i]['estado'];
        // if(bEstado){
        //     celdaEstado.innerHTML = 'Aprobada';
        // }else{
        //     celdaEstado.innerHTML = 'Sin aprobar';
        // }

        let botonEditar = document.createElement('a');
        botonEditar.classList.add('far');
        botonEditar.classList.add('fa-edit');

        // botonEditar.dataset.id = sListaBitacoras[i]['_id'];
        // botonEditar.addEventListener('click', mostrarModel);

        celdaEditar.appendChild(botonEditar);

        let botonEliminar = document.createElement('a');
        botonEliminar.classList.add('far');
        botonEliminar.classList.add('fa-trash-alt');

        // botonEliminar.dataset.id = sListaBitacoras[i]['_id'];
        // botonEliminar.addEventListener('click', eliminar);

        celdaEliminar.appendChild(botonEliminar);
    }
};