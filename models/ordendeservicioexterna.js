'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrdendeServicioExternaSchema = Schema({
  numorden: String,
  estado: String,
  fechacreacion: Date,
  autor: String,
  tipo: String,
  nivel:String,
  itemafectado:String,
  tipotrabajo:String,
  ubicacionllaves:String,
  ambientes:String,
  Tecnico:String,
  fechaejecucion:Date,
  horainicio:Date,
  horatermino:Date,
  serealizacobro:String,
  cargacobroa:String,
  nombrecliente:String,
  descripcionrequerimiento:String,
  idcliente: { type: Schema.ObjectId, ref: 'Cliente' }
  idrequerimiento:  { type: Schema.ObjectId, ref: 'RequerimientoCliente' }
});

module.exports = mongoose.model('RequerimientoCliente', RequerimientoClienteSchema);
