'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://user:pw@host1.com:27017/dbname', { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/aftermitani', { useNewUrlParser: true }, (err,res) => {

      if (err){
         throw err;

      }else{
          console.log("la conexión a la base de datos está funcionando correctamente....");

          app.listen(port,() => {
              console.log("El servidor con Node y Express está corriendo correctamente...");

          });
      }

});
