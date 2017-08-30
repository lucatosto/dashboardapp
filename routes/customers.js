var express = require('express');
var router = express.Router();


var Customer = require('../models/customer');



 /*
  * GET userlist.
  */
 router.get('/customerlist', function(req, res) {
     var db = req.db;
     var collection = db.get('customerlist');
     collection.find({},{},function(e,docs){
         res.json(docs);
     });
 });

/*
 * POST to adduser.
 */
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


/*
 * DELETE to deleteuser.
 */
router.delete('/deletecustomer/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('customerlist');
    var customerToDelete = req.params.id;
    collection.remove({ '_id' : customerToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
