'use strict';
let mongoose = require('mongoose');

let sedeSchema = new mongoose.Schema({

    nombre : {type : String, required : true},
    provincia : {type : String, required : true},
    canton : {type : String, required : true},
    distrito : {type : String, required : true},
    longitudSede : {type : Number},
    latitudSede : {type : Number},
    estado : {type : Boolean, required : true}

});

module.exports = mongoose.model('Sede', sedeSchema);