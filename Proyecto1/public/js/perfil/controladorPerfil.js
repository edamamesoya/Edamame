'use strict';

const botonSalir = document.querySelector('#bLogOut');
botonSalir.addEventListener('click', salir);


let sUsuario = localStorage.getItem('correoUsuarioActivo');
let sRol = localStorage.getItem('rolUsuarioActivo');
let listaPersonas = obtenerUsuarios();
let sNombre = document.querySelector('#txtNombre');
let sCedula = document.querySelector('#txtCedula');
let dFecha = document.querySelector('#txtFecha');
let sTelefono = document.querySelector('#txtTelefono');
let sDireccion = document.querySelector('#txtDireccion');
let pFoto = document.querySelector('txtFoto');

verificarAcceso(sUsuario);


for (let i = 0; i < listaPersonas.length; i++) {
    if(sUsuario == listaPersonas[i]['correo']){
        sNombre.innerHTML = listaPersonas[i]['primerNombre'] + ' '  + listaPersonas[i]['segundoNombre'] + ' ' + listaPersonas[i]['primerApellido'] + ' ' + listaPersonas[i]['segundoApellido'];
        sCedula.innerHTML = listaPersonas[i]['cedula'];

        let dFechaIngreso = new Date(listaPersonas[i]['fechaIngreso'])
        let nDia = dFechaIngreso.getUTCDate();
        let nMes = dFechaIngreso.getUTCMonth() + 1;
        let nAnno = dFechaIngreso.getUTCFullYear();

        dFecha.innerHTML = nDia + '/' + nMes + '/' + nAnno;
        sTelefono.innerHTML = listaPersonas[i]['telefono'];
        sDireccion.innerHTML = listaPersonas[i]['provincia'] + ',' + listaPersonas[i]['canton'] + ',' + listaPersonas[i]['distrito'] + ',' + listaPersonas[i]['direccion'];

    }
};

function salir() {
    localStorage.removeItem('correoUsuarioActivo');
    localStorage.removeItem('rolUsuarioActivo');

    window.location.href = 'login.html';
};

function verificarAcceso(psUsuario) {
    let listaPersonas = obtenerUsuarios();
    if (window.location == 'login.html') {

    } else {
        let bError = true;
        for (let i = 0; i < listaPersonas.length; i++) {
            if (psUsuario == listaPersonas[i]['correo']) {
                bError = false;
            }                
            
        };

        if(bError){
            window.location.href = 'login.html'
        }else{

        }
    };
};
