'use strict';
let mongoose = require('mongoose');

let solicitudSchema = new mongoose.Schema({

    nombre : {type : String, required : true},
    sedes : {type : String },
    periodos : {type : String },
    cursos : {type : String },
});

module.exports = mongoose.model('Solicitud', solicitudSchema);