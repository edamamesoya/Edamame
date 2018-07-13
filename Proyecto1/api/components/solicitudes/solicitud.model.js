'use strict';
let mongoose = require('mongoose');

let solicitudSchema = new mongoose.Schema({

    nombre : {type : String, required : true},
    cursos : [
        {
            codigo : {type : String },
            nombre : {type : String },
            creditos : {type : Number },
            carrera : {type : String },
            requisitos : {type : String }
        }
    ]
});

module.exports = mongoose.model('Solicitud', solicitudSchema);