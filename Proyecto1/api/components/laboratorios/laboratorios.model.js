'use strict';
let mongoose = require('mongoose');

let laboratorioSchema = new mongoose.Schema({
    codigo : {type : String, required : true},
    nombre : {type : String, required : true},
    cupos : {type : Number, required : true},
    estado : {type : Boolean, required : true}
    //periodos
    //sedes
});

module.exports = mongoose.model('Laboratorio', laboratorioSchema);