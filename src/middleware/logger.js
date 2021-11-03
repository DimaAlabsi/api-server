'use strict';

function loggerMiddleware(req, res, next) {
    console.log('REQUEST logger : ', req.method, req.path);
    // call next so that the function in the next line can do its work 
    next();
  
  }
  
  module.exports = loggerMiddleware;