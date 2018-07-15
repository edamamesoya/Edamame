'use strict'
const sedeModel = require('./sede.model');
//registrar sede
module.exports.registrar = function (req, res) {
    let nuevaSede = new sedeModel({

        nombre: req.body.nombre,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito

    });

    nuevaSede.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar la sede' + error });
        } else {
            res.json({ success: true, msg: 'La solicitud se registró con éxito' });
        }
    });
};
//listar sedes
module.exports.listar_todos = function (req, res) {
    sedeModel.find().sort({ nombre: 'asc' }).then(
        function (sedes) {
            res.send(sedes);
        }
    );
};