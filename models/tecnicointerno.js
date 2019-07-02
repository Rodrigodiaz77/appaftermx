
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TecnicoInternoSchema = Schema({
  nombre: String,
  apellidoP: String,
  apelidoM: String,
  rut:String,
  nombrecompleto: String,
  imagen: String

});

module.exports = mongoose.model('TecnicoInterno', TecnicoInternoSchema);
