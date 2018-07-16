'use strict';

let sUsuario = localStorage.getItem('correoUsuarioActivo');

autoLogin(sUsuario);

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
    let bError = true;

    for (let i = 0; i < listaPersonas.length; i++) {
        if (psUsuario == listaPersonas[i]['correo'] && psContrasenna == listaPersonas[i]['contrasenna']) {

            sRol = listaPersonas[i]['rol'];
            localStorage.setItem('correoUsuarioActivo', listaPersonas[i]['correo']);
            localStorage.setItem('rolUsuarioActivo', sRol);    

            bError = false;


        } else {

            bError = true;

        };
    };

    if (bError) {
        swal({
            title: 'Inicio Fallido',
            text: 'No se pudo iniciar sesión. La combinación de correo electrónico y cédula no coinciden.',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {


        swal({
            title: 'Inicio Correcto',
            text: 'Sesión iniciada correctamente.',
            type: 'success'
        });

        window.location.href = "perfil.html"
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

            window.location.href = "perfil.html"
        }
    };
};
