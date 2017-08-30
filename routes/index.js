var express = require('express');
var router = express.Router();

var Customer = require('../models/customer');


var mongo = require('mongodb');
var mongoose = require('mongoose');

var uri = 'mongodb://localhost:27017/dashboardapp';
var connection = mongoose.createConnection(uri);

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/customer', function(req, res){
	res.render('customer');
});


router.param(['id'], function (req, res, next, value) {

	Customer.findOne({id: value}, function (err, docs) {
		//console.log('--->\n'+docs);
    console.log(docs);

		res.render('dashboard', {
			json : docs
		});
	});
	next();
});

router.get('/dashboard/:id', function(req, res, value){

});

module.exports = router;
