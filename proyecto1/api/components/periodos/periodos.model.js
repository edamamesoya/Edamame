'use strict';
let mongoose = require('mongoose');

let periodoSchema = new mongoose.Schema({
    codigo : {type : String, required : true},
    nombre : {type : String, required : true},
    fechainicio : {type : Number, required : true},
    fechaconclusion : {type : Boolean, required : true}
});

periodoSchema.index({codigo : 'text', nombre : 'text'});

module.exports = mongoose.model('Periodo', periodoSchema);