'use strict'
const solicitudModel = require('./solicitud.model');
//registrar solicitudes
module.exports.registrar = function (req, res) {
    let nuevaSolicitud = new solicitudModel({

        nombre: req.body.nombre,

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
module.exports.listar_todos = function (req, res) {
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
            {'cursos':
                {
                    codigo : req.body.codigo,
                    nombre : req.body.nombre,
                    creditos : req.body.creditos,
                    carrera : req.body.carrera,
                    requisitos : req.body.requisitos
                }
            }
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