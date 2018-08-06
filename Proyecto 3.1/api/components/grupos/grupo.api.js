'use strict'
const grupoModel = require('./grupo.model');
//registrar grupos
module.exports.registrar = function (req, res) {
    let nuevoGrupo = new grupoModel({
        numeroGrupoVirtual: req.body.numeroGrupoVirtual,
        numeroEstudiantesVirtual: req.body.numeroEstudiantesVirtual,
        nombreProfesor1: req.body.nombreProfesor1,
        nombreProfesor2: req.body.nombreProfesor2,
        nombreProfesor3: req.body.nombreProfesor3,
        numeroGrupo: req.body.numeroGrupo,
        nombreProfesor: req.body.nombreProfesor,
        numeroEstudiantes: req.body.numeroEstudiantes,
    });

    nuevoGrupo.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el grupo' + error });
        } else {
            res.json({ success: true, msg: 'El Grupo se registró con éxito' });
        }
    });
};
//listar grupos
module.exports.listar_todos = function (req, res) {
    grupoModel.find().sort({ numeroGrupo: 'asc' }).then(
        function (grupos) {
            res.send(grupos);
        }
    );
};
//agregar curso al grupo
module.exports.agregar_curso = function(req, res){
    
    grupoModel.update(
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

//agregar laboratorio al grupo
module.exports.agregar_laboratorio = function(req, res){
    
    grupoModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'laboratorios':
                {
                    codigo : req.body.codigo,
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar el laboratorio, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El laboratorio se registró con éxito'});
            }
        }
    )
};
//buscar grupo
module.exports.buscar_grupo = function (req, res) {
    let snombreProfesor = req.body.nombreProfesor;

    grupoModel.find({ "nombreProfesor": { "$regex": snombreProfesor, "$options": "i" } }).then(
        function (grupos) {
            res.send(grupos);
        }
    );
};
module.exports.eliminar_grupo = function (req, res) {
    grupoModel.findByIdAndDelete(req.body._id,
        function (err, grupo) {
            if (err) {
                res.json({ success: false, msg: 'El Grupo no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El Grupo se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.buscar_grupo_id = function (req, res) {
    grupoModel.findById({ _id: req.body._id }).then(
        function (grupo) {
            res.send(grupo);
        }
    );
};