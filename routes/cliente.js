'use strict'
var express = require('express');
var ClienteController = require('../controllers/cliente');

var api = express.Router();
var md_autenticacion = require('../middlewares/autenticacion');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/cliente' });


api.get('/pruebas-clientes', md_autenticacion.ensureAuth, ClienteController.pruebas);
api.post('/cliente', ClienteController.grabarCliente);
api.get('/obtenerclientes', ClienteController.obtenerClientes);
api.get('/buscarcliente/:id', ClienteController.buscarCliente);
api.put('/actualizacliente/:id', md_autenticacion.ensureAuth, ClienteController.actualizarCliente);
module.exports = api;
