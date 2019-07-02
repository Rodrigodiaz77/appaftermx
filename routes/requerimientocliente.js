'use strict'
var express = require('express');
var ReqClienteController = require('../controllers/requerimientocliente');

var api = express.Router();
var md_autenticacion = require('../middlewares/autenticacion');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/reqclientes' });


//api.get('/pruebas-clientes', md_autenticacion.ensureAuth, ReqClienteController.pruebas);
api.post('/reqcliente', ReqClienteController.GrabarReqCliente);
//api.get('/obtenerclientes', ReqClienteController.obtenerClientes);
//api.get('/buscarcliente/:id', ReqClienteController.buscarCliente);
//sapi.put('/actualizacliente/:id', md_autenticacion.ensureAuth, ReqClienteController.actualizarCliente);
api.post('/upload-imagen-reqcliente/:id', [md_autenticacion.ensureAuth, md_upload], ReqClienteController.uploadImage);
api.post('/upload-imagen2-reqcliente/:id', [md_autenticacion.ensureAuth, md_upload], ReqClienteController.uploadImage2);
api.post('/upload-imagen3-reqcliente/:id', [md_autenticacion.ensureAuth, md_upload], ReqClienteController.uploadImage3);
api.get('/get-image-reqcliente/:imageFile', ReqClienteController.getImageFileReq);
api.get('/Listarequerimientosxid/:id', ReqClienteController.BuscaRequerimientosXID);
api.get('/Listarequerimientoscerradosxid/:id', ReqClienteController.BuscaRequerimientosCerradosXID);
api.get('/Listarequerimientosaprocesar', ReqClienteController.BuscaTodoslosRequerimientos);
api.get('/Visualizarequerimientocliente/:id', ReqClienteController.BuscaReqClienteXID);

module.exports = api;
