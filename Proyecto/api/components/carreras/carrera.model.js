'use strict';
let mongoose = require('mongoose');

let carreraSchema = new mongoose.Schema({
    codigo : {type : String, required : true, unique : true},
    nombre : {type : String, required : true, unique : true},
    grado : {type : String, required : true},
    creditos : {type : Number, required : true},
    fechaCreacion : {type : Date, required : true},
    estado : {type : Boolean, required : true},
    cursosAsignados : [
        {
            codigoCurso : {type : String},
            nombreCurso : {type : String},
            requisitos : {type : Array}
        }
    ]
});

module.exports = mongoose.model('Carrera', carreraSchema);