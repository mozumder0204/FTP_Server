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


 
//joining path of directory 
const directoryPath = path.join('./data');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
 
        //res.render('member/index' , file);

    });
});


		//res.render('member/index');	
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


