'use strict'
//carga de modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require ('fs');
var path = require('path');


//carga de modelos
//var Usuario = require('../models/usuario');
//var Cliente = require('../models/cliente');

var RqCliente = require('../models/requerimientocliente');

//Servicio jwt
var jwt = require('../services/jwt');

//acciones

function pruebasreqcliente(req, res){
    res.status(200).send({
        message: 'probando el controlador de clientes y la acción pruebas...',
        usuario: req.usuario
    });

}

function GrabarReqCliente (req, res){
      //Crear el objeto del cliente
      var requirimientocliente = new RqCliente();

      //Recoger Parámetros de la petición
          var params = req.body;


      if (params.tiporeqcliente || params.tiporequerimiento || params.fechavisita ){

              requirimientocliente.tiporeqcliente = params.tiporeqcliente;
              requirimientocliente.numrequerimiento = params.numrequerimiento;
              requirimientocliente.estado = params.estado;
              requirimientocliente.fechacreacion = params.fechacreacion;
              requirimientocliente.horacreacion = params.horacreacion;
              requirimientocliente.tiporequerimiento = params.tiporequerimiento;
              requirimientocliente.descripcionrequerimiento = params.descriprequerimiento;
              requirimientocliente.imagen1 = params.imagen1;
              requirimientocliente.imagen2 = params.imagen2;
              requirimientocliente.imagen3 = params.imagen3;
              requirimientocliente.fechavisita = params.fechavisita;
              requirimientocliente.horavisita = params.horavisita;
              requirimientocliente.id_cliente = params.id_cliente;
              requirimientocliente.id_usuario = params.id_usuario;

              requirimientocliente.save((err, rqclienteStored) => {

                    if (err){
                        res.status(500).send({message: 'Error en el servidor..' });

                    }else{
                        if(!rqclienteStored){
                            res.status(404).send({message: 'No se ha guardado el requerimiento del cliente....' });
                        }else{
                            res.status(200).send({requirimientocliente: rqclienteStored });
                        }

                    }
              });
      }else{
          res.status(200).send({message: 'El tipo requerimento de cliente, tipo y fecha de visita del requerimiento de cliente son  obligatorios....' });
      }
}

function getImageFileReq(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/reqclientes/'+imageFile;

    fs.exists(path_file, function(exists){
          if(exists){
              res.sendFile(path.resolve(path_file));
          }else{
              res.status(404).send({message:'La imagen no existe...'});
          }
    });
}

function uploadImage(req, res){
    var ReqclienteId = req.params.id;
    var file_name = 'No subido...';

    if (req.files){
          var file_path = req.files.imagen1.path;
          var file_split = file_path.split('\\');
          var largofile_split =  file_split.length;
          var file_name = file_split[2];

          if (largofile_split == 1 ){  // es porque el separador de carpetas del S.O. no es ('\\')
             file_split = file_path.split('/'); //extrae el nombre del archivo
             file_name = file_split[2];
          }

          var ext_split = file_name.split('\.');
          var file_ext = ext_split[1];

          if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

                   //if(userId != req.usuario.sub){

                  //      return res.status(500).send({message:'No tiene permisos para actualizar el usuario...'});
                  //  }

                    RqCliente.findByIdAndUpdate(ReqclienteId, {imagen1: file_name}, {new:true}, (err, reqclienteUpdate) => {
                          if(err){
                              res.status(500).send({
                                 message: 'Error al actualizar el requerimiento del cliente....'
                              });
                          }else{
                              if(!reqclienteUpdate){
                                  res.status(404).send({
                                     message: 'No se ha podido actualizar el requerimiento del cliente....'
                                  });
                              }else{
                                  res.status(200).send({reqclien: reqclienteUpdate, imagen1: file_name});
                              }

                          }

                    });

          }else{

              fs.unlink(file_path, (err) => {
                    if(err){
                         res.status(200).send({message:'Extensión no valida y fichero no borrado'});
                    }else{
                         res.status(200).send({message:'Extensión no valida'});
                    }
              });

          }

    }else{
         res.status(200).send({message:'No se han subido archivos...'});
    }

}

function uploadImage2(req, res){
    var ReqclienteId = req.params.id;
    var file_name = 'No subido...';

    if (req.files){
          var file_path = req.files.imagen2.path;
          var file_split = file_path.split('\\');
          var largofile_split =  file_split.length;
          var file_name = file_split[2];

          if (largofile_split == 1 ){  // es porque el separador de carpetas del S.O. no es ('\\')
             file_split = file_path.split('/'); //extrae el nombre del archivo
             file_name = file_split[2];
          }

          var ext_split = file_name.split('\.');
          var file_ext = ext_split[1];

          if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

                   //if(userId != req.usuario.sub){

                  //      return res.status(500).send({message:'No tiene permisos para actualizar el usuario...'});
                  //  }

                    RqCliente.findByIdAndUpdate(ReqclienteId, {imagen2: file_name}, {new:true}, (err, reqclienteUpdate) => {
                          if(err){
                              res.status(500).send({
                                 message: 'Error al actualizar el requerimiento del cliente....'
                              });
                          }else{
                              if(!reqclienteUpdate){
                                  res.status(404).send({
                                     message: 'No se ha podido actualizar el requerimiento del cliente....'
                                  });
                              }else{
                                  res.status(200).send({reqclien: reqclienteUpdate, imagen2: file_name});
                              }

                          }

                    });

          }else{

              fs.unlink(file_path, (err) => {
                    if(err){
                         res.status(200).send({message:'Extensión no valida y fichero no borrado'});
                    }else{
                         res.status(200).send({message:'Extensión no valida'});
                    }
              });

          }

    }else{
         res.status(200).send({message:'No se han subido archivos...'});
    }

}


