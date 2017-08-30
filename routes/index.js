var express = require('express');
var router = express.Router();

var Customer = require('../models/customer');

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
  console.log('DASHBOARD: ', value);
	res.render('dashboard', {
		json: value
	});
	next();
});

router.get('/dashboard/:id', function(req, res, value){

	var id = '3';

	console.log(id);
});

module.exports = router;
