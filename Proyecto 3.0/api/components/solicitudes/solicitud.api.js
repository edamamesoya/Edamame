'use strict'
const solicitudModel = require('./solicitud.model');
//registrar solicitudes
module.exports.registrar = function (req, res) {
    let nuevaSolicitud = new solicitudModel({

        sedes: req.body.sedes,
        periodos: req.body.periodos,
        grupos: req.body.grupos,
        cursos: req.body.cursos,
        nombre: req.body.nombre


    });

    nuevaSolicitud.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar la solicitud' + error });
        } else {
            res.json({ success: true, msg: 'La solicitud se registró con éxito' });
        }
    });
};
//agregar sede a la solicitud
module.exports.agregar_sede = function(req, res){
    
    solicitudModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'sedes': req.body.sedes}
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar la sede, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'La sede se registró con éxito'});
            }
        }
    )
};
//agregar periodo a la solicitud
module.exports.agregar_periodo = function(req, res){
    
    solicitudModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'periodos': req.body.periodos}
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar el periodo, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El periodo se registró con éxito'});
            }
        }
    )
};
//agregar grupo a la solicitud
module.exports.agregar_grupo = function(req, res){
    
    solicitudModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'grupos': req.body.grupos}
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar el grupo, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El grupo se registró con éxito'});
            }
        }
    )
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
//listar solicitudes
module.exports.listar_solicitudes = function (req, res) {
    solicitudModel.find().sort({ nombre: 'asc' }).then(
        function (solicitudes) {
            res.send(solicitudes);
        }
    );
};