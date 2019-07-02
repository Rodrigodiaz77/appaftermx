'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
  nombres: String,
  apellidoP: String,
  apellidoM: String,
  nombrecompleto: String,
  email: String,
  tipo:String,
  tipocuenta:String,
  numcelular:String,
  roles:String,
  password:String,
  image:String,
  idcliente: { type: Schema.ObjectId, ref: 'Cliente' }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
