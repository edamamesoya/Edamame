'use strict'
const cursoModel = require('./curso.model');

module.exports.registrar = function(req, res) {
    let nuevoCurso = new cursoModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        creditos : req.body.creditos,
        carrera : req.body.carrera,
        requisitos : req.body.requisitos
    });

    nuevoCurso.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el curso ' + error});
        }else{
            res.json({success : true, msg : 'El curso se registró con éxito'});
        }
    });
};

module.exports.listar_todos = function(req, res){
    cursoModel.find().sort({nombre : 'asc'}).then(
        function(cursos){
            res.send(cursos);
        }
    );
};