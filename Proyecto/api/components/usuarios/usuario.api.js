'use strict'
const usuarioModel = require('./usuario.model');

module.exports.registrar = function(req, res) {
    let nuevoUsuario = new usuarioModel({
        primerNombre : req.body.primerNombre,
        segundoNombre : req.body.segundoNombre,
        primerApellido : req.body.primerApellido,
        segundoApellido : req.body.segundoApellido,
        cedula : req.body.cedula,
        provincia : req.body.provincia,
        canton : req.body.canton,
        distrito : req.body.distrito,
        direccion : req.body.direccion,
        fechaIngreso : req.body.fechaIngreso,
        telefono : req.body.telefono,
        correo : req.body.correo,
        rol : req.body.rol,
        contrasenna : req.body.cedula,
        primerNombreContacto : req.body.primerNombreContacto,
        segundoNombreContacto : req.body.segundoNombreContacto,
        primerApellidoContacto : req.body.primerApellidoContacto,
        segundoApellidoContacto : req.body.segundoApellidoContacto,
        telefonoContacto : req.body.telefonoContacto
    });

    nuevoUsuario.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el usuario' + error});
        }else{
            res.json({success : true, msg : 'El usuario se registró con éxito'});
        }
    });
};

module.exports.listar_todos = function(req, res){
    usuarioModel.find().sort({primerNombre : 'asc'}).then(
        function(usuarios){
            res.send(usuarios);
        }
    );
};
