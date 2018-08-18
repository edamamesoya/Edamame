'use strict';


let sListaSolicitudes = obtenerSolicitudes();
let sListaSedes = obtenerSedes();
let sListaPeriodos = obtenerPeriodos();
let sListaGrupos = obtenerGrupos();
let sListaCursos = obtenerCursos();
let listaUsuarios = obtenerUsuarios();

const sRol = localStorage.getItem('rolUsuarioActivo');
const sProfe = localStorage.getItem('correoUsuarioActivo');
const inputId = document.querySelector('#txtId');
const sProfeNombre = localStorage.getItem('nombreUsuarioActivo');

esconder();

mostrarListaSolicitudes();
mostrarSedes();
mostrarPeriodos();
mostrarGrupos();
mostrarCursos();
mostrarSedesEditar();
mostrarPeriodosEditar();
mostrarGruposEditar();
mostrarCursosEditar();
mostrarSedesAdmin();
mostrarPeriodosAdmin();
mostrarGruposAdmin();
mostrarCursosAdmin();

let inputNombre = document.querySelector('#txtNombre');
let selectSedes = document.querySelector('#txtSedes');
let selectPeriodos = document.querySelector('#txtPeriodos');
let selectGrupos = document.querySelector('#txtGrupos');
let selectCursos = document.querySelector('#txtCursos');
const selectEstado = document.querySelector('#txtEstado');
let botonRegistrar = document.querySelector('#btnRegistrar');
const selectEditarSedeAdmin = document.querySelector('#txtSedesAdmin');
const inputEditarNombreAdmin = document.querySelector('#txtNombreAdmin');
const selectEditarCursosAdmin = document.querySelector('#txtCursosAdmin');
const selectEditarGruposAdmin = document.querySelector('#txtGruposAdmin');
const selectEditarPeriodosAdmin = document.querySelector('#txtPeriodosAdmin');
const selectEstadoAdmin = document.querySelector('#txtEstado');
const chkAsistentePrevioAdmin = document.querySelector('#asistentePrevioAdmin');
const inputFechaAdmin = document.querySelector('#txtFechaIngresoAdmin');
const selectEditarSede = document.querySelector('#txtEditarSedes');
const selectEditarCurso = document.querySelector('#txtEditarCursos');
const selectEditarPeriodo = document.querySelector('#txtEditarPeriodos');
const inputEditarNombre = document.querySelector('#txtEditarNombre');
const selectEditarGrupo = document.querySelector('#txtEditarGrupos');
const selectEditarSedeAsistente = document.querySelector('#txtSedesAsistente');
const selectEditarCursoAsistente = document.querySelector('#txtCursosAsistente');
const selectEditarPeriodoAsistente = document.querySelector('#txtPeriodosAsistente');
const inputEditarNombreAsistente = document.querySelector('#txtNombreAsistente');
const selectEditarGrupoAsistente = document.querySelector('#txtGruposAsistente');
const chkAsistentePrevioAsistente = document.querySelector('#asistentePrevio');
const inputFechaAsistente = document.querySelector('#txtFechaIngresoAsistente');

selectCursos.addEventListener('change', mostrarGrupos);
selectEditarCurso.addEventListener('change', mostrarGruposEditar);
selectEditarCursosAdmin.addEventListener('change', mostrarGruposAdmin);


const botonModificar = document.querySelector('#btnGuardar');
const botonModificarAsistenteDecanatura = document.querySelector('#btnGuardarAsist');
const botonModificarAdmin = document.querySelector('#btnGuardarAdmin');

botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);
botonModificarAsistenteDecanatura.addEventListener('click', obtenerDatosAsistenteDecanatura);
botonModificarAdmin.addEventListener('click', obtenerDatosAdmin);

let regexNombre = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;

