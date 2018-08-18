'use strict';

/**
 * Exportamos todas las dependencias necesarias para establecer la conexión
 */
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan =  require('morgan'),
      mongoose = require('mongoose'),
      Chart = require('chart.js');

/**
 * Se definen las variables necesarias para la conexión con MongoDB
 */
let db = mongoose.connection,
    dburl = 'mongodb://Edamame:Edamame01@ds117101.mlab.com:17101/db_proyecto1',
    port = 4000;

/**
 * Se le indica que cree un servidor extra dentro del puerto 4000 y escuche los cambios que se le hagan a esos archivos
 */
let server = app.listen(port,_server());

/**
 * Se define la conexión con Mongoose, enviándole como parámetro la url de la base de datos
 */
mongoose.connect(dburl);

/**
 * Si la conexión falla, imprime en consola el error
 */
db.on('error', console.error.bind(console, 'Error de conexión: '));

/**
 * Si la conexión es exitosa nos imprime en la consola que se ha establecido conexión con Mongo
 */
db.once('open', function () {
  console.log('Base de datos conectada correctamente');
});

/**
 * Le indicamos a express que envíe las respuestas a la carpeta "public"
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Le indicamos a la aplicación que el formato de los datos va a ser JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use( function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * Exportamos todas las rutas dentro del index.js
 */
const carreras = require('./components/carreras/carrera.route.js');
const usuarios = require('./components/usuarios/usuario.route.js');
const cursos = require('./components/cursos/curso.route.js');
const laboratorios = require('./components/laboratorios/laboratorio.route.js');
const periodos = require('./components/periodos/periodo.route.js');
const grupos = require('./components/grupos/grupo.route.js');
const sedes = require('./components/sedes/sede.route.js');
const solicitudes = require('./components/solicitudes/solicitud.route.js');
const bitacoras = require('./components/bitacoras/bitacora.route.js');


/**
 * Le indicamos que le de acceso externo a las rutas inicializadas
 */
app.use('/api', carreras);
app.use('/api', usuarios);
app.use('/api', cursos);
app.use('/api', laboratorios);
app.use('/api', grupos);
app.use('/api', periodos);
app.use('/api', sedes);
app.use('/api', solicitudes);
app.use('/api', bitacoras);


// Se guarda todo lo que se ha realizado
module.exports = app;

function _server(){
  console.log('Conexión establecida en el puerto ' + port);
};