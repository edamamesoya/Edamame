'use strict'

/**
 * Hace click a la opción de 'Acciones' para que se muestre
 * por default al cargar o recargar la página.
 */
document.getElementById("defaultOpen").click();

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