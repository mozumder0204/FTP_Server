var express 		= require('express');
var userModel 		= require.main.require('./model/user-model');
var moderatorModel 	= require.main.require('./model/moderator-model');
var memberModel 	= require.main.require('./model/member-model');
var adminModel 	    = require.main.require('./model/admin-model');
var requestModel 	= require.main.require('./model/request-model');
var router 			= express.Router();
var fs              = require('fs');
var path            = require('path');
var http            = require('http');


// ********************************************
// *************Index************************

router.get('/', (req, res)=>{


    fs.readdir('./data/', function(err, items) {
		Object.assign({}, items);
		var item={
			qList:items
		}
		res.render('member/index' , item);
	});
});	
//********************************************
// *************Request************************

router.get('/request', (req, res)=>{
		res.render('member/request');	
});	
router.post('/request', (req, res)=>{
    var info = {
        time    : new Date(),
        text    : req.body.requestText
    }
    requestModel.insert(info, function(success){
        if(success){
            res.redirect('/');
        }
        else{
            res.redirect('/member/request');
        }
    });
});	
//********************************************
// *************Download************************
router.get('/download/:name', (req, res)=>{
    
    var file = './data/' + req.params.name;

    var filename = path.basename(file);

  
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);

  
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});
//********************************************
// *************Search************************
router.get('/search', (req, res)=>{
    res.render('member/search');
});	

router.get('/searchFile/:name', (req, res)=>{

    fs.readdir('./data/', function(err, items) {
		Object.assign({}, items);

        for(var i=0; i<items.length; i++){
            if(items[i] == req.params.name){
                res.send(items[i]);
            }
            else{
                res.send();
            }
        }

	});
    
});	



module.exports = router;


