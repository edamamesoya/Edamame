'use strict';
let sUsuario = localStorage.getItem('correoUsuarioActivo');

autoLogin(sUsuario);
const inputUsuario = document.querySelector('#txtUsuario');
const inputContrasenna = document.querySelector('#txtContrasenna');
const botonIniciar = document.querySelector('#btnIniciarSesion');
const botonCancelar = document.querySelector('#btnCancelar');
const ojito = document.querySelector('#btnOjito');

botonIniciar.addEventListener('click', obtenerDatos);
botonCancelar.addEventListener('click', cancelar);
ojito.addEventListener('click', mostrarContrasenna);

function obtenerDatos() {
    let sUsuario = inputUsuario.value;
    let sContrasenna = inputContrasenna.value;

    verificarCredenciales(sUsuario, sContrasenna);
}

function verificarCredenciales(psUsuario, psContrasenna) {
    let listaPersonas = obtenerUsuarios();
    let sRol = '';
    let bError = true;

    for (let i = 0; i < listaPersonas.length; i++) {
        if (psUsuario == listaPersonas[i]['correo'] || localStorage.getItem('correoUsuarioActivo') == listaPersonas[i]['correo']) {
            if (psContrasenna == listaPersonas[i]['contrasenna'] || localStorage.getItem('correoUsuarioActivo') == listaPersonas[i]['correo']) {
                sRol = listaPersonas[i]['rol'];

                bError = false;
                localStorage.setItem('correoUsuarioActivo', listaPersonas[i]['correo']);
                localStorage.setItem('rolUsuarioActivo', sRol);
                localStorage.setItem('nombreUsuarioActivo', (listaPersonas[i]['primerNombre'] + ' ' + listaPersonas[i]['primerApellido'] + ' ' + listaPersonas[i]['segundoApellido']));
            }
        }
    };

    if (bError) {
        swal({
            title: 'Inicio Fallido',
            text: 'No se pudo iniciar sesión. La combinación de correo electrónico y contraseña no coinciden.',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Inicio Correcto',
            text: 'Sesión iniciada correctamente.',
            type: 'success'
        });
    }

    switch (sRol) {
        case 'administrador':
            window.location.href = 'solicitudes.html';
            break;
        case 'asistente':
            window.location.href = 'bitacoras.html';
            break;
        case 'profesor':
            window.location.href = 'solicitudes.html';
            break;
        case 'rectoria':
            window.location.href = 'solicitudes.html';
            break;
        case 'decanatura':
            window.location.href = 'solicitudes.html';
            break;
        case 'asistDecanatura':
            window.location.href = 'solicitudes.html';
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

    window.location.href = 'landingpageApp.html';
}

function autoLogin(psUsuario) {
    let listaPersonas = obtenerUsuarios();
    let sRol = '';

    for (let i = 0; i < listaPersonas.length; i++) {
        if (psUsuario == listaPersonas[i]['correo']) {

            sRol = listaPersonas[i]['rol'];

            localStorage.setItem('correoUsuarioActivo', listaPersonas[i]['correo']);
            localStorage.setItem('rolUsuarioActivo', sRol);

            swal({
                title: 'Usuario Reconocido',
                text: 'Bienvenid@ de vuelta!',
                type: 'success'
            });

        } else {

        };
    };
    switch (sRol) {
        case 'administrador':
            window.location.href = 'solicitudes.html';
            break;
        case 'asistente':
            window.location.href = 'bitacoras.html';
            break;
        case 'profesor':
            window.location.href = 'solicitudes.html';
            break;
        case 'rectoria':
            window.location.href = 'solicitudes.html';
            break;
        case 'decanatura':
            window.location.href = 'solicitudes.html';
            break;
        case 'asistDecanatura':
            window.location.href = 'solicitudes.html';
            break;
    }
};

function mostrarContrasenna() {
    let inputContrasenna = document.querySelector('#txtContrasenna');
    if (inputContrasenna.type == 'password') {
        inputContrasenna.type = 'text';
        ojito.classList.remove('fa-eye');
        ojito.classList.add('fa-eye-slash');
    } else {
        inputContrasenna.type = 'password';
        ojito.classList.add('fa-eye');
        ojito.classList.remove('fa-eye-slash');
    }
}