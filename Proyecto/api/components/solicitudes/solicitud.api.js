'use strict'
const solicitudModel = require('./solicitud.model');
//registrar solicitudes
module.exports.registrar = function (req, res) {
    let nuevaSolicitud = new solicitudModel({

        nombre: req.body.nombre,
        cursos: req.body.cursos,
        profe: req.body.profe,
        estado: req.body.estado,
        sedes: req.body.sedes,
        grupos: req.body.grupos,
        periodos: req.body.periodos,
        asistentePrevio: req.body.asistentePrevio,
        fecha: req.body.fecha,

    });

    nuevaSolicitud.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar la solicitud' + error });
        } else {
            res.json({ success: true, msg: 'La solicitud se registró con éxito' });
        }
    });
};
//listar solicitudes
module.exports.listar_solicitudes = function (req, res) {
    solicitudModel.find().sort({ nombre: 'asc' }).then(
        function (solicitudes) {
            res.send(solicitudes);
        }
    );
};
//agregar curso a la solicitud
module.exports.agregar_curso = function(req, res){
    
    solicitudModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'cursos': req.body.cursos}
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar el curso, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El curso se registró con éxito'});
            }
        }
    )
};

module.exports.eliminar_solicitud = function (req, res) {
    solicitudModel.findByIdAndDelete(req.body._id,
        function (err, solicitud) {
            if (err) {
                res.json({ success: false, msg: 'La solicitud no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La solicitud se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.buscar_solicitud_id = function (req, res) {
    solicitudModel.findById({ _id: req.body._id }).then(
        function (solicitud) {
            res.send(solicitud);
        }
    );
};

module.exports.modificar_solicitud = function (req, res) {
    solicitudModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, solicitud) {
            if (err) {
                res.json({ success: false, msg: 'La solicitud no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La solicitud se ha actualizado correctamente. '});
            }
        });
};