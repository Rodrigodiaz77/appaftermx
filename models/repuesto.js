'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RepuestoSchema = Schema({
   descripcion: String

});

module.exports = mongoose.model('Repuesto', RepuestoSchema);
