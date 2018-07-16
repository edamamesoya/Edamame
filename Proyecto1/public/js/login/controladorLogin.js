'use strict';
const inputUsuario = document.querySelector('#txtUsuario');
const inputContrasenna = document.querySelector('#txtContrasenna');
const botonIniciar = document.querySelector('#btnIniciarSesion');
const botonCancelar = document.querySelector('#btnCancelar');

botonIniciar.addEventListener('click', obtenerDatos);
botonCancelar.addEventListener('click', cancelar);

function obtenerDatos() {
    let sUsuario = inputUsuario.value;
    let sContrasenna = inputContrasenna.value;

    verificarCredenciales(sUsuario, sContrasenna);
}

function verificarCredenciales(psUsuario, psContrasenna) {
    let listaPersonas = obtenerUsuarios();
    let sRol = '';

    for (let i = 0; i < listaPersonas.length; i++) {
        if (psUsuario == listaPersonas[i]['correo']) {
            if (psContrasenna == listaPersonas[i]['contrasenna']) {

                sRol = listaPersonas[i]['rol'];

                localStorage.setItem('correoUsuarioActivo', listaPersonas[i]['correo']);
                localStorage.setItem('rolUsuarioActivo', sRol);

                swal({
                    title: 'Inicio Correcto',
                    text: 'Sesión iniciada correctamente.',
                    type: 'success'
                });
            } else {
                swal({
                    title: 'Inicio Fallido',
                    text: 'No se pudo iniciar sesión. La combinación de correo electrónico y cédula no coinciden.',
                    type: 'warning',
                    confirmButtonText: 'Entendido'
                });
            };
        } else {
            swal({
                title: 'Inicio Fallido',
                text: 'No se pudo iniciar sesión. La combinación de correo electrónico y cédula no coinciden.',
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        };
    };
    switch (sRol) {
        case 'administrador':
            window.location.href = 'usuarios.html';
            break;
        case 'asistente':
            window.location.href = 'periodos.html';
            break;
        case 'profesor':
            window.location.href = 'grupos.html';
            break;
        case 'rectoria':
            window.location.href = 'laboratorios.html';
            break;
        case 'decanatura':
            window.location.href = 'sedes.html';
            break;
        case 'asistDecanatura':
            window.location.href = 'carreras.html';
            break;
    }

    limpiarFormulario();
};

function limpiarFormulario() {
    inputUsuario.value = '';
    inputContrasenna.value = '';
};

function cancelar() {
    localStorage.removeItem('correoUsuarioActivo');
    localStorage.removeItem('rolUsuarioActivo');

    window.location.href = 'index.html';
}