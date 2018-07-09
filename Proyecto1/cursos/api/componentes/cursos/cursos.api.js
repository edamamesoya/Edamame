'use strict';
const cursoModel = require('./curso.model');

module.exports.registrar = function(req, res) {
   
    let nuevoCurso = new cursoModel({
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        credito : req.body.credito,
        requisito : req.body.requisito, 
        fecha : req.body.fecha, 
        estado : req.body.estado
    });

    nuevoCurso.save(function(error){
        if(error){
            res.json({success : false, msg: 'No se pudo registrar el curso, ocurrió el siguiente error ' + error});
        }else{
            res.json({success : true, msg: 'El curso se registró con éxito'}); 
        }
    });
};
module.exports.listar_todos = function(req , res){
    cursoModel.find().sort({codigo: 'asc'}).then(
        function(curso){
            res.send(curso);
        }
    );

};


module.exports.buscar_carrera = function(req, res){
    let sCodigo = req.body.codigo;
    let sNombre = req.body.nombre;
    cursoModel.find({ "codigo": { "$regex": sCodigo, "$options": "i" } }).then(
        function(cursos){
            res.send(cursos); 
        }
    );

    cursoModel.find({ "nombre": { "$regex": sNombre, "$options": "i" } }).then(
        function(cursos){
            res.send(cursos); 
        }
    );
};