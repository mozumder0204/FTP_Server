var express 		= require('express');
var userModel 		= require.main.require('./model/user-model');
var moderatorModel 	= require.main.require('./model/moderator-model');
var memberModel 	= require.main.require('./model/member-model');
var moderatorModel 	= require.main.require('./model/moderator-model');
var requestModel	=require.main.require('./model/request-model');
var router 			= express.Router();
var formidable	    = require('formidable');
var fs 				= require('fs');
var path			= require('path');

// ********************************************
// *************Index************************

router.get('*', function(req, res, next){
    if(req.session.uId != null){
        next();
    }else{
        res.redirect('/login');
    }
});

router.get('/', (req, res)=>{
    var user = {
        userId: req.session.uId
    };
    moderatorModel.get(req.session.uId, function(result){
		res.render('moderator/index', result[0]);	
	});	
});	
//********************************************
// *************Profile************************
router.get('/profile', (req, res)=>{

	moderatorModel.get(req.session.uId, function(result){
		res.render('moderator/profile', result[0]);	
	});	
});

// ********************************************
// *************Change Password************************
router.get('/changePassword', (req, res)=>{
	moderatorModel.get(req.session.uId, function(result){
		res.render('moderator/changePassword', result[0]);	
	});	
});

router.post('/changePassword', (req, res)=>{
	var user ={
		userId : req.session.uId,
		password : req.body.oldPassword
	};

	userModel.validate(user, function(result){
		if(result.length > 0){
			if(result[0].U_TYPE == "MODERATOR" && result[0].STATUS == "ACTIVE")
			{
				if(req.body.newPassword == req.body.conPassword){
					var updateUser={
						userId : req.session.uId,
						password : req.body.newPassword,
						type : "MODERATOR",
						status : "ACTIVE"
                    };
					userModel.update(updateUser, function(success){
						if(success){
							res.redirect('/logout');
						}else{
							res.redirect("/moderator/changePassword");
						}
					});
				}
			}
		}else{
			res.redirect("/moderator/changePassword");
		}
	});
});	
// ********************************************
// *************Edit Profile************************
router.get('/editProfile', (req, res)=>{

	moderatorModel.get(req.session.uId, function(result){
		res.render('moderator/editProfile', result[0]);	
	});	
});

router.post('/editProfile', (req, res)=>{
	var update ={
		moderatorId 		: req.session.uId,
		moderatorName 	    : req.body.moderatorName,
		moderatorEmail 	    : req.body.moderatorEmail,
		moderatorMobile 	: req.body.moderatorMobile,
		moderatorAddress	: req.body.moderatorAddress,
	};
	moderatorModel.update(update, function(success){
		if(success){
			moderatorModel.get(req.session.uId, function(result){
				res.redirect('/moderator/profile');	
			});	
		}else{
			res.redirect('/moderator/editProfile');
		}
	});
});	
// ********************************************
// *************Edit Picture************************
router.get('/editPicture', (req, res)=>{

	moderatorModel.get(req.session.uId, function(result){
		res.render('moderator/editPicture', result[0]);	
	});	
});
router.post('/editPicture', (req, res)=>{
	var update2 ={
		moderatorId 		: req.session.uId,
		moderatorImage	    :"/pictures/" + res.req.file.filename
	};
	moderatorModel.pictureedit(update2, function(success){
		if(success){
			res.redirect('/moderator/profile');
		}else{
			res.redirect('/moderator/editPicture');
		}
	});
});	
// ********************************************
// *************Request Box************************
router.get('/requestBox', (req, res)=>{

	requestModel.getAll(function(result){
		if(result.length >0){
			var results = {
				qList : result
			}
			res.render('moderator/request', results);	
		}else{
			var results = {
				qList : ""
			}
			res.render('moderator/request', results);	
		}
	});	
});

router.get('/requestBox/:id', (req, res)=>{

	requestModel.delete(req.params.id,function(success){

		if(success){
			requestModel.getAll(function(result){
				if(result.length >0){
					var results = {
						qList : result
					}
					res.render('moderator/request', results);	
				}else{
					var results = {
						qList : ""
					}
					res.render('moderator/request', results);	
				}
			});	
		 }
		 else{
			res.render('/moderator');
		}
	});	
});
	
// ********************************************
// *************View Content*******************
router.get('/viewContent', (req, res)=>{

	fs.readdir('./data/', function(err, items) {
		console.log(items);
		Object.assign({}, items);
		var item={
			qList:items
		}
		res.render('moderator/viewContent' , item);

	});

});
// ********************************************
// *************Upload Content*******************
router.get('/uploadContent', (req, res)=>{
	res.render('moderator/uploadContent');	
	});
	
router.post('/uploadContent', (req, res)=>{

		var form = new formidable.IncomingForm();
		form.parse(req);
		form.on('fileBegin', function (name, file){
			file.path = path.join(__dirname, '../data/', file.name)
		});
		form.on('file', function (name, file){
			console.log('Uploaded ' + file.name);
		});
		res.redirect('/moderator');
		
	});
// ********************************************
// *************Delete Content*******************
router.get('/deleteContent', (req, res)=>{

	fs.readdir('./data/', function(err, items) {
		Object.assign({}, items);
		var item={
			qList:items
		}
		res.render('moderator/deleteContent' , item);
	});
});

router.get('/deleteContent/:name', (req, res)=>{

	fs.unlinkSync('./data/'+req.params.name);
	fs.readdir('./data/', function(err, items) {
		Object.assign({}, items);
		var item={
			qList:items
		}
		res.render('moderator/deleteContent' , item);
	});

});
// ********************************************

module.exports = router;


