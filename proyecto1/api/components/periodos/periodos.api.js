'use strict'

const periodoModel = require('./periodos.model');

module.exports.registrar = function(req, res) {
    let nuevoPeriodo = new periodoModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        cupos : req.body.cupos,
        estado : req.body.estado
    });

    nuevoPeriodo.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la periodo' + error});
        }else{
            res.json({success : true, msg : 'La periodo se registró con éxito'});
        }
    });
};

module.exports.listar_todos = function(req, res){
    periodoModel.find().sort({nombre : 'asc'}).then(
        function(periodos){
            res.send(periodos);
        }
    );
};

module.exports.buscar_periodo = function(req, res){
    let sCodigo = req.body.codigo;
    let sNombre = req.body.nombre;
    periodoModel.find({
        'codigo': {'$regex': sCodigo, '$options': 'i'}
    }).then(
        function(periodos){
            res.send(periodos);
        }
    );
    periodoModel.find({
        'nombre': {'$regex': sNombre, '$options': 'i'}  
    }).then(
        function(periodos){
            res.send(periodos);
        }
    );
};