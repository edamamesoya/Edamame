'use strict';
let mongoose = require('mongoose');

let cursoSchema = new mongoose.Schema({
    codigo : {type : String, required : true, unique : true},
    nombre : {type : String, required : true},
    creditos : {type : Number, required : true},
    carrera : {type : String, required : true},
    requisitos : {type : Array, required : true}
});

module.exports = mongoose.model('Curso', cursoSchema);