'use strict';

permisosRol();
const botonSalir = document.querySelector('#bLogOut');
botonSalir.addEventListener('click', salir);


let sUsuario = localStorage.getItem('correoUsuarioActivo');
let sRol = localStorage.getItem('rolUsuarioActivo');
let listaPersonas = obtenerUsuarios();
const sNombre = document.querySelector('#txtNombre');
const sCedula = document.querySelector('#txtCedula');
const dFecha = document.querySelector('#txtFecha');
const sTelefono = document.querySelector('#txtTelefono');
const sDireccion = document.querySelector('#txtDireccion');
const pFoto = document.querySelector('txtFoto');

const sEditarPrimerNombre = document.querySelector('#txtEditarNombre');
const seditarCedula = document.querySelector('#txtEditarCedula');
const dEditarFecha = document.querySelector('#txtEditarFecha');
const inputEditarTelefono = document.querySelector('#txtEditarTelefono');
const inputEditarDireccion = document.querySelector('#txtEditarDireccion');

const botonModificar = document.querySelector('#btnEditar');
const botonRegistrar = document.querySelector('#btnRegistrar');


botonRegistrar.addEventListener('click', obtenerDatos);
botonModificar.addEventListener('click', modificarDatos);

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

function limpiarFormulario(){
    inputEditarDireccion.value = '';
    inputEditarTelefono.value = '';
};

function editar(){
    let id = this.dataset.id;

    let inputEditarPrimerNombre, inputEditarSegundoNombre, inputEditarPrimerApellido, inputEditarCedula, inputEditarProvincia, inputEditarCanton, inputEditarDistrito, inputEditarFechaIngreso;
    document.getElementById("modificar").click();
    let usuario = obtenerUsuarioPorId(id);

    inputEditarPrimerNombre.value = usuario['primerNombre'];
    inputEditarSegundoNombre.value = usuario['segundoNombre'];
    inputEditarPrimerApellido.value = usuario['primerApellido'];
    inputEditarSegundoApellido.value = usuario['segundoApellido'];
    inputEditarCedula.value = usuario['cedula'];
    inputEditarProvincia.value = usuario['provincia'];
    inputEditarCanton.value = usuario['canton'];
    inputEditarDistrito.value = usuario['distrito'];
    inputEditarDireccion.value = usuario['direccion'];
    inputEditarFechaIngreso.valueAsDate = new Date(usuario['fechaIngreso']);
    inputEditarTelefono.value = usuario['telefono'];
    inputEditarCorreo.value = usuario['correo'];
    inputEditarRol.value = usuario['rol'];
    inputEditarPrimerNombreContacto.value = usuario['primerNombreContacto'];
    inputEditarSegundoNombreContacto.value = usuario['segundoNombreContacto'];
    inputEditarPrimerApellidoContacto.value = usuario['primerApellidoContacto'];
    inputEditarSegundoApellidoContacto.value = usuario['segundoApellidoContacto'];
    inputEditarTelefonoContacto.value = usuario['telefonoContacto'];
    chkEstado.checked = usuario['estado'];
    inputId.value = usuario['_id'];
};