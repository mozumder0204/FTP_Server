var express 		= require('express');
var userModel 		= require.main.require('./model/user-model');
var moderatorModel 	= require.main.require('./model/moderator-model');
var memberModel 	= require.main.require('./model/member-model');
var adminModel 	    = require.main.require('./model/admin-model');
var requestModel 	= require.main.require('./model/request-model');
var router 			= express.Router();
var fs = require('fs');
var path = require('path');


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





module.exports = router;


