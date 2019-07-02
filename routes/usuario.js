'use strict'
var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_autenticacion = require('../middlewares/autenticacion');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/usuarios' });


api.get('/pruebas-del-controlador', md_autenticacion.ensureAuth, UsuarioController.pruebas);
api.post('/registrarusuario', UsuarioController.guardarUsuario);
api.post('/login', UsuarioController.login);
api.put('/actualizausuario/:id', md_autenticacion.ensureAuth, UsuarioController.actualizarUsuario);
api.post('/upload-imagen-usuario/:id', [md_autenticacion.ensureAuth, md_upload], UsuarioController.uploadImage);
api.get('/get-image-file/:imageFile', UsuarioController.getImageFile);
api.get('/Listadousuarios', UsuarioController.ObtenerUsuarios);
api.get('/Listausuario/:id', UsuarioController.getUsuario);

module.exports = api;
