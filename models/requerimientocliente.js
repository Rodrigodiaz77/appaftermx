'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequerimientoClienteSchema = Schema({
  tiporeqcliente: String,
  numrequerimiento: String,
  estado: String,
  fechacreacion: String,
  horacreacion: String,
  tiporequerimiento: String,
  descripcionrequerimiento:String,
  imagen1: String,
  imagen2:String,
  imagen3:String,
  fechavisita:String,
  horavisita: String,
  id_cliente: { type: Schema.ObjectId, ref: 'Cliente' },
  id_usuario: { type: Schema.ObjectId, ref: 'Usuario' },

});

module.exports = mongoose.model('RequerimientoCliente', RequerimientoClienteSchema);
