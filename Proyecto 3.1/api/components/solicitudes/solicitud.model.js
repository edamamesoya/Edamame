'use strict';
let mongoose = require('mongoose');

let solicitudSchema = new mongoose.Schema({

    sedes : {type : String, required : true},
    periodos : {type : String, required : true},
    grupos : {type : String, required : true},
    cursos : {type : String, required : true},
    nombre : {type : String, required : true},
    estado : {type : String},
    profesor: {type : String}

});

module.exports = mongoose.model('Solicitud', solicitudSchema);