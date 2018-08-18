'use strict';
let mongoose = require('mongoose');

let sedeSchema = new mongoose.Schema({
    nombre : {type : String, required : true, unique : true},
    provincia : {type : String, required : false},
    canton : {type : String, required : false},
    distrito : {type : String, required : false},
    tipo : {type : String, required : true},
    longitudSede : {type : Number},
    latitudSede : {type : Number},
    estado : {type : Boolean, required : true},
    carrerasAsignadas : [
        {
            codigoCarrera : {type : String},
            nombreCarrera : {type : String}
        }
    ]

});

module.exports = mongoose.model('Sede', sedeSchema);