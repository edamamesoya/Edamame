'use strict';
let mongoose = require('mongoose');

let grupoSchema = new mongoose.Schema({
    numeroGrupo : {type : Number, required : true},
    numeroLaboratorio : {type : Number, required : true},
    nombreProfesor : {type : String, required : true},
    numeroEstdiantes : {type : Number, required : true},
    diasSemana : {type : String, required : true}
});

module.exports = mongoose.model('Grupo', grupoSchema);