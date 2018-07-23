'use strict';
let mongoose = require('mongoose');

let sedeSchema = new mongoose.Schema({

    nombre : {type : String, required : true},
    provincia : {type : String, required : true},
    canton : {type : String, required : true},
    distrito : {type : String, required : true},
    latitudSede:{type : String},
    longitudSede:{type : String}
});

module.exports = mongoose.model('Sede', sedeSchema);