'use strict'
//carga de modulos

var fs = require ('fs');
var path = require('path');


//carga de modelos

var Usuario = require('../models/usuario');
var Cliente = require('../models/cliente');


//acciones

function pruebas(req, res){
    res.status(200).send({
        message: 'probando el controlador de clientes y la acción pruebas...',
        usuario: req.usuario
    });

}

function grabarCliente (req, res){
      //Crear el objeto del cliente
      var cliente = new Cliente();

      //Recoger Parámetros de la petición
          var params = req.body;


      if (params.nombres || params.apellidoP || params.apelidoM ){
              cliente.nombres = params.nombres;
              cliente.apellidoP = params.apellidoP;
              cliente.apellidoM = params.apellidoM;
              cliente.rut_pasaporte = params.rut_pasaporte;
              cliente.nombrecompleto = params.apellidoP+" "+params.apellidoM+" "+params.nombres;
              cliente.direccion = params.direccion;
              cliente.comuna = params.comuna;
              cliente.ciudad = params.ciudad;
              cliente.email = params.email;
              cliente.numceluar = params.numceluar;
              cliente.cuentamadre = params.cuentamadre;
              cliente.corporacion = params.corporacion;
              //cliente.idusuario = req.usuario.sub;
              cliente.latitud = params.latitud;
              cliente.longitud = params.longitud;

              cliente.save((err, clienteStored) => {

                    if (err){
                        res.status(500).send({message: 'Error en el servidor..' });

                    }else{
                        if(!clienteStored){
                            res.status(404).send({message: 'No se ha guardado el cliente....' });
                        }else{
                            res.status(200).send({cliente: clienteStored });
                        }

                    }
              });
      }else{
          res.status(200).send({message: 'El nombre, apellido Paterno y apellido Materno del cliente son  obligatorios....' });
      }
}

function obtenerClientes(req, res){

      Cliente.find({}).populate({path: 'idusuario'}).exec((err, clienteStored) => {
            if(err){
                res.status(500).send({
                    message: 'Error en la petición....'
                });
            }else{
                if(!clienteStored){
                    res.status(404).send({
                        message: 'No hay Clientes....'
                    });
                }else{
                    res.status(200).send({
                        clienteStored
                    });
                }
            }
      });


}

function buscarCliente(req, res){
  var clienteId = req.params.id;

  Cliente.findById(clienteId).populate({path:'idusuario'}).exec((err, clienteStored) => {
        if(err){
            res.status(500).send({
                message: 'Error en la petición....'
            });
        }else{
            if(!clienteStored){
                res.status(404).send({
                    message: 'El cliente no existe....'
                });
            }else{
                res.status(200).send({
                    clienteStored
                });
            }
        }
  });

}

function actualizarCliente(req, res){
    var clienteId = req.params.id;
    var update = req.body

    Cliente.findByIdAndUpdate(clienteId,update, {new:true}, (err, clienteUpdate) => {
          if(err){
              res.status(500).send({
                  message: 'Error en la petición....'
              });
          }else{
              if(!clienteUpdate){
                  res.status(404).send({
                      message: 'No se ha actualizado el cliente....'
                  });
              }else{
                  res.status(200).send({
                      clienteUpdate
                  });
              }
          }
    });

}

function eliminarCliente(req, res){
    var clienteId = req.params.id;

    Cliente.findByIdAndRemove(clienteId, (err, clienteRemove) => {
          if(err){
              res.status(500).send({
                  message: 'Error en la petición....'
              });
          }else{
              if(!clienteRemove){
                  res.status(404).send({
                      message: 'No se ha podido borrar el cliente....'
                  });
              }else{
                  res.status(200).send({
                      clienteRemove
                  });
              }
          }
    });

}


module.exports = {
    pruebas,
    grabarCliente,
    obtenerClientes,
    buscarCliente,
    actualizarCliente
};
