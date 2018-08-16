'use strict'
const bitacoraModel = require('./bitacora.model');

module.exports.registrar = function(req, res) {
    let nuevaBitacora = new bitacoraModel({
        curso : req.body.curso,
        asistente : req.body.asistente,
        profesor : req.body.profesor,
        fechaCreacion : req.body.fechaCreacion,
        cantidadHoras : '0',
        estado : 'pendiente'
    });

    nuevaBitacora.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la bitácora ' + error});
        }else{
            res.json({success : true, msg : 'La bitácora se registró con éxito'});
        }
    });
};

module.exports.listar_todos = function(req, res){
    bitacoraModel.find().sort({curso : 'asc'}).then(
        function(bitacoras){
            res.send(bitacoras);
        }
    );
};

module.exports.agregar_entrada = function(req, res){  
    bitacoraModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'entradas':
                {
                    fecha : req.body.fecha,
                    actividad : req.body.actividad,
                    horas : req.body.horas,
                    descripcion : req.body.descripcion
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo agregar la entrada a esta bitácora, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'La entrada se agregó con éxito'});
            }
        }
    )
};

module.exports.eliminar_entrada = function (req, res) {
    bitacoraModel.update(
        {_id: req.body._idBitacora}, 
        {$pull: 
            {'entradas':
                {
                    _id: req.body._idEntrada
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo eliminar la entrada, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'La entrada se eliminó con éxito'});
            }
        }
    )
};

module.exports.buscar_bitacora_id = function (req, res) {
    bitacoraModel.findById({ _id: req.body._id }).then(
        function (bitacora) {
            res.send(bitacora);
        }
    );
};

module.exports.modificar_entrada = function(req, res){  
    bitacoraModel.findOneAndUpdate(
        {_id: req.body._idBitacora, "entradas._id": req.body._idEntrada}, 
        {
            "$set": {
                'entradas.$.fecha': req.body.fecha,
                'entradas.$.actividad': req.body.actividad,
                'entradas.$.horas': req.body.horas,
                'entradas.$.descripcion': req.body.descripcion
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo actualizar la entrada de esta bitácora, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'La entrada se actualizó con éxito'});
            }
        }
    )
};

module.exports.modificar_bitacora = function (req, res) {
    bitacoraModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, bitacora) {
            if (err) {
                res.json({ success: false, msg: 'La bitácora no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La bitácora se ha actualizado correctamente. '});
            }
        });
};