//registro por el profesor
function obtenerDatos() {
    let sede = selectSedes.value;
    let periodo = selectPeriodos.value;
    let grupo = selectGrupos.value;
    let curso = selectCursos.value;
    let sNombre = inputNombre.value;
    let asistentePrevio = true;
    let fecha = new Date();
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
        let respuesta = registrarSolicitud(sede, periodo, curso, grupo, sNombre, estado, sProfeNombre, asistentePrevio, fecha);
        if (respuesta.success == true) {
            swal({
                title: 'Registro Correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
            mostrarListaSolicitudes();
            location.reload();
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

//Modificacion por parte del profesor
function modificarDatos() {
    let sede = selectEditarSede.value;
    let periodo = selectEditarPeriodo.value;
    let grupo = selectEditarGrupo.value;
    let curso = selectEditarCurso.value;
    let sNombre = inputEditarNombre.value;
    let asistentePrevio = true;
    let fecha = new Date();
    let id = inputId.value;
    let estado = 'Sin enviar';
    let bError = false;
    bError = validarEditar();
    if (bError == true) {
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo modificar la solicitud, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, sProfeNombre, asistentePrevio, fecha);
        if (respuesta.success == true) {
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
            mostrarListaSolicitudes();
            document.getElementById("buscar").click();
        } else {
            swal({
                title: 'Modificación incorrecta',
                text: respuesta.msg,
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        }
    }
};
//modificacion por el asistente de decanatura
function obtenerDatosAsistenteDecanatura() {
    let sede = selectEditarSedeAsistente.value;
    let periodo = selectEditarPeriodoAsistente.value;
    let grupo = selectEditarGrupoAsistente.value;
    let curso = selectEditarCursoAsistente.value;
    let sNombre = inputEditarNombreAsistente.value;
    let fecha = inputFechaAsistente.value;
    let asistentePrevio = chkAsistentePrevioAsistente.value;
    let estado = 'En proceso: Asist. Decanatura';
    let bError = false;
    let id = inputId.value;
    bError = validarAsistenteDecanatura();
    if (bError == true) {
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo registrar la solicitud, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, sProfeNombre, asistentePrevio, fecha);
        if (respuesta.success == true) {
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
            mostrarListaSolicitudes();
            document.getElementById("buscar").click();
        } else {
            swal({
                title: 'Modificación incorrecta',
                text: respuesta.msg,
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        }
    }
};

//modificacion por el asistente de decanatura
function obtenerDatosAdmin() {
    let sede = selectEditarSedeAdmin.value;
    let periodo = selectEditarPeriodosAdmin.value;
    let grupo = selectEditarGruposAdmin.value;
    let curso = selectEditarCursosAdmin.value;
    let sNombre = inputEditarNombreAdmin.value;
    let fecha = inputFechaAdmin.value;
    let asistentePrevio = chkAsistentePrevioAdmin.value;
    let estado = selectEstadoAdmin.value;
    let id = inputId.value;
    let bError = false;
    bError = validarAdmin();
    if (bError == true) {
        swal({
            title: 'Modificación incorrecta',
            text: 'No se pudo registrar la solicitud, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        let respuesta = actualizarSolicitud(id, sede, periodo, curso, grupo, sNombre, estado, sProfeNombre, asistentePrevio, fecha);
        if (respuesta.success == true) {
            swal({
                title: 'Modificación correcta',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
            limpiarFormulario();
            mostrarListaSolicitudes();
            document.getElementById("buscar").click();
        } else {
            swal({
                title: 'Modificación incorrecta',
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
                    mostrarListaSolicitudes();
                    swal(
                        'Enviada!',
                        'La solicitud ha sido enviada.',
                        'success'
                    )
                    document.getElementById('buscar').click();
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
                        swal({
                            title: 'Enviada!',
                            text: 'La solicitud ha sido enviada.',
                            type: 'success'
                        })
                        document.getElementById('listarSolicitudesAsistenteDecanatura');
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
                        swal({
                            title: 'Enviada!',
                            text: 'La solicitud ha sido enviada.',
                            type: 'success'
                        })
                        document.getElementById('listarSolicitudesAsistenteDecanatura');
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

//validación de modificar
function validarEditar() {
    let bError = false;

    let sede = selectEditarSede.value;
    let periodo = selectEditarPeriodo.value;
    let grupo = selectEditarGrupo.value;
    let curso = selectEditarCurso.value;
    let sNombre = inputEditarNombre.value;

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
//mostrar opciones
function mostrarSedes() {
    let selectSedes = document.getElementById('txtSedes');

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

    for (let i = 0; i < sListaGrupos.length; i++) {
        if (selectCursos.value == sListaGrupos[i]['curso']) {
            let sGrupo = sListaGrupos[i]['numero'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sGrupo;
            nuevaOpcion.value = sGrupo;
            selectGrupos.add(nuevaOpcion);

        }
    }
};

function mostrarCursos() {
    let selectCursos = document.getElementById('txtCursos');

    for (let i = 0; i < sListaCursos.length; i++) {
        let sCurso = sListaCursos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCurso;
        nuevaOpcion.value = sCurso;
        selectCursos.add(nuevaOpcion);
    }
};

//mostrar opciones asistente decanatura

//mostrar opciones editar
function mostrarSedesEditar() {
    let selectSedes = document.getElementById('txtEditarSedes');

    for (let i = 0; i < sListaSedes.length; i++) {
        let sSede = sListaSedes[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sSede;
        nuevaOpcion.value = sSede;
        selectSedes.add(nuevaOpcion);
    }
};

function mostrarPeriodosEditar() {
    let selectPeriodos = document.getElementById('txtEditarPeriodos');

    for (let i = 0; i < sListaPeriodos.length; i++) {
        let sPeriodo = sListaPeriodos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sPeriodo;
        nuevaOpcion.value = sPeriodo;
        selectPeriodos.add(nuevaOpcion);
    }
};


function mostrarGruposEditar() {
    let selectGrupos = document.getElementById('txtEditarGrupos');
    let selectCursos = document.getElementById('txtEditarCursos');

    for (let i = 0; i < sListaGrupos.length; i++) {
        if (selectCursos.value == sListaGrupos[i]['curso']) {
            let sGrupo = sListaGrupos[i]['numero'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sGrupo;
            nuevaOpcion.value = sGrupo;
            selectGrupos.add(nuevaOpcion);

        }
    }
};

function mostrarCursosEditar() {
    let selectCursos = document.getElementById('txtEditarCursos');

    for (let i = 0; i < sListaCursos.length; i++) {
        let sCurso = sListaCursos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sCurso;
        nuevaOpcion.value = sCurso;
        selectCursos.add(nuevaOpcion);
    }
};


//Mostrar opciones admin
function mostrarSedesAdmin() {
    let selectSedes = document.getElementById('txtSedesAdmin');

    for (let i = 0; i < sListaSedes.length; i++) {
        let sSede = sListaSedes[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sSede;
        nuevaOpcion.value = sSede;
        selectSedes.add(nuevaOpcion);
    }
};

function mostrarPeriodosAdmin() {
    let selectPeriodos = document.getElementById('txtPeriodosAdmin');

    for (let i = 0; i < sListaPeriodos.length; i++) {
        let sPeriodo = sListaPeriodos[i]['nombre'];
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.text = sPeriodo;
        nuevaOpcion.value = sPeriodo;
        selectPeriodos.add(nuevaOpcion);
    }
};


function mostrarGruposAdmin() {
    let selectGrupos = document.getElementById('txtGruposAdmin');
    let selectCursos = document.getElementById('txtCursosAdmin');

    for (let i = 0; i < sListaGrupos.length; i++) {
        if (selectCursos.value == sListaGrupos[i]['curso']) {
            let sGrupo = sListaGrupos[i]['numero'];
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.text = sGrupo;
            nuevaOpcion.value = sGrupo;
            selectGrupos.add(nuevaOpcion);

        }
    }
};

function mostrarCursosAdmin() {
    let selectCursos = document.getElementById('txtCursosAdmin');

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

            let tbodyProfe = document.querySelector('#tblSolicitudesProfe tbody');
            tbodyProfe.innerHTML = '';
            for (let i = 0; i < listaSolicitudes.length; i++) {
                let fila = tbodyProfe.insertRow();
                if (sProfeNombre == listaSolicitudes[i]['profe']) {
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
            break;
        case 'asistDecanatura':

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
                    botonEditar.addEventListener('click', editarAsistenteDecanatura);

                    celdaEditar.appendChild(botonEditar);

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
                    botonRechazar.dataset.id = listaSolicitudes[i]['_id'];

                    celdaRechazar.appendChild(botonRechazar);

                    botonRechazar.addEventListener('click', rechazar);

                    let botonAprobar = document.createElement('a');
                    botonAprobar.classList.add('far');
                    botonAprobar.classList.add('fa-check-circle');
                    botonAprobar.dataset.id = listaSolicitudes[i]['_id'];

                    celdaAprobar.appendChild(botonAprobar);

                    botonAprobar.addEventListener('click', aprobar);

                };
            };
            break;
        case 'rectoria':

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
                    botonRechazar.dataset.id = listaSolicitudes[i]['_id'];

                    botonRechazar.addEventListener('click', rechazar);

                    let botonAprobar = document.createElement('a');
                    botonAprobar.classList.add('far');
                    botonAprobar.classList.add('fa-check-circle');

                    celdaAprobar.appendChild(botonAprobar);
                    botonAprobar.dataset.id = listaSolicitudes[i]['_id'];
                    botonAprobar.addEventListener('click', aprobar);
                };
            };
            break;
        case 'administrador':

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
                botonEditar.addEventListener('click', editarAdministrador);

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
    document.getElementById('editar').click();


    inputEditarNombre.value = solicitud['nombre'];
    selectEditarSede.value = solicitud['sedes'];
    selectEditarCurso.value = solicitud['cursos'];
    selectEditarGrupo.value = solicitud['grupos'];
    selectEditarPeriodo.value = solicitud['periodos'];
    inputId.value = solicitud['_id'];
};

function editarAsistenteDecanatura() {

    let id = this.dataset.id;
    let solicitud = obtenerSolicitudPorId(id);
    document.getElementById('editarAsistDecanatura').click();

    selectEditarCursoAsistente.innerHTML = solicitud['cursos'];
    inputEditarNombreAsistente.innerHTML = solicitud['nombre']
    selectEditarSedeAsistente.innerHTML = solicitud['sedes'];
    selectEditarGrupoAsistente.innerHTML = solicitud['grupos'];
    selectEditarPeriodoAsistente.innerHTML = solicitud['periodos'];
    chkAsistentePrevioAsistente.value = solicitud['asistentePrevio'];
    inputFechaAsistente.value = solicitud['fecha'];
    inputId.value = solicitud['_id'];
};

function editarAdministrador() {
    let id = this.dataset.id;
    let solicitud = obtenerSolicitudPorId(id);
    document.getElementById('editarAdmin').click();


    selectEditarCursosAdmin.value = solicitud['cursos'];
    selectEstadoAdmin.value = solicitud['estado'];
    chkAsistentePrevioAdmin.value = solicitud['asistentePrevio'];
    inputFechaAdmin.value = solicitud['fecha'];
    selectEditarSedeAdmin.value = solicitud['sedes'];
    selectEditarGruposAdmin.value = solicitud['grupos'];
    inputEditarNombreAdmin.value = solicitud['nombre'];
    selectEditarPeriodosAdmin.value = solicitud['periodos'];
    inputId.value = solicitud['_id']

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
    let asistentePrevio = solicitud['asistentePrevio'];
    let fecha = solicitud['fecha'];

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
    let asistentePrevio = solicitud['asistentePrevio'];
    let fecha = solicitud['fecha'];

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

    let sede = selectEditarSedeAsistente.value;
    let periodo = selectEditarPeriodoAsistente.value;
    let grupo = selectEditarGrupoAsistente.value;
    let curso = selectEditarCursoAsistente.value;
    let sNombre = inputEditarNombreAsistente.value;
    let dFecha = inputFechaAsistente.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputEditarNombreAsistente.classList.add('errorInput');
        bError = true;
    } else {
        inputEditarNombreAsistente.classList.remove('errorInput');
    }

    //validar cursos
    if (curso == '') {
        selectEditarCursoAsistente.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarCursoAsistente.classList.remove('errorInput');
    }

    //validar periodo
    if (periodo == '') {
        selectEditarPeriodoAsistente.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarPeriodoAsistente.classList.remove('errorInput');
    }

    //validar grupo
    if (grupo == '') {
        selectEditarGrupoAsistente.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarGrupoAsistente.classList.remove('errorInput');
    }

    //validar sede
    if (sede == '') {
        selectEditarSedeAsistente.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarSedeAsistente.classList.remove('errorinput');
    }

    //validar fecha de ingreso
    if (dFecha == '') {
        inputFechaAsistente.classList.add('errorInput');
        bError = true;
    } else {
        inputFechaAsistente.classList.add('errorInput');
    }

    return bError;
};

function validarAdmin() {
    let bError = false;

    let sede = selectEditarSedeAdmin.value;
    let periodo = selectEditarPeriodosAdmin.value;
    let grupo = selectEditarGruposAdmin.value;
    let curso = selectEditarCursosAdmin.value;
    let sNombre = inputEditarNombreAdmin.value;
    let dFecha = inputFechaAdmin.value;
    let sEstado = selectEstadoAdmin.value;

    //validar nombre
    if (sNombre == '' || (regexNombre.test(sNombre) == false)) {
        inputEditarNombreAdmin.classList.add('errorInput');
        bError = true;
    } else {
        inputEditarNombreAdmin.classList.remove('errorInput');
    }

    //validar cursos
    if (curso == '') {
        selectEditarCursosAdmin.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarCursosAdmin.classList.remove('errorInput');
    }

    //validar periodo
    if (periodo == '') {
        selectEditarPeriodosAdmin.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarPeriodosAdmin.classList.remove('errorInput');
    }

    //validar grupo
    if (grupo == '') {
        selectEditarGruposAdmin.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarGruposAdmin.classList.remove('errorInput');
    }

    //validar sede
    if (sede == '') {
        selectEditarSedeAdmin.classList.add('errorInput');
        bError = true;
    } else {
        selectEditarSedeAdmin.classList.remove('errorinput');
    }

    //validar fecha de ingreso
    if (dFecha == '') {
        inputFechaAdmin.classList.add('errorInput');
        bError = true;
    } else {
        inputFechaAdmin.classList.remove('errorInput');
    }

    //validar estado de la solicitud
    if (sEstado == '') {
        selectEstadoAdmin.classList.add('errorInput');
        bError = true;
    } else {
        selectEstadoAdmin.classList.remove('errorInput');
    }

    return bError;
};

function esconder() {
    switch (sRol) {
        case 'profesor':
            document.getElementById('listarSolicitudesDecanatura').remove();
            document.getElementById("listarSolicitudesAsistenteDecanatura").remove();
            document.getElementById("listarSolicitudesRectoria").remove();
            document.getElementById("listarSolicitudesAdministrador").remove();
            document.getElementById("editarAsistDecanatura").remove();
            document.getElementById("editarAdmin").remove();
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
            break;
    }
}