'use strict';
let mongoose = require('mongoose');

let grupoSchema = new mongoose.Schema({
    numeroGrupo : {type : Number, required : true},
    nombreProfesor : {type : String, required : true},
    numeroEstudiantes : {type : Number, required : true},
    horarioDomingo: {type : String },
    horarioLunes: {type : String },
    horarioMartes: {type : String },
    horarioMiercoles: {type : String },
    horarioJueves: {type : String },
    horarioViernes: {type : String },
    horarioSabado: {type : String },
    horarioVirtual: {type : String },
    tiempoEntrada : {type : String },
    tiempoSalida : {type : String },
    sedes: {type : String},
    periodos: {type : String},
    cursos : {type : String},
    laboratorios: {type : String}
});

module.exports = mongoose.model('Grupo', grupoSchema);