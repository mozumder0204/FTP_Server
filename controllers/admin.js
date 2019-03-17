var express 		= require('express');
var userModel 		= require.main.require('./model/user-model');
var moderatorModel 	= require.main.require('./model/moderator-model');
var memberModel 	= require.main.require('./model/member-model');
var adminModel 	    = require.main.require('./model/admin-model');
var router 			= express.Router();

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
    adminModel.get(req.session.uId, function(result){
		res.render('admin/index', result[0]);	
	});	
});	
//********************************************
// *************Profile************************
router.get('/profile', (req, res)=>{

	adminModel.get(req.session.uId, function(result){
		res.render('admin/profile', result[0]);	
	});	
});

// ********************************************
// *************Change Password************************
router.get('/changePassword', (req, res)=>{
	adminModel.get(req.session.uId, function(result){
		res.render('admin/changePassword', result[0]);	
	});	
});

router.post('/changePassword', (req, res)=>{
	var user ={
		userId : req.session.uId,
		password : req.body.oldPassword
	};

	userModel.validate(user, function(result){
		if(result.length > 0){
			if(result[0].U_TYPE == "ADMIN" && result[0].STATUS == "ACTIVE")
			{
				if(req.body.newPassword == req.body.conPassword){
					var updateUser={
						userId : req.session.uId,
						password : req.body.newPassword,
						type : "ADMIN",
						status : "ACTIVE"
                    };
					userModel.update(updateUser, function(success){
						if(success){
							res.redirect('/logout');
						}else{
							res.redirect("/admin/changePassword");
						}
					});
				}
			}
		}else{
			res.redirect("/admin/changePassword");
		}
	});
});	
// ********************************************
// *************Edit Profile************************
router.get('/editProfile', (req, res)=>{

	adminModel.get(req.session.uId, function(result){
		res.render('admin/editProfile', result[0]);	
	});	
});

router.post('/editProfile', (req, res)=>{
	var update ={
		adminId 		: req.session.uId,
		adminName 	    : req.body.adminName,
		adminEmail 	    : req.body.adminEmail,
		adminMobile 	: req.body.adminMobile,
		adminAddress	: req.body.adminAddress,
	};
	adminModel.update(update, function(success){
		if(success){
			adminModel.get(req.session.uId, function(result){
				res.redirect('/admin/profile');	
			});	
		}else{
			res.redirect('/admin/editProfile');
		}
	});
});	
// ********************************************
// *************Edit Picture************************
router.get('/editPicture', (req, res)=>{

	adminModel.get(req.session.uId, function(result){
		res.render('admin/editPicture', result[0]);	
	});	
});
router.post('/editPicture', (req, res)=>{
	var update2 ={
		adminId 		: req.session.uId,
		adminImage	    :"/pictures/" + res.req.file.filename
	};
	adminModel.pictureedit(update2, function(success){
		if(success){
			res.redirect('/admin/profile');
		}else{
			res.redirect('/admin/editPicture');
		}
	});
});	
// ********************************************














module.exports = router;


