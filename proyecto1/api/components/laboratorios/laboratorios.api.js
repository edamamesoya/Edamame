'use strict'

const laboratorioModel = require('./laboratorios.model');

module.exports.registrar = function(req, res) {
    let nuevoLaboratorio = new laboratorioModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        cupo : req.body.cupo,
        estado : req.body.estado
    });

    nuevoLaboratorio.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la laboratorio' + error});
        }else{
            res.json({success : true, msg : 'El laboratorio se registró con éxito'});
        }
    });
};

module.exports.listar_laboratorio = function(req, res){
    laboratorioModel.find().sort({nombre : 'asc'}).then(
        function(laboratorios){
            res.send(laboratorios);
        }
    );
};

module.exports.buscar_laboratorio = function(req, res){
    let sCodigo = req.body.codigo;
    let sNombre = req.body.nombre;
    laboratorioModel.find({
        'codigo': {'$regex': sCodigo, '$options': 'i'}
    }).then(
        function(laboratorios){
            res.send(laboratorios);
        }
    );
    laboratorioModel.find({
        'nombre': {'$regex': sNombre, '$options': 'i'}  
    }).then(
        function(laboratorios){
            res.send(laboratorios);
        }
    );
};