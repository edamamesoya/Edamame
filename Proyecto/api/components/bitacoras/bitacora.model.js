'use strict';
let mongoose = require('mongoose');

let bitacoraSchema = new mongoose.Schema({
    curso : {type : String, required : true},
    asistente : {type : String, required : true},
    profesor : {type : String, required : true},
    fechaCreacion : {type : Date, required : true},
    cantidadHoras : {type : Number, required : true},   
    estado : {type : Boolean, required : true},
    entradas : [
        {
            fecha : {type : Date},
            actividad : {type : String},
            horas : {type : Number},
            estudiantes : {type : Array}
        }
    ]
});

module.exports = mongoose.model('Bitacora', bitacoraSchema);