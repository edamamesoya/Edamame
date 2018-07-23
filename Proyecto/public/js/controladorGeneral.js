'use strict';

permisosRol();
let sUsuario = localStorage.getItem('correoUsuarioActivo');

verificarAcceso(sUsuario);

const botonSalir = document.querySelector('#bLogOut');
botonSalir.addEventListener('click', salir);

/**
 * Hace click a la opción de 'Menu' para que se muestre
 * por default el listar al cargar o recargar la página.
 */
document.getElementById("buscar").click();

/**
 * Descripción: Muestra una función según el botón presionado
 * en el panel 'Menu' y deshabilita las otras funciones
 * para que no se muestren.
 * @param: {String} evt, {String} funcion
 */
function abrirFuncion(evt, funcion) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(funcion).style.display = "block";
    evt.currentTarget.className += " active";
};

/**
 * Descripción: Permite hacer logout de la aplicación
 */
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