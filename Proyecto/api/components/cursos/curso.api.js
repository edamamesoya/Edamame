'use strict'
const cursoModel = require('./curso.model');

module.exports.registrar = function(req, res) {
    let nuevoCurso = new cursoModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        creditos : req.body.creditos,
        estado : 'true'
    });

    nuevoCurso.save(function(error){
        if(error){
            res.json({success : false, msg : error});
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

module.exports.eliminar_curso = function (req, res) {
    cursoModel.findByIdAndDelete(req.body._id,
        function (err, curso) {
            if (err) {
                res.json({ success: false, msg: 'El curso no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El curso se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.buscar_curso_id = function (req, res) {
    cursoModel.findById({ _id: req.body._id }).then(
        function (curso) {
            res.send(curso);
        }
    );
};

module.exports.modificar_curso = function (req, res) {
    cursoModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, curso) {
            if (err) {
                res.json({ success: false, msg: 'El curso no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'El curso se ha actualizado correctamente. '});
            }
        });
};