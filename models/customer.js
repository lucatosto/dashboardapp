var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Customer Schema
var CustomerSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	id: {
		type: String
	},
	link: {
		type: String
	}
});

var Customer = module.exports = mongoose.model('Customer', CustomerSchema);

module.exports.createCustomer = function(newCustomer, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getCustomerByUsername = function(name, callback){
	var query = {name: name};
	Customer.findOne(query, callback);
}

module.exports.getCustomerById = function(id, callback){
	Customer.findById(id, callback);
}
