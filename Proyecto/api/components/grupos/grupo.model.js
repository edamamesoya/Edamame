'use strict';
let mongoose = require('mongoose');

let grupoSchema = new mongoose.Schema({
    numero: {type : String, required : true},
    curso : {type : String, required : true},
    cupo : {type : Number, required : true},
    profesores : {type : Array, required : true},
    laboratorio : {type : String},
    tipo : {type : String, required : true},
    estado : {type : Boolean, required : true}
});

module.exports = mongoose.model('Grupo', grupoSchema);