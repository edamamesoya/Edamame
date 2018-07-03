'use strict'

const laboratorioModel = require('./laboratorio.model');

module.exports.registrar = function(req, res) {
    let nuevoLaboratorio = new laboratorioModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        creditos : req.body.creditos,
        estado : req.body.estado
    });

    nuevoLaboratorio.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la laboratorio' + error});
        }else{
            res.json({success : true, msg : 'La laboratorio se registró con éxito'});
        }
    });
};

module.exports.listar_todos = function(req, res){
    laboratorioModel.find().sort({nombre : 'asc'}).then(
        function(laboratorios){
            res.send(laboratorios);
        }
    );
}