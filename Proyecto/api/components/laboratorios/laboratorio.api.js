'use strict'

const laboratorioModel = require('./laboratorio.model');

module.exports.registrar = function (req, res) {
    let nuevoLaboratorio = new laboratorioModel({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        cupo: req.body.cupo,
        sede: req.body.sede,
        estado: req.body.estado
    });

    nuevoLaboratorio.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar la laboratorio' + error });
        } else {
            res.json({ success: true, msg: 'El laboratorio se registró con éxito' });
        }
    });
};

module.exports.listar_laboratorio = function (req, res) {
    laboratorioModel.find().sort({ nombre: 'asc' }).then(
        function (laboratorios) {
            res.send(laboratorios);
        }
    );
};

module.exports.buscar_laboratorio = function (req, res) {
    let sCodigo = req.body.codigo;
    let sNombre = req.body.nombre;
    laboratorioModel.find({
        'codigo': { '$regex': sCodigo, '$options': 'i' }
    }).then(
        function (laboratorios) {
            res.send(laboratorios);
        }
    );
    laboratorioModel.find({
        'nombre': { '$regex': sNombre, '$options': 'i' }
    }).then(
        function (laboratorios) {
            res.send(laboratorios);
        }
    );

};


module.exports.buscar_laboratorio_por_id = function (req, res) {
    userModel.findById({ _id: req.body._id }).then(
        function (laboratorio) {
            res.send(laboratorio);
        }
    );
};

module.exports.modificar_laboratorio = function (req, res) {
    userModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'El laboratorio no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};