'use strict'
const carreraModel = require('./carrera.model');

module.exports.registrar = function(req, res) {
    let nuevaCarrera = new carreraModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        grado : req.body.grado,
        creditos : req.body.creditos,
        fechaCreacion : req.body.fechaCreacion,
        estado : 'true'
    });

    nuevaCarrera.save(function(error){
        if(error){
            res.json({success : false, msg : error});
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
                    nombreCurso: req.body.nombreCurso,
                    requisitos : req.body.requisitos
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

module.exports.eliminar_carrera = function (req, res) {
    carreraModel.findByIdAndDelete(req.body._id,
        function (err, carrera) {
            if (err) {
                res.json({ success: false, msg: 'La carrera no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La carrera se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.buscar_carrera_id = function (req, res) {
    carreraModel.findById({ _id: req.body._id }).then(
        function (carrera) {
            res.send(carrera);
        }
    );
};

module.exports.modificar_carrera = function (req, res) {
    carreraModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, carrera) {
            if (err) {
                res.json({ success: false, msg: 'La carrera no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La carrera se ha actualizado correctamente. '});
            }
        });
};

module.exports.desenlazar_curso = function(req, res){  
    carreraModel.update(
        {_id: req.body._id}, 
        {$pull: 
            {'cursosAsignados':
                {
                    _id: req.body._idCurso
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo desenlazar el curso de esta carrera, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El curso se desasignó con éxito'});
            }
        }
    )
};

module.exports.modificar_enlace_curso = function(req, res){  
    carreraModel.findOneAndUpdate(
        {_id: req.body._id, "cursosAsignados._id": req.body._idCurso}, 
        {
            "$set": {
                'cursosAsignados.$.codigoCurso': req.body.codigoCurso,
                'cursosAsignados.$.nombreCurso': req.body.nombreCurso
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo actualizar el curso de esta carrera, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El curso se actualizó con éxito'});
            }
        }
    )
};