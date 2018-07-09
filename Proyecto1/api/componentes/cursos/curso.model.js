'use strict';
let mongoose = require('mongoose');

let cursoSchema = new mongoose.Schema({
    codigo : {type : String, required : true},
    nombre : {type : String, required : true},
    creditos : {type : Number, required : true},
    requisitos : {type : String, required : true},
    fecha : {type : Date, required : true},
    estado : {type : Boolean, required : true}

});

module.exports = mongoose.model('Curso', cursoSchema);