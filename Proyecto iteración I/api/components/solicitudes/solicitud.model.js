'use strict';
let mongoose = require('mongoose');

let solicitudSchema = new mongoose.Schema({

    nombre : {type : String, required : true},
    cursos : {type : String, required : true},
});

module.exports = mongoose.model('Solicitud', solicitudSchema);