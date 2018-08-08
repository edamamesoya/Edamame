'use strict';
let mongoose = require('mongoose');

let solicitudSchema = new mongoose.Schema({

    sede : {type : String, required : true},
    periodo : {type : String, required : true},
    grupo : {type : String, required : true},
    cursos : {type : String, required : true},
    nombre : {type : String, required : true},
    estado : {type : String, required : true},
    profe : {type : String, required : true},
});

module.exports = mongoose.model('Solicitud', solicitudSchema);