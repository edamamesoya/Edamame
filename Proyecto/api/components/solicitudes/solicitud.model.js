'use strict';
let mongoose = require('mongoose');

let solicitudSchema = new mongoose.Schema({

    nombre : {type : String, required : true},
    cursos : {type : String, required : true},
    profe : {type : String, required : true},
    estado : {type : String, required : true},
});

module.exports = mongoose.model('Solicitud', solicitudSchema);