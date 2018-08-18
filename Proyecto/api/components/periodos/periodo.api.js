'use strict'

const periodoModel = require('./periodo.model');

module.exports.registrar = function(req, res) {
    let nuevoPeriodo = new periodoModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        fechainicio : req.body.fechainicio,
        fechaconclusion : req.body.fechaconclusion,
        estado : req.body.estado
    });

    nuevoPeriodo.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la periodo' + error});
        }else{
            res.json({success : true, msg : 'El periodo se registró con éxito'});
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

module.exports.eliminar_periodo = function (req, res) {
    periodoModel.findByIdAndDelete(req.body._id,
        function (err, periodo) {
            if (err) {
                res.json({ success: false, msg: 'El periodo no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El periodo se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.buscar_periodo_id = function (req, res) {
    periodoModel.findById({ _id: req.body._id }).then(
        function (periodo) {
            res.send(periodo);
        }
    );
};

module.exports.modificar_periodo = function (req, res) {
    periodoModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, periodo) {
            if (err) {
                res.json({ success: false, msg: 'El periodo no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El periodo se ha actualizado correctamente. '});
            }
        });
};