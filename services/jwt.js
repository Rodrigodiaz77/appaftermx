'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'ApxVcbmn980123456789';

exports.createToken = function(usuario){
    var payload = {
      sub: usuario._id,
      nombrecompleto: usuario.nombrecompleto,
      email: usuario.email,
      role: usuario.roles,
      numcelular: usuario.numcelular,
      password: usuario.password,
      tipo: usuario.tipo,
      iat: moment().unix(),
      exp: moment().add(1,'days').unix(),

    };
    return jwt.encode(payload, secret);

};
