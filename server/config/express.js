var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'), 
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

 
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });
  app.use("/", express.static("client"));
  app.use("/api/listings", listingsRouter);
  app.use("/*", function(req, res){
    res.redirect("/");
  })

  return app;
};  