'use strict';
let mongoose = require('mongoose');

let solicitudSchema = new mongoose.Schema({

    sedes : {type : String, required : true},
    periodos : {type : String, required : true},
    cursos : {type : String, required : true},
    grupos : {type : String, required : true},
    nombre : {type : String, required : true},
    primerApellido : {type : String},
    segundoApellido : {type : String},
    telefono : {type : Number},
    cedula : {type : Number},
    correo : {type : String},
    estado : {type : String, required : true},
    profe : {type : String, required : true},
    asistentePrevio : {type : Boolean, required : false},
    fecha : {type : Date, required : false},
});

module.exports = mongoose.model('Solicitud', solicitudSchema);