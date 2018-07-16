'use strict';

permisosRol();

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

function permisosRol() {
    switch(localStorage.getItem('rolUsuarioActivo')) {
        case 'administrador':
            break;
        case 'rectoria':
            //
            break;
        case 'decanatura':
            //
            break;
        case 'asistDecanatura':
            //
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
            //
            break;
    }
};