function uploadImage3(req, res){
    var ReqclienteId = req.params.id;
    var file_name = 'No subido...';

    if (req.files){
          var file_path = req.files.imagen3.path;
          var file_split = file_path.split('\\');
          var largofile_split =  file_split.length;
          var file_name = file_split[2];

          if (largofile_split == 1 ){  // es porque el separador de carpetas del S.O. no es ('\\')
             file_split = file_path.split('/'); //extrae el nombre del archivo
             file_name = file_split[2];
          }

          var ext_split = file_name.split('\.');
          var file_ext = ext_split[1];

          if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

                   //if(userId != req.usuario.sub){

                  //      return res.status(500).send({message:'No tiene permisos para actualizar el usuario...'});
                  //  }

                    RqCliente.findByIdAndUpdate(ReqclienteId, {imagen3: file_name}, {new:true}, (err, reqclienteUpdate) => {
                          if(err){
                              res.status(500).send({
                                 message: 'Error al actualizar el requerimiento del cliente....'
                              });
                          }else{
                              if(!reqclienteUpdate){
                                  res.status(404).send({
                                     message: 'No se ha podido actualizar el requerimiento del cliente....'
                                  });
                              }else{
                                  res.status(200).send({reqclien: reqclienteUpdate, imagen3: file_name});
                              }

                          }

                    });

          }else{

              fs.unlink(file_path, (err) => {
                    if(err){
                         res.status(200).send({message:'Extensión no valida y fichero no borrado'});
                    }else{
                         res.status(200).send({message:'Extensión no valida'});
                    }
              });

          }

    }else{
         res.status(200).send({message:'No se han subido archivos...'});
    }

}





function BuscaRequerimientosXID(req, res){
  var requerimientoId = req.params.id;

    //res.status(200).send({requerimientoId: requerimientoId});

    RqCliente.find({id_cliente: requerimientoId},{tiporeqcliente:0,imagen1:0,imagen2:0,imagen3:0,horacreacion:0,id_cliente:0,id_usuario:0}).exec((err, listareqStored) => {
        if(err){
              res.status(500).send({message:'Error en la petición....'});
        }else{
            if(!listareqStored){
                  res.status(404).send({message:'No existen requerimientos...'});
            }else{
                  res.status(200).send({listareqStored});
            }
        }
    });


}


function BuscaReqClienteXID(req, res){
  var requerimientoId = req.params.id;

    //res.status(200).send({requerimientoId: requerimientoId});

    RqCliente.findById(requerimientoId).exec((err, listareqStored) => {
        if(err){
              res.status(500).send({message:'Error en la petición....'});
        }else{
            if(!listareqStored){
                  res.status(404).send({message:'No existen requerimientos...'});
            }else{
                  res.status(200).send({listareqStored});
            }
        }
    });


}

function BuscaRequerimientosCerradosXID(req, res){
  var requerimientoId = req.params.id;

    //res.status(200).send({requerimientoId: requerimientoId});

    RqCliente.find({id_cliente: requerimientoId, estado: 'Cerrado'},{_id:0,tiporeqcliente:0,imagen1:0,imagen2:0,imagen3:0,horacreacion:0,id_cliente:0,id_usuario:0}).exec((err, listareqCloseStored) => {
        if(err){
              res.status(500).send({message:'Error en la petición....'});
        }else{
            if(!listareqCloseStored){
                  res.status(404).send({message:'No existen requerimientos...'});
            }else{
                  res.status(200).send({listareqCloseStored});
            }
        }
    });


}

function BuscaTodoslosRequerimientos(req, res){
  //var requerimientoId = req.params.id;

    //res.status(200).send({requerimientoId: requerimientoId});

    RqCliente.find({ estado: { $ne: 'Cerrado' }},{_id:0,tiporeqcliente:0,imagen1:0,imagen2:0,imagen3:0,horacreacion:0,id_cliente:0,id_usuario:0}).exec((err, listareqOpenStored) => {
        if(err){
              res.status(500).send({message:'Error en la petición....'});
        }else{
            if(!listareqOpenStored){
                  res.status(404).send({message:'No existen requerimientos...'});
            }else{
                  res.status(200).send({listareqOpenStored});
            }
        }
    });


}



module.exports = {
    pruebasreqcliente,
    GrabarReqCliente,
    uploadImage,
    uploadImage2,
    uploadImage3,
    BuscaRequerimientosXID,
    BuscaRequerimientosCerradosXID,
    BuscaTodoslosRequerimientos,
    BuscaReqClienteXID,
    getImageFileReq

};
