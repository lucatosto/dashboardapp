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


router.get('/dashboard', function(req, res){
	res.render('dashboard');
});

router.get('/test', function(req, res) {

	res.json({foo:'bar'});
});

module.exports = router;
