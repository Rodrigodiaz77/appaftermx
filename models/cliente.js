'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
  nombres: String,
  apellidoP: String,
  apellidoM: String,
  rut_pasaporte:String,
  nombrecompleto: String,
  direccion: String,
  num_direccion: String,
  num_depto_casa: String,
  comuna: String,
  ciudad: String,
  email: String,
  numceluar:String,
  cuentamadre: String,
  corporacion: String,
  latitud: Number,
  longitud: Number,
  //geolocalizaion: { type: "Point", coordinates: [ 40, 5 ] },
  idusuario: { type: Schema.ObjectId, ref: 'Usuario' }

});

module.exports = mongoose.model('Cliente', ClienteSchema);
