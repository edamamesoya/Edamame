'use strict'

let sUsuario = localStorage.getItem('correoUsuarioActivo');

verificarAcceso(sUsuario);

const botonSalir = document.querySelector('#bLogOut');

botonSalir.addEventListener('click', salir);
/**
 * Hace click a la opción de 'Acciones' para que se muestre
 * por default al cargar o recargar la página.
 */
document.getElementById("buscar").click();

/**
 * Descripción: Muestra una función según el botón presionado
 * en el panel de 'Acciones' y deshabilita las otras funciones
 * para que no se muestren.
 * @param: {String} evento, {String} funcion
 * @return: n/a
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