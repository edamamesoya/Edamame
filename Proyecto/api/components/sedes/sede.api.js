'use strict'
const sedeModel = require('./sede.model');
//registrar sede
module.exports.registrar = function (req, res) {
    let nuevaSede = new sedeModel({
        nombre: req.body.nombre,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        tipo: req.body.tipo,
        longitudSede:req.body.longitudSede,
        latitudSede: req.body.latitudSede,
        estado : 'true'
        
    });

    nuevaSede.save(function (error) {
        if (error) {
            res.json({ success: false, msg : error });
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

module.exports.buscar_sede_id = function (req, res) {
    sedeModel.findById({ _id: req.body._id }).then(
        function (sede) {
            res.send(sede);
        }
    );
};

module.exports.modificar_sede = function (req, res) {
    sedeModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, sede) {
            if (err) {
                res.json({ success: false, msg: 'La sede no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La sede se ha actualizado correctamente. '});
            }
        });
};

module.exports.eliminar_sede = function (req, res) {
    sedeModel.findByIdAndDelete(req.body._id,
        function (err, sede) {
            if (err) {
                res.json({ success: false, msg: 'La sede no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'La sede se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.agregar_carrera = function(req, res){  
    sedeModel.update(
        {_id: req.body._id}, 
        {$push: 
            {'carrerasAsignadas':
                {
                    codigoCarrera: req.body.codigoCarrera, 
                    nombreCarrera: req.body.nombreCarrera
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo asignar la carrera a esta sede, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'La carrera se asignó con éxito'});
            }
        }
    )
};

module.exports.desenlazar_carrera = function(req, res){  
    sedeModel.update(
        {_id: req.body._id}, 
        {$pull: 
            {'carrerasAsignadas':
                {
                    _id: req.body._idCarrera
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo desenlazar la carrera de esta sede, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'La carrera se desasignó con éxito'});
            }
        }
    )
};

module.exports.modificar_enlace_carrera = function(req, res){  
    sedeModel.findOneAndUpdate(
        {_id: req.body._id, "carrerasAsignadas._id": req.body._idCarrera}, 
        {
            "$set": {
                'carrerasAsignadas.$.codigoCarrera': req.body.codigoCarrera,
                'carrerasAsignadas.$.nombreCarrera': req.body.nombreCarrera
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo actualizar la carrera de esta sede, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'La carrera se actualizó con éxito'});
            }
        }
    )
};