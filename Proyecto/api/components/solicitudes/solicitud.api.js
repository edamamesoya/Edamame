'use strict'
const solicitudModel = require('./solicitud.model');
//registrar solicitudes
module.exports.registrar = function (req, res) {
    let nuevaSolicitud = new solicitudModel({

        nombre: req.body.nombre,
        cursos: req.body.cursos,
        sedes: req.body.sedes,
        periodos: req.body.periodos

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
//agregar sede a la solicitud
module.exports.agregar_sede = function(req, res){
    
    solicitudModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'sedes':
                {
                    nombre : req.body.nombre,
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar la sede, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'La Sede se registró con éxito'});
            }
        }
    )
};
//agregar Periodo a la solicitud
module.exports.agregar_periodo = function(req, res){
    
    solicitudModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'periodos':
                {
                    nombre : req.body.nombre,
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar el periodo, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El Periodo se registró con éxito'});
            }
        }
    )
};