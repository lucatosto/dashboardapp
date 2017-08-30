var express = require('express');
var router = express.Router();

var Customer = require('../models/customer');

var mongo = require('mongodb');
var mongoose = require('mongoose');

var uri = 'mongodb://localhost:27017/dashboardapp';
var connection = mongoose.createConnection(uri);

router.post('/addcustomer', function(req, res) {
  	var name = req.body.name;
  	var id = req.body.id;
  	var link = req.body.link;
    var spreadsheet = req.body.spreadsheet;
    var awsbilling = req.body.awsbilling;

  	// Validation
  	req.checkBody('name', 'Name is required').notEmpty();
  	req.checkBody('id', 'ID is required').notEmpty();
  	req.checkBody('link', 'Link is required').notEmpty();
  	req.checkBody('spreadsheet', 'Link Google spreadsheet is required').notEmpty();
  	req.checkBody('awsbilling', 'Link AWS Billing is required').notEmpty();

  	var errors = req.validationErrors();

  	if(errors){
  		res.render('customer',{
  			errors:errors
  		});
  	} else {
  		var newCustomer = new Customer({
  			name: name,
  			id:id,
  			link: link,
        spreadsheet: spreadsheet,
        awsbilling: awsbilling
  		});

  		Customer.createCustomer(newCustomer, function(err, customer){
  			if(err) throw err;
  			console.log(customer);
  		});

  		req.flash('success_msg', 'Added Customer');

  		res.redirect('/customer');
  	}
  });

router.delete('/deletecustomer/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('customerlist');
    var customerToDelete = req.params.id;
    collection.remove({ '_id' : customerToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/listallcustomers', function(req, res, next) {
  Customer.find(function (err, docs) {
		if (err) {
				res.send(err);
		}
		res.json(docs);
		console.log('--->\n'+docs);
	});
});


module.exports = router;
