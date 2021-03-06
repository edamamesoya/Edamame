'use strict'
const carreraModel = require('./carrera.model');

module.exports.registrar = function(req, res) {
    let nuevaCarrera = new carreraModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        creditos : req.body.creditos,
        fechaCreacion : req.body.fechaCreacion,
        estado : 'true'
    });

    nuevaCarrera.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la carrera ' + error});
        }else{
            res.json({success : true, msg : 'La carrera se registró con éxito'});
        }
    });
};

module.exports.listar_todos = function(req, res){
    carreraModel.find().sort({nombre : 'asc'}).then(
        function(carreras){
            res.send(carreras);
        }
    );
};

module.exports.agregar_curso = function(req, res){  
    carreraModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'cursosAsignados':
                {
                    codigoCurso: req.body.codigoCurso, 
                    nombreCurso: req.body.nombreCurso
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo el curso a esta carrera, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El curso se asignó con éxito'});
            }
        }
    )
};