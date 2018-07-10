'use strict';

let mongoose = require('mongoose');

let laboratorioSchema = new mongoose.Schema({
    codigo : {type : String, required : true},
    nombre : {type : String, required : true},
    cupos : {type : Number, required : true},
    sede : {type : String, required : true},
    estado : {type : Boolean, required : true}
});

laboratorioSchema.index({codigo : 'text', nombre : 'text'});

module.exports = mongoose.model('Laboratorio', laboratorioSchema);