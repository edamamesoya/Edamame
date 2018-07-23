'use strict';
let mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    primerNombre : {type : String, required : true},
    segundoNombre : {type : String, required : false},
    primerApellido : {type : String, required : true},
    segundoApellido : {type : String, required : true},
    cedula : {type : Number, required : true, unique : true},
    provincia : {type : String, required : true},
    canton : {type : String, required : true},
    distrito : {type : String, required : true},
    direccion : {type : String, required : true},
    fechaIngreso : {type : Date, required : true},
    telefono : {type : Number, required : true},
    correo : {type : String, required : true, unique : true},
    rol : {type : String, required : true},
    contrasenna : {type : String},
    primerNombreContacto : {type : String, required : true},
    segundoNombreContacto : {type : String, required : false},
    primerApellidoContacto : {type : String, required : true},
    segundoApellidoContacto : {type : String, required : true},
    telefonoContacto : {type : Number, required : true}
});

module.exports = mongoose.model('Usuario', usuarioSchema);