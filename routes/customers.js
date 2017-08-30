var express = require('express');
var router = express.Router();




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
    var db = req.db;
    var collection = db.get('customerlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
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
