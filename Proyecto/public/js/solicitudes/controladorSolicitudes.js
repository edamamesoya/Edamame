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

botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', obtenerDatosAsistenteDecanatura);

let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;

//registro por el profesor
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

//modificacion por el asistente de decanatura
function obtenerDatosAsistenteDecanatura() {
    let sede = selectEditarSedes.value;
    let periodo = selectEditarPeriodos.value;
    let grupo = selectEditarGrupos.value;
    let curso = selectEditarCursos.value;
    let sNombre = inputEditarNombre.value;
    let fecha = inputFecha.value;
    let asistentePrevio = chkAsistentePrevio.value;
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
        let respuesta = actualizarSolicitud(sede, periodo, curso, grupo, sNombre, estado, sProfe, asistentePrevio, fecha);
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
    let fecha = solicitud['fecha'];
    let asistentePrevio = solicitud['asistentePrevio'];

    switch (sRol) {
        case 'profesor':

            let estado = 'En proceso: Asist. Decanatura';

            swal({
                title: '¿Seguro que desea enviar la solicitud?',
                text: "Esta acción no se puede revertir",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Enviar'
            }).then((result) => {
                if (result.value) {
                    actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe, asistentePrevio, fecha);
                    listaSolicitudes = obtenerSolicitudes();
                    mostrarListaSolicitudes();
                    swal(
                        'Enviada!',
                        'La solicitud ha sido enviada.',
                        'success'
                    )
                    location.reload();
                }
            })


            break;
        case 'asistDecanatura':
            if (solicitud['asistentePrevio'] == true) {
                let estado = 'En proceso: Rectoría';

                swal({
                    title: '¿Seguro que desea enviar la solicitud?',
                    text: "Esta acción no se puede revertir",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Enviar'
                }).then((result) => {
                    if (result.value) {
                        actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe, asistentePrevio, fecha);
                        mostrarListaSolicitudes();
                        swal(
                            'Enviada!',
                            'La solicitud ha sido enviada.',
                            'success'
                        )
                        location.reload();
                    }
                })
            } else {
                let estado = 'En proceso: Decanatura';

                swal({
                    title: '¿Seguro que desea enviar la solicitud?',
                    text: "Esta acción no se puede revertir",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Enviar'
                }).then((result) => {
                    if (result.value) {
                        actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe, asistentePrevio, fecha);
                        mostrarListaSolicitudes();
                        swal(
                            'Enviada!',
                            'La solicitud ha sido enviada.',
                            'success'
                        )
                        location.reload();
                    }
                })
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
                if (listaSolicitudes[i]['estado'] == 'En proceso: Decanatura') {
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
        title: '¿Seguro que desea eliminar la solicitud?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.value) {
            eliminarSolicitud(id);
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
    let solicitud = obtenerSolicitudPorId(id);

    switch (sRol) {
        case 'profesor':

            selectEditarSede = document.querySelector('#txtEditarSedes');
            selectEditarCurso = document.querySelector('#txtEditarCursos');
            selectEditarPeriodo = document.querySelector('#txtEditarPeriodos');
            inputEditarNombre = document.querySelector('#txtEditarNombre');
            selectEditarGrupo = document.querySelector('#txtEditarGrupos');

            document.getElementById("editar").click();

            inputEditarNombre.value = solicitud['nombre'];
            selectEditarSede.value = solicitud['sedes'];
            selectEditarCurso.value = solicitud['cursos'];
            selectEditarGrupo.value = solicitud['grupos'];
            selectEditarPeriodo.value = solicitud['periodos'];
            inputId.value = solicitud['_id'];

            break;

        case 'asistDecanatura':

            selectEditarSede = document.querySelector('#txtSedesAsistente');
            selectEditarCurso = document.querySelector('#txtCursosAsistente');
            selectEditarPeriodo = document.querySelector('#txtPeriodosAsistente');
            inputEditarNombre = document.querySelector('#txtNombreAsistente');
            selectEditarGrupo = document.querySelector('#txtGruposAsistente');
            chkAsistentePrevio = document.querySelector('#asistentePrevio');
            inputFecha = document.querySelector('#txtFechaIngreso');

            document.getElementById("editarAsistDecanatura").click;

            selectEditarCurso.innerHTML = solicitud['cursos'];
            inputEditarNombre.innerHTML = solicitud['nombre']
            selectEditarSede.innerHTML = solicitud['sedes'];
            selectEditarGrupo.innerHTML = solicitud['grupos'];
            selectEditarPeriodo.innerHTML = solicitud['periodos'];
            chkAsistentePrevio.value = solicitud['asistentePrevio'];
            inputFecha.value = solicitud['fecha'];
            inputId.value = solicitud['_id'];

            break;
        case 'administrador':

            let selectEditarSede = document.querySelector('#txtSedesAdmin');
            let inputEditarNombre = document.querySelector('#txtNombreAdmin');
            let selectEditarCurso = document.querySelector('#txtCursosAdmin');
            let selectEditarGrupo = document.querySelector('#txtGruposAdmin');
            let selectEditarPeriodo = document.querySelector('#txtPeriodosAdmin');
            let selectEstado = document.querySelector('#txtEstado');
            let chkAsistentePrevio = document.querySelector('#asistentePrevioAdmin');
            let inputFecha = document.querySelector('#txtFechaIngreso');

            document.getElementById("editarAdmin").click;

            selectEditarCurso.value = solicitud['cursos'];
            selectEstado.value = solicitud['estado'];
            chkAsistentePrevio.value = solicitud['asistentePrevio'];
            inputFecha.value = solicitud['fecha'];
            selectEditarSede.value = solicitud['sedes'];
            selectEditarGrupo.value = solicitud['grupos'];
            inputEditarNombre.value = solicitud['nombre'];
            selectEditarPeriodo.value = solicitud['periodos'];
    }
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

    swal({
        title: '¿Seguro que desea aprobar la solicitud?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aprobar'
    }).then((result) => {
        if (result.value) {
            actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe, asistentePrevio, fecha);
            listaSolicitudes = obtenerSolicitudes();
            mostrarListaSolicitudes();
            swal(
                'Aprobada!',
                'La solicitud ha sido aprobada.',
                'success'
            )
            location.reload();
        }
    })
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

    swal({
        title: '¿Seguro que desea rechazar la solicitud?',
        text: "Esta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Rechazar'
    }).then((result) => {
        if (result.value) {
            actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, profe, asistentePrevio, fecha);
            listaSolicitudes = obtenerSolicitudes();
            mostrarListaSolicitudes();
            swal(
                'Rechazada!',
                'La solicitud ha sido rechazada.',
                'success'
            )
            location.reload();
        }
    })
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