'use strict'
//carga de modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require ('fs');
var path = require('path');


//carga de modelos

var Usuario = require('../models/usuario');

//Servicio jwt
var jwt = require('../services/jwt');


//acciones

function pruebas(req, res){
    res.status(200).send({
        message: 'probando el controlador de usuarios y la acción pruebas',
        usuario: req.usuario
    });

}

function guardarUsuario(req, res){
    //Crear el objeto del usuario
      var usuario = new Usuario();

    //Recoger Parámetros de la petición
      var params = req.body;

      if (params.password && params.nombres && params.apellidoP && params.apellidoM && params.email){
          //asignar valores al objeto de usuario
            usuario.nombres = params.nombres;
            usuario.apellidoP = params.apellidoP;
            usuario.apellidoM = params.apellidoM;
            usuario.nombrecompleto = params.apellidoP+" "+ params.apellidoM + " "+params.nombres;
            usuario.email = params.email;
            usuario.numcelular = params.numceluar;
            usuario.tipo = params.tipo;
            usuario.tipocuenta = params.tipocuenta;
            usuario.roles = params.roles;
            usuario.idcliente = params.idcliente;

            Usuario.findOne({email: params.email.toLowerCase()},(err, issetusuario) => {
                   if(err){
                       res.status(404).send({message:'Error al comprobar el usuario'});
                   }else{
                        if(!issetusuario){
                              //Cifrar la contraseña
                              bcrypt.hash(params.password, null, null, function(err, hash){
                                      usuario.password = hash;
                                      //Guardar usuario en la BD
                                      usuario.save((err, userStored) => {
                                            if (err){
                                                  res.status(404).send({message:'Error al guardar el usuario'});
                                            }else{
                                                if(!userStored){
                                                    res.status(404).send({message:'No se ha registrado el usuario'});
                                                }else{
                                                    res.status(200).send({usuario: userStored});

                                                }

                                            }

                                      });
                              });
                        }else{
                            res.status(404).send({
                                message: 'El usuario no puede registrarse porque ya existe...'
                            });
                        }

                   }
            });


      }else{
        res.status(404).send({
            message: 'Introduce todos los datos correctamente para poder registrar al usuario...'
        });
      }

}


function login(req, res){

  //Crear el objeto del usuario
    var usuario = new Usuario();

    var params = req.body;
    var email = params.email;
    var password = params.password;

      //issetusuario

    Usuario.findOne({email: email.toLowerCase()},(err, usuario) => {
           if(err){
               res.status(500).send({message:'Error al comprobar el usuario'});
           }else{
                if(usuario){
                    bcrypt.compare(password, usuario.password, (err, check) => {
                        if(check){

                            if(params.gettoken){
                                //Devolver token
                                  res.status(200).send({
                                      token: jwt.createToken(usuario)
                                  });
                            }else{
                                  res.status(200).send({usuario});
                            }

                        }else{
                            res.status(404).send({ message: 'El usuario no ha podido loguearse correctamente...'});
                        }

                    });

                }else{
                      res.status(404).send({ message: 'El usuario no ha podido loguearse...'});
                }

           }
    });


}


function actualizarUsuario(req, res){

      var userId = req.params.id;
      var update = req.body;    //datos a modificar

      if(userId != req.usuario.sub){

          return res.status(500).send({message:'No tiene permisos para actualizar el usuario...'});
      }

      Usuario.findByIdAndUpdate(userId, update, {new:true}, (err, usuarioUpdate) => {
            if(err){
                res.status(500).send({
                   message: 'Error al actualizar el usuario....'
                });
            }else{
                if(!usuarioUpdate){
                    res.status(404).send({
                       message: 'No se ha podido actualizar el usuario....'
                    });
                }else{
                    res.status(200).send({usuario: usuarioUpdate});
                }

            }

      });

}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files){
          var file_path = req.files.image.path;
          var file_split = file_path.split('\\'); //extra el nombre del archivo
          //var file_split = file_path.split('/'); //extra el nombre del archivo

          var largofile_split =  file_split.length;
          var file_name = file_split[2];

          //res.status(200).send({
          //  file_path: file_path,
          //  file_split: file_split,
          //  largofile_split:largofile_split,
          //    file_name: file_name
          //  });

          if (largofile_split == 1 ){  // es porque el separador de carpetas del S.O. no es ('\\')
             file_split = file_path.split('/'); //extra el nombre del archivo
             file_name = file_split[2];
          }


          var ext_split = file_name.split('\.'); //extra la extención del archivo
          var file_ext = ext_split[1];

          //res.status(200).send({
          //  file_path: file_path,
          //  file_split: file_split,
          //  file_name: file_name,
          //  ext_split: ext_split,
          //  file_ext: file_ext
          //});

          if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

                   if(userId != req.usuario.sub){

                        return res.status(500).send({message:'No tiene permisos para actualizar el usuario...'});
                    }

                    Usuario.findByIdAndUpdate(userId, {image: file_name}, {new:true}, (err, usuarioUpdate) => {
                          if(err){
                              res.status(500).send({
                                 message: 'Error al actualizar el usuario....'
                              });
                          }else{
                              if(!usuarioUpdate){
                                  res.status(404).send({
                                     message: 'No se ha podido actualizar el usuario....'
                                  });
                              }else{
                                  res.status(200).send({usuario: usuarioUpdate, image: file_name});
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

function getImageFile(req, res){
      var imageFile = req.params.imageFile;
      var path_file = './uploads/usuarios/'+imageFile;

      fs.exists(path_file, function(exists){
            if(exists){
                res.sendFile(path.resolve(path_file));
            }else{
                res.status(404).send({message:'La imagen no existe...'});
            }
      });
}

function ObtenerUsuarios(req, res){

      Usuario.find({roles: 'ROLE_USER'}).exec((err, issetusuario) => {
          if(err){
                res.status(500).send({message:'Error en la petición....'});
          }else{
              if(!issetusuario){
                    res.status(404).send({message:'No hay Usuarios...'});
              }else{
                    res.status(200).send({issetusuario});
              }
          }
      });
}

function getUsuario(req, res){
  var usuarioId = req.params.id;

   Usuario.findById(usuarioId).populate({path: 'idusuario'}).exec((err,issetusuario) =>  {
     if(err){
           res.status(500).send({message:'Error en la petición....'});
     }else{
         if(!issetusuario){
               res.status(404).send({message:'No existen Usuarios...'});
         }else{
               res.status(200).send({issetusuario});
         }
     }

   });


}

module.exports={
   pruebas,
   guardarUsuario,
   login,
   actualizarUsuario,
   uploadImage,
   getImageFile,
   ObtenerUsuarios,
   getUsuario

};
