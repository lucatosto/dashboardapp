var express = require('express');
var router = express.Router();




router.get('/dashboard/:id', function(req, res, next) {
  res.render('dashboard');
});




module.exports = router;
