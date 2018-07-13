'use strict';
const inputUsuario = document.querySelector('#txtUsuario');
const inputCedula = document.querySelector('#txtCedula');
const botonIniciar = document.querySelector('#btnIniciarSesion');

botonIniciar.addEventListener('click', obtenerDatos);

function obtenerDatos() {
    let sUsuario = inputUsuario.value;
    let sCedula = inputCedula.value;

    verificarCredenciales(sUsuario, sCedula);
}

function verificarCredenciales(psUsuario, psCedula) {
    let listaPersonas = obtenerUsuarios();
    let sRol = '';

    for (let i = 0; i < listaPersonas.length; i++) {
        if (psUsuario == listaPersonas[i]['correo']) {
            if (psCedula == listaPersonas[i]['cedula']) {

                sRol = listaPersonas[i]['rol'];

                localStorage.setItem('nombreUsuarioActivo', listaPersonas[i]['nombre_completo']);
                localStorage.setItem('correoUsuarioActivo', listaPersonas[i]['correo']);
                localStorage.setItem('rolUsuarioActivo', sRol);

            }
        }
    }
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
}
