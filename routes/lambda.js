router.param(['nomeparametro'], function (req, res, next, value) {

	Customer.findOne({id: value}, function (err, docs) {
		//console.log('--->\n'+docs);
    //console.log(docs.spreadsheet);

		gsjson({
  		//spreadsheetId: docs.spreadsheetId
      spreadsheetId: docs.spreadsheetID,

      worksheet: 1
      // other options...
		})
		.then(function(result) {
	    console.log(result.length);
			console.log(result);

			//example to remove
	    console.log(result[2].toBe);
		})
		.catch(function(err) {
		   console.log(err.message);
		  console.log(err.stack);
		});

    //CONFRONTO E INVIO MAIL SE NECESSARIO

    if(1>2){
      const nodemailer = require('nodemailer');


      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'mailfrom@gmail.local',
          pass: 'password'
        }
      });

      var mailOptions = {
        from: 'mailfrom@gmail.local',
        to: 'mailto@gmail.local',
        subject: 'Test email nodejs',
        //text: 'Oh oh' //plaintext
        html: '<b>Oh Oh</b>'  html
      };


      transporter.sendMail(mailOptions, function(error, info){
        if(error) {
          console.log(error);
        }else{
          console.log('Email send: ' + info.response);
        }
      });
    }
    else{
      console.log("OK");
    }



);


	});
	next();
});

router.get('/lambda/:nomeparametro', function(req, res, value){

});


module.exports = router;
