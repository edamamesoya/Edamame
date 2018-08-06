'use strict';
let mongoose = require('mongoose');

let grupoSchema = new mongoose.Schema({
    numeroGrupoVirtual: {type : Number},
    numeroEstudiantesVirtual: {type : Number},
    nombreProfesor1: {type : String},
    nombreProfesor2: {type : String},
    nombreProfesor3: {type : String},
    numeroGrupo : {type : Number},
    nombreProfesor : {type : String},
    numeroEstudiantes : {type : Number},
    cursos : {type : String},
    laboratorios: {type : String}
});

module.exports = mongoose.model('Grupo', grupoSchema);