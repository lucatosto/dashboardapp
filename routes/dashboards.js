var express = require('express');
var router = express.Router();


router.get('/test', function(req, res, next) {

  res.sendFile(__dirname+'/dashboard.html');
});



router.get('/dashboard', function(req, res, next) {
  var gsjson = require('google-spreadsheet-to-json');

  gsjson({
      spreadsheetId: '1uuscl3dBqKvTFoIdQFCsxTxOp4mY3QLLwobDAQTXplE',
      // other options...
  })
  .then(function(result) {
      console.log(result.length);
      console.log(result);
  })
  .catch(function(err) {
      console.log(err.message);
      console.log(err.stack);
  });
});




module.exports = router;
