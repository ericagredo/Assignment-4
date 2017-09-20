
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');


exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }

  listing.save(function(error) {
    if(error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      res.json(listing);
    }
  });
};


exports.read = function(req, res) {

  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;



  listing.name = req.body.name;
  listing.code = req.body.code;
  listing.address = req.body.address;

  
  if(req.results){
    listing.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

 
  listing.save(function(error){
    if(error){
      console.log(error);
      res.status(400).send(error);
    }
    else{
      res.json(listing);
    }
  });
};


exports.delete = function(req, res) {
  var listing = req.listing;


  listing.remove(function(error){
    if(error){
      console.log(error);
      res.status(400).send(error);
    }
    else{
      res.json(listing);
    }
  });
};


exports.list = function(req, res) {

   Listing.find().sort('code').exec(function(error, listings) {
    if(error) {
      res.status(400).send(error);
    } else {
      res.json(listings);
    }
  });
};


exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(error, listing) {
    if(error) {
      res.status(400).send(error);
    } else {
      req.listing = listing;
      next();
    }
  });
};