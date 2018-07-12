'use strict'
const grupoModel = require('./grupo.model');

module.exports.registrar = function (req, res) {
    let nuevoGrupo = new grupoModel({
        numeroGrupo: req.body.numeroGrupo,
        numeroLaboratorio: req.body.numeroLaboratorio,
        nombreProfesor: req.body.nombreProfesor,
        numeroEstudiantes: req.body.numeroEstudiantes,
        diasSemana: req.body.diasSemana
    });

    nuevoGrupo.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el grupo' + error });
        } else {
            res.json({ success: true, msg: 'El Grupo se registró con éxito' });
        }
    });
};

module.exports.listar_todos = function (req, res) {
    grupoModel.find().sort({ numeroLaboratorio: 'asc' }).then(
        function (grupos) {
            res.send(grupos);
        }
    );
}
module.exports.buscar_grupo = function (req, res) {
    let snombreProfesor = req.body.nombreProfesor;

    grupoModel.find({ "nombreProfesor": { "$regex": snombreProfesor, "$options": "i" } }).then(
        function (grupos) {
            res.send(grupos);
        }
    );
};