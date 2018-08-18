'use strict';

permisosRol();
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
                document.querySelector('#nombreUsuarioActivo').innerHTML = listaPersonas[i]['primerNombre'] + ' ' + listaPersonas[i]['primerApellido'] + ' ' + listaPersonas[i]['segundoApellido'].substring(0, 1) + '.';
                bError = false;
            }                
            
        };

        if(bError){
            window.location.href = 'login.html'
        }else{

        }
    };
};


function permisosRol() {
    switch(localStorage.getItem('rolUsuarioActivo')) {
        case 'administrador':
            break;
        case 'rectoria':
            document.getElementById('menuPerfil').classList.add('w3-mobile');
            document.getElementById('menuPerfil').style.width = '19%';
            document.getElementById('menuSolicitudes').classList.add('w3-mobile');
            document.getElementById('menuSolicitudes').style.width = '19%';
            document.getElementById('menuFunciones').classList.add('w3-mobile');
            document.getElementById('menuFunciones').style.width = '19%';
            document.getElementById('menuReportes').classList.add('w3-mobile');
            document.getElementById('menuReportes').style.width = '19%';
            document.getElementById('menuConfiguracion').classList.add('w3-mobile');
            document.getElementById('menuConfiguracion').style.width = '19%';
            document.getElementById('menuBitacoras').remove();
            break;
        case 'decanatura':
            document.getElementById('menuPerfil').classList.add('w3-mobile');
            document.getElementById('menuPerfil').style.width = '30%';
            document.getElementById('menuSolicitudes').classList.add('w3-mobile');
            document.getElementById('menuSolicitudes').style.width = '30%';
            document.getElementById('menuFunciones').classList.add('w3-mobile');
            document.getElementById('menuFunciones').style.width = '30%';
            document.getElementById('menuBitacoras').remove();
            document.getElementById('menuReportes').remove();
            document.getElementById('menuConfiguracion').remove();
            break;
        case 'asistDecanatura':
            document.getElementById('menuPerfil').classList.add('w3-mobile');
            document.getElementById('menuPerfil').style.width = '30%';
            document.getElementById('menuSolicitudes').classList.add('w3-mobile');
            document.getElementById('menuSolicitudes').style.width = '30%';
            document.getElementById('menuFunciones').classList.add('w3-mobile');
            document.getElementById('menuFunciones').style.width = '30%';
            document.getElementById('menuBitacoras').remove();
            document.getElementById('menuReportes').remove();
            document.getElementById('menuConfiguracion').remove();
            break;
        case 'profesor':
            document.getElementById('menuPerfil').classList.add('w3-mobile');
            document.getElementById('menuPerfil').style.width = '30%';
            document.getElementById('menuSolicitudes').classList.add('w3-mobile');
            document.getElementById('menuSolicitudes').style.width = '30%';
            document.getElementById('menuBitacoras').classList.add('w3-mobile');
            document.getElementById('menuBitacoras').style.width = '30%';
            document.getElementById('menuFunciones').remove();
            document.getElementById('menuReportes').remove();
            document.getElementById('menuConfiguracion').remove();
            break;
        case 'asistente':
            document.getElementById('menuPerfil').classList.add('w3-mobile');
            document.getElementById('menuPerfil').style.width = '45%';
            document.getElementById('menuBitacoras').classList.add('w3-mobile');
            document.getElementById('menuBitacoras').style.width = '45%';
            document.getElementById('menuSolicitudes').remove();
            document.getElementById('menuFunciones').remove();
            document.getElementById('menuReportes').remove();
            document.getElementById('menuConfiguracion').remove();
            break;
    }
};