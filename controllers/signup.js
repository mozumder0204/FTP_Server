var express 		= require('express');
var userModel 		= require.main.require('./model/user-model');
var moderatorModel 	= require.main.require('./model/moderator-model');
var adminModel 		= require.main.require('./model/admin-model');
var router 			= express.Router();

router.get('/', (req, res)=>{
	res.render('signup/index');
});

router.get('/moderator', (req, res)=>{
	res.render('signup/moderator');
});

router.get('/admin', (req, res)=>{
	res.render('signup/admin');
});

router.post('/moderator', (req, res)=>{	

		var user={
			userId 	 : req.body.username,
			password : req.body.password,
			type 	 : "MODERATOR"
		};
		userModel.insert(user, function(success){
			if(success){
				var  moderator ={
					moderatorId			:req.body.username,
					moderatorName 		:req.body.name,
					moderatorEmail 		:req.body.email,
					moderatorAddress	:req.body.address,
					moderatorMobile 	:req.body.mobile,
					moderatorImage		:"/pictures/" + res.req.file.filename
				}; 
				moderatorModel.insert(moderator, function(success){
					if(success){
						res.redirect('/login');
					}
					else{
						res.redirect('/signup/moderator');
					}
				});
			}
			else{
				res.redirect('/signup/moderator');
			}
	});	
});


router.post('/admin', (req, res)=>{	

	var user={
		userId 	 : req.body.username,
		password : req.body.password,
		type 	 : "ADMIN"
	};
	userModel.insert(user, function(success){
		if(success){
			var admin ={
				adminId			:req.body.username,
				adminName 		:req.body.name,
				adminEmail 		:req.body.email,
				adminAddress	:req.body.address,
				adminMobile 	:req.body.mobile,
				adminImage		:"/pictures/" + res.req.file.filename
			}; 
			adminModel.insert(admin, function(success){
				if(success){
					res.redirect('/login');
				}
				else{
					res.redirect('/signup/admin');
				}
			});
		}
		else{
			res.redirect('/signup/admin');
		}
	});	
});









module.exports = router;