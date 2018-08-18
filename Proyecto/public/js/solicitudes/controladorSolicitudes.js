'use strict';

let sListaSolicitudes = obtenerSolicitudes();
let sListaSedes = obtenerSedes();
let sListaPeriodos = obtenerPeriodos();
let sListaGrupos = obtenerGrupos();
let sListaCursos = obtenerCursos();
const sRol = localStorage.getItem('rolUsuarioActivo');
const sProfe = localStorage.getItem('correoUsuarioActivo');
const inputId = document.querySelector('#txtId');

mostrarListaSolicitudes();
mostrarSedes();
mostrarPeriodos();
mostrarGrupos();
mostrarCursos();

let inputNombre = document.querySelector('#txtNombre');
let selectSedes = document.querySelector('#txtSedes');
let selectPeriodos = document.querySelector('#txtPeriodos');
let selectGrupos = document.querySelector('#txtGrupos');
let selectCursos = document.querySelector('#txtCursos');
const selectEstado = document.querySelector('#txtEstado');
let botonRegistrar = document.querySelector('#btnRegistrar');


const botonModificar = document.querySelector('#btnGuardar');
const inputFecha = document.querySelector('#txtFechaIngreso');

botonRegistrar.addEventListener('click', obtenerDatos);

let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;

function obtenerDatos() {
    let sede = selectSedes.value;
    let periodo = selectPeriodos.value;
    let grupo = selectGrupos.value;
    let curso = selectCursos.value;
    let sNombre = inputNombre.value;
    let estado = 'Sin enviar';
    let bError = false;
    bError = validar();
    if (bError == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar la solicitud, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = registrarSolicitud(sede, periodo, curso, grupo, sNombre, estado, sProfe);
        if (respuesta.success == true) {
            swal({
                title: 'Registro Correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
            mostrarListaSolicitudes();
            document.getElementById("buscar").click();
        } else {
            swal({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        }
    }
};

function enviar() {
    let id = this.dataset.id;
    let solicitud = obtenerSolicitudPorId(id);
    let sede = solicitud['sedes'];
    let periodo = solicitud['periodos'];
    let grupo = solicitud['grupos'];
    let curso = solicitud['cursos'];
    let sNombre = solicitud['nombre'];
    let profe = solicitud['profe'];

    switch (sRol) {
        case 'profesor':

        let estado = 'En proceso: Asist. Decanatura';
    
        let respuesta = actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe);
        if (respuesta.success == true) {
            swal({
                title: '¡Enviada!',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            listaSolicitudes = obtenerSolicitudes();
            location.reload();
        } else {
            swal({
                title: 'Envío incorrecto.',
                text: respuesta.msg,
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        }
    
            break;
        case 'asistDecanatura':
        let estado = 'En Proceso: Decanatura';
    
        let respuesta = actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe);
        if (respuesta.success == true) {
            swal({
                title: '¡Enviada!',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            listaSolicitudes = obtenerSolicitudes();
            location.reload();
        } else {
            swal({
                title: 'Envío incorrecto.',
                text: respuesta.msg,
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        }
            break;
    }

};
function validar() {
    let bError = false;

    let sede = selectSedes.value;
    let periodo = selectPeriodos.value;
    let grupo = selectGrupos.value;
    let curso = selectCursos.value;
    let sNombre = inputNombre.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true;
    } else {
        inputNombre.classList.remove('errorInput');
    }

    //validar cursos
    if (curso == '') {
        selectCursos.classList.add('errorInput');
        bError = true;
    } else {
        selectCursos.classList.remove('errorInput');
    }

    //validar periodo
    if (periodo == '') {
        selectPeriodos.classList.add('errorInput');
        bError = true;
    } else {
        selectPeriodos.classList.remove('errorInput');
    }

    //validar grupo
    if (grupo == '') {
        selectGrupos.classList.add('errorInput');
        bError = true;
    } else {
        selectGrupos.classList.remove('errorInput');
    }

    //validar sede
    if (sede == '') {
        selectSedes.classList.add('errorInput');
        bError = true;
    } else {
        selectSedes.classList.remove('errorinput');
    }

    return bError;
};

function mostrarSedes() {
    let selectSedes = document.getElementById('txtSedes');
    selectSedes.innerHTML = '';

    for (let i = 0; i < sListaSedes.length; i++) {
        let sSede = sListaSedes[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sSede;
        nuevaOpcion.value = sSede;
        selectSedes.add(nuevaOpcion);
    }
};

function mostrarPeriodos() {
    let selectPeriodos = document.getElementById('txtPeriodos');
    selectPeriodos.innerHTML = '';

    for (let i = 0; i < sListaPeriodos.length; i++) {
        let sPeriodo = sListaPeriodos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sPeriodo;
        nuevaOpcion.value = sPeriodo;
        selectPeriodos.add(nuevaOpcion);
    }
};


function mostrarGrupos() {
    let selectGrupos = document.getElementById('txtGrupos');
    let selectCursos = document.getElementById('txtCursos');
    selectGrupos.innerHTML = '';

    for (let i = 0; i < sListaGrupos.length; i++) {
        if (selectCursos == sListaGrupos[i]['cursos']) {
            let sGrupo = sListaGrupos[i]['numeroGrupo'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sGrupo;
            nuevaOpcion.value = sGrupo;
            selectGrupos.add(nuevaOpcion);
        }
    }
};

function mostrarCursos() {
    let selectCursos = document.getElementById('txtCursos');
    selectCursos.innerHTML = '';

    for (let i = 0; i < sListaCursos.length; i++) {
        let sCurso = sListaCursos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCurso;
        nuevaOpcion.value = sCurso;
        selectCursos.add(nuevaOpcion);
    }
};

function mostrarListaSolicitudes() {
    let listaSolicitudes = obtenerSolicitudes();

    switch (sRol) {
        case 'profesor':
            document.getElementById("listarSolicitudesDecanatura").remove();
            document.getElementById("listarSolicitudesAsistenteDecanatura").remove();
            document.getElementById("listarSolicitudesRectoria").remove();
            document.getElementById("listarSolicitudesAdministrador").remove();
            document.getElementById("editarAsistDecanatura").remove();
            document.getElementById("editarAdmin").remove();
            let tbodyProfe = document.querySelector('#tblSolicitudesProfe tbody');
            tbodyProfe.innerHTML = '';
            for (let i = 0; i < listaSolicitudes.length; i++) {
                let fila = tbodyProfe.insertRow();
                if (sUsuario == listaSolicitudes[i]['profe']) {
                    if (listaSolicitudes[i]['estado'] == 'Sin enviar') {
                        let celdaNombre = fila.insertCell();
                        let celdaCurso = fila.insertCell();
                        let celdaGrupo = fila.insertCell();
                        let celdaPeriodo = fila.insertCell();
                        let celdaSede = fila.insertCell();
                        let celdaEstado = fila.insertCell();
                        let celdaEditar = fila.insertCell();
                        let celdaEliminar = fila.insertCell();
                        let celdaEnviar = fila.insertCell();

                        celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
                        celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];
                        celdaGrupo.innerHTML = listaSolicitudes[i]['grupos'];
                        celdaPeriodo.innerHTML = listaSolicitudes[i]['periodos'];
                        celdaSede.innerHTML = listaSolicitudes[i]['sedes'];
                        celdaEstado.innerHTML = listaSolicitudes[i]['estado'];

                        let botonEditar = document.createElement('a');
                        botonEditar.classList.add('far');
                        botonEditar.classList.add('fa-edit');

                        botonEditar.dataset.id = listaSolicitudes[i]['_id'];
                        botonEditar.addEventListener('click', editar);

                        celdaEditar.appendChild(botonEditar);

                        let botonEliminar = document.createElement('a');
                        botonEliminar.classList.add('far');
                        botonEliminar.classList.add('fa-trash-alt');

                        botonEliminar.dataset.id = listaSolicitudes[i]['_id'];
                        botonEliminar.addEventListener('click', eliminar);

                        celdaEliminar.appendChild(botonEliminar);

                        let botonEnviar = document.createElement('a');
                        botonEnviar.classList.add('fas');
                        botonEnviar.classList.add('fa-check-square');

                        botonEnviar.dataset.id = listaSolicitudes[i]['_id'];
                        botonEnviar.addEventListener('click', enviar);

                        celdaEnviar.appendChild(botonEnviar);
                    } else {
                        if (listaSolicitudes[i]['estado'] == 'Aprobada') {

                        } else {
                            let celdaNombre = fila.insertCell();
                            let celdaCurso = fila.insertCell();
                            let celdaGrupo = fila.insertCell();
                            let celdaPeriodo = fila.insertCell();
                            let celdaSede = fila.insertCell();
                            let celdaEstado = fila.insertCell();
                            let celdaEditar = fila.insertCell();
                            let celdaEliminar = fila.insertCell();
                            let celdaEnviar = fila.insertCell();

                            celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
                            celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];
                            celdaGrupo.innerHTML = listaSolicitudes[i]['grupos'];
                            celdaPeriodo.innerHTML = listaSolicitudes[i]['periodos'];
                            celdaSede.innerHTML = listaSolicitudes[i]['sedes'];
                            celdaEstado.innerHTML = listaSolicitudes[i]['estado'];
                            celdaEditar.innerHTML = 'No disponible';
                            celdaEliminar.innerHTML = 'No disponible';
                            celdaEnviar.innerHTML = 'Enviada';

                        }
                    }
                }
            }
            break;
        case 'asistDecanatura':
            document.getElementById("listarSolicitudesAsistenteDecanatura").click();
            document.getElementById("listarSolicitudesDecanatura").remove();
            document.getElementById("listarSolicitudesRectoria").remove();
            document.getElementById("listarSolicitudesAdministrador").remove();
            document.getElementById("editarAdmin").remove();
            document.getElementById("registrar").remove();
            document.getElementById("buscar").remove();
            document.getElementById("editar").remove();
            let tbodyAsistente = document.querySelector('#tblSolicitudesAsistente tbody');
            tbodyAsistente.innerHTML = '';
            for (let i = 0; i < listaSolicitudes.length; i++) {
                let fila = tbodyAsistente.insertRow();
                if (listaSolicitudes[i]['estado'] == 'En proceso: Asist. Decanatura') {
                    let celdaNombre = fila.insertCell();
                    let celdaCurso = fila.insertCell();
                    let celdaGrupo = fila.insertCell();
                    let celdaProfe = fila.insertCell();
                    let celdaSede = fila.insertCell();
                    let celdaPeriodo = fila.insertCell();
                    let celdaEditar = fila.insertCell();
                    let celdaEliminar = fila.insertCell();
                    let celdaEnviar = fila.insertCell();

                    celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
                    celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];
                    celdaGrupo.innerHTML = listaSolicitudes[i]['grupos'];
                    celdaProfe.innerHTML = listaSolicitudes[i]['profe'];
                    celdaPeriodo.innerHTML = listaSolicitudes[i]['periodos'];
                    celdaSede.innerHTML = listaSolicitudes[i]['sedes'];

                    let botonEditar = document.createElement('a');
                    botonEditar.classList.add('far');
                    botonEditar.classList.add('fa-edit');

                    botonEditar.dataset.id = listaSolicitudes[i]['_id'];
                    botonEditar.addEventListener('click', editar);

                    celdaEditar.appendChild(botonEditar);

                    let botonEliminar = document.createElement('a');
                    botonEliminar.classList.add('far');
                    botonEliminar.classList.add('fa-trash-alt');

                    botonEliminar.dataset.id = listaSolicitudes[i]['_id'];
                    botonEliminar.addEventListener('click', eliminar);

                    celdaEliminar.appendChild(botonEliminar);

                    let botonEnviar = document.createElement('a');
                    botonEnviar.classList.add('far');
                    botonEnviar.classList.add('fa-paper-plane');

                    botonEnviar.dataset.id = listaSolicitudes[i]['_id'];
                    botonEnviar.addEventListener('click', enviar);

                    celdaEnviar.appendChild(botonEnviar);
                }
            }
            break;
        case 'decanatura':
            document.getElementById("listarSolicitudesAdministrador").remove();
            document.getElementById("listarSolicitudesRectoria").remove();
            document.getElementById("listarSolicitudesDecanatura").click();
            document.getElementById("listarSolicitudesAsistenteDecanatura").remove();
            document.getElementById("editarAsistDecanatura").remove();
            document.getElementById("editarAdmin").remove();
            document.getElementById("registrar").remove();
            document.getElementById("buscar").remove();
            document.getElementById("editar").remove();
            let tbodyDecanatura = document.querySelector('#tblSolicitudesDeca tbody');
            tbodyDecanatura.innerHTML = '';
            for (let i = 0; i < listaSolicitudes.length; i++) {
                let fila = tbodyDecanatura.insertRow();
                if (listaSolicitudes[i]['estado'] == 'En Proceso: Decanatura') {
                    let celdaNombre = fila.insertCell();
                    let celdaCurso = fila.insertCell();
                    let celdaGrupo = fila.insertCell();
                    let celdaProfe = fila.insertCell();
                    let celdaSede = fila.insertCell();
                    let celdaPeriodo = fila.insertCell();
                    let celdaRechazar = fila.insertCell();
                    let celdaAprobar = fila.insertCell();

                    celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
                    celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];
                    celdaGrupo.innerHTML = listaSolicitudes[i]['grupos'];
                    celdaProfe.innerHTML = listaSolicitudes[i]['profe'];
                    celdaPeriodo.innerHTML = listaSolicitudes[i]['periodos'];
                    celdaSede.innerHTML = listaSolicitudes[i]['sedes'];

                    let botonRechazar = document.createElement('a');
                    botonRechazar.classList.add('far');
                    botonRechazar.classList.add('fa-times-circle');

                    celdaRechazar.appendChild(botonRechazar);

                    botonRechazar.addEventListener('click', rechazar);

                    let botonAprobar = document.createElement('a');
                    botonAprobar.classList.add('far');
                    botonAprobar.classList.add('fa-check-circle');

                    celdaAprobar.appendChild(botonAprobar);

                    botonAprobar.addEventListener('click', aprobar);

                };
            };
            break;
        case 'rectoria':
            document.getElementById("listaSolicitudesRectoria").click();
            document.getElementById("listarSolicitudesAdministrador").remove();
            document.getElementById("listarSolicitudesDecanatura").remove();
            document.getElementById("listarSolicitudesAsistenteDecanatura").remove();
            document.getElementById("editarAsistDecanatura").remove();
            document.getElementById("editarAdmin").remove();
            document.getElementById("registrar").remove();
            document.getElementById("buscar").remove();
            document.getElementById("editar").remove();
            let tbodyRectoria = document.querySelector('#tblSolicitudesRec tbody');
            tbodyRectoria.innerHTML = '';
            for (let i = 0; i < listaSolicitudes.length; i++) {
                let fila = tbodyRectoria.insertRow();
                if (listaSolicitudes[i]['estado'] == 'En proceso: Rectoría') {
                    let celdaNombre = fila.insertCell();
                    let celdaCurso = fila.insertCell();
                    let celdaGrupo = fila.insertCell();
                    let celdaProfe = fila.insertCell();
                    let celdaSede = fila.insertCell();
                    let celdaPeriodo = fila.insertCell();
                    let celdaRechazar = fila.insertCell();
                    let celdaAprobar = fila.insertCell();

                    celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
                    celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];
                    celdaGrupo.innerHTML = listaSolicitudes[i]['grupos'];
                    celdaProfe.innerHTML = listaSolicitudes[i]['profe'];
                    celdaPeriodo.innerHTML = listaSolicitudes[i]['periodos'];
                    celdaSede.innerHTML = listaSolicitudes[i]['sedes'];

                    let botonRechazar = document.createElement('a');
                    botonRechazar.classList.add('far');
                    botonRechazar.classList.add('fa-times-circle');

                    celdaRechazar.appendChild(botonRechazar);

                    botonRechazar.addEventListener('click', rechazar);

                    let botonAprobar = document.createElement('a');
                    botonAprobar.classList.add('far');
                    botonAprobar.classList.add('fa-check-circle');

                    celdaAprobar.appendChild(botonAprobar);

                    botonAprobar.addEventListener('click', aprobar);
                };
            };
            break;
        case 'administrador':
            document.getElementById("listarSolicitudesRectoria").remove();
            document.getElementById("listarSolicitudesAdministrador").click();
            document.getElementById("listarSolicitudesDecanatura").remove();
            document.getElementById("listarSolicitudesAsistenteDecanatura").remove();
            document.getElementById("editarAsistDecanatura").remove();
            document.getElementById("registrar").remove();
            document.getElementById("buscar").remove();
            document.getElementById("editar").remove();
            let tbodyAdministrador = document.querySelector('#tblSolicitudesAdmin tbody');
            tbodyAdministrador.innerHTML = '';
            for (let i = 0; i < listaSolicitudes.length; i++) {
                let fila = tbodyAdministrador.insertRow();
                let celdaNombre = fila.insertCell();
                let celdaCurso = fila.insertCell();
                let celdaGrupo = fila.insertCell();
                let celdaProfe = fila.insertCell();
                let celdaSede = fila.insertCell();
                let celdaPeriodo = fila.insertCell();
                let celdaEstado = fila.insertCell();
                let celdaEditar = fila.insertCell();
                let celdaEliminar = fila.insertCell();


                celdaNombre.innerHTML = listaSolicitudes[i]['nombre'];
                celdaCurso.innerHTML = listaSolicitudes[i]['cursos'];
                celdaGrupo.innerHTML = listaSolicitudes[i]['grupos'];
                celdaProfe.innerHTML = listaSolicitudes[i]['profe'];
                celdaPeriodo.innerHTML = listaSolicitudes[i]['periodos'];
                celdaSede.innerHTML = listaSolicitudes[i]['sedes'];
                celdaEstado.innerHTML = listaSolicitudes[i]['estado'];


                let botonEditar = document.createElement('a');
                botonEditar.classList.add('far');
                botonEditar.classList.add('fa-edit');

                botonEditar.dataset.id = listaSolicitudes[i]['_id'];
                botonEditar.addEventListener('click', editar);

                celdaEditar.appendChild(botonEditar);

                let botonEliminar = document.createElement('a');
                botonEliminar.classList.add('far');
                botonEliminar.classList.add('fa-trash-alt');

                botonEliminar.dataset.id = listaSolicitudes[i]['_id'];
                botonEliminar.addEventListener('click', eliminar);

                celdaEliminar.appendChild(botonEliminar);

            };
            break;
    };
};
function limpiarFormulario() {
    inputNombre.value = '';
    selectSedes.value = '';
    selectPeriodos.value = '';
    selectGrupos.value = '';
    selectCursos.value = '';
};

function eliminar() {
    let id = this.dataset.id;

    swal({
        title: '¿Seguro que desea eliminar el solicitud?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.value) {
            eliminarSolicitud(id);
            listaSolicitudes = obtenerSolicitudes();
            mostrarListaSolicitudes();
            swal(
                'Eliminada!',
                'La solicitud ha sido eliminada.',
                'success'
            )
            location.reload;
        }
    })
};

function editar() {
    let id = this.dataset.id;

    document.getElementById("editar").click();
    let solicitud = obtenerSolicitudPorId(id);

    inputEditarCodigo.value = solicitud['codigo'];
    inputEditarNombre.value = solicitud['nombre'];
    inputEditarCupo.value = solicitud['cupo'];
    selectEditarSede.value = solicitud['sede'];
    chkEstado.checked = solicitud['estado'];
    inputId.value = solicitud['_id'];
};

function aprobar() {
    let id = this.dataset.id;

    let solicitud = obtenerSolicitudPorId(id);

    let sede = solicitud['sedes'];
    let periodo = solicitud['periodos'];
    let grupo = solicitud['grupos'];
    let curso = solicitud['cursos'];
    let sNombre = solicitud['nombre'];
    let profe = solicitud['profe'];
    let estado = 'Aprobada';

    let respuesta = actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe);
    if (respuesta.success == true) {
        swal({
            title: '¡Aprobada!',
            text: respuesta.msg,
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        listaSolicitudes = obtenerSolicitudes();
        location.reload();
        crearUsuario();
    } else {
        swal({
            title: 'Aprobación incorrecta.',
            text: respuesta.msg,
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
}

function rechazar() {
    let id = this.dataset.id;

    let solicitud = obtenerSolicitudPorId(id);

    let sede = solicitud['sedes'];
    let periodo = solicitud['periodos'];
    let grupo = solicitud['grupos'];
    let curso = solicitud['cursos'];
    let sNombre = solicitud['nombre'];
    let profe = solicitud['profe'];
    let estado = 'Rechazada';

    let respuesta = actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe);
    if (respuesta.success == true) {
        swal({
            title: 'Rechazada',
            text: respuesta.msg,
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        listaSolicitudes = obtenerSolicitudes();
        location.reload();
    } else {
        swal({
            title: 'Rechazo incorrecto.',
            text: respuesta.msg,
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
}

function validarAsistenteDecanatura() {
    let bError = false;

    let sede = selectSedes.value;
    let periodo = selectPeriodos.value;
    let grupo = selectGrupos.value;
    let curso = selectCursos.value;
    let sNombre = inputNombre.value;
    let dFecha = inputFecha.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true;
    } else {
        inputNombre.classList.remove('errorInput');
    }

    //validar cursos
    if (curso == '') {
        selectCursos.classList.add('errorInput');
        bError = true;
    } else {
        selectCursos.classList.remove('errorInput');
    }

    //validar periodo
    if (periodo == '') {
        selectPeriodos.classList.add('errorInput');
        bError = true;
    } else {
        selectPeriodos.classList.remove('errorInput');
    }

    //validar grupo
    if (grupo == '') {
        selectGrupos.classList.add('errorInput');
        bError = true;
    } else {
        selectGrupos.classList.remove('errorInput');
    }

    //validar sede
    if (sede == '') {
        selectSedes.classList.add('errorInput');
        bError = true;
    } else {
        selectSedes.classList.remove('errorinput');
    }

    //validar fecha de ingreso
    if (dFecha = '') {
        inputFecha.classList.add('errorInput');
        bError = true;
    } else {
        inputFecha.classList.add('errorInput');
    }

    return bError;
};

function validarAdmin() {
    let bError = false;

    let sede = selectSedes.value;
    let periodo = selectPeriodos.value;
    let grupo = selectGrupos.value;
    let curso = selectCursos.value;
    let sNombre = inputNombre.value;
    let dFecha = inputFecha.value;
    let sEstado = selectEstado.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputNombre.classList.add('errorInput');
        bError = true;
    } else {
        inputNombre.classList.remove('errorInput');
    }

    //validar cursos
    if (curso == '') {
        selectCursos.classList.add('errorInput');
        bError = true;
    } else {
        selectCursos.classList.remove('errorInput');
    }

    //validar periodo
    if (periodo == '') {
        selectPeriodos.classList.add('errorInput');
        bError = true;
    } else {
        selectPeriodos.classList.remove('errorInput');
    }

    //validar grupo
    if (grupo == '') {
        selectGrupos.classList.add('errorInput');
        bError = true;
    } else {
        selectGrupos.classList.remove('errorInput');
    }

    //validar sede
    if (sede == '') {
        selectSedes.classList.add('errorInput');
        bError = true;
    } else {
        selectSedes.classList.remove('errorinput');
    }

    //validar fecha de ingreso
    if (dFecha == '') {
        inputFecha.classList.add('errorInput');
        bError = true;
    } else {
        inputFecha.classList.remove('errorInput');
    }

    //validar estado de la solicitud
    if (sEstado == '') {
        selectEstado.classList.add('errorInput');
        bError = true;
    } else {
        selectEstado.classList.remove('errorInput');
    }

    return bError;
};

function crearUsuario() {

}