var express 		= require('express');
var userModel 		= require.main.require('./model/user-model');
var moderatorModel 	= require.main.require('./model/moderator-model');
var memberModel 	= require.main.require('./model/member-model');
var adminModel 	    = require.main.require('./model/admin-model');
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
// *************Request Box************************
router.get('/requestBox', (req, res)=>{

	requestModel.getAll(function(result){
		if(result.length >0){
			var results = {
				qList : result
			}
			res.render('admin/request', results);	
		}else{
			var results = {
				qList : ""
			}
			res.render('admin/request', results);	
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
					res.render('admin/request', results);	
				}else{
					var results = {
						qList : ""
					}
					res.render('admin/request', results);	
				}
			});	
		 }
		 else{
			res.render('/admin');
		}
	});	
});
// ********************************************
// *************Add Moderator*******************
router.get('/addModerator', (req, res)=>{
	userModel.getModerator(function(result){
		if(result.length >0){
			var results = {
				qList : result
			}
			res.render('admin/addModerator', results);	
		}else{
			var results = {
				qList : ""
			}
			res.render('admin/addModerator', results);	
		}
	});	
	
});

router.get('/addModerator/:id', (req, res)=>{

	userModel.updatestatus(req.params.id, function(success){
		if(success){
			userModel.getModerator(function(result){
				if(result.length >0){
					var results = {
						qList : result
					}
					res.render('admin/addModerator', results);	
				}else{
					var results = {
						qList : ""
					}
					res.render('admin/addModerator', results);	
				}
			});	
		}else{
			res.redirect('/admin/addModerator');
		}
	});
	
});

// ********************************************
// *************Delete Moderator****************

router.get('/deleteModerator', (req, res)=>{
	userModel.getAllModerator(function(result){
		if(result.length >0){
			var results = {
				qList : result
			}
			res.render('admin/deleteModerator', results);	
		}else{
			var results = {
				qList : ""
			}
			res.render('admin/deleteModerator', results);	
		}
	});	
	
});
router.get('/deleteModerator/:id', (req, res)=>{

	userModel.delete(req.params.id, function(success){
		if(success){
			userModel.getAllModerator(function(result){
				if(result.length >0){
					var results = {
						qList : result
					}
					res.render('admin/deleteModerator', results);	
				}else{
					var results = {
						qList : ""
					}
					res.render('admin/deleteModerator', results);	
				}
			});	
		}else{
			res.redirect('/admin/deleteModerator');
		}
	});
	
});
// ********************************************
// ********************************************
// *************Add ADMIN*******************
router.get('/addAdmin', (req, res)=>{
	userModel.getAdmin(function(result){
		if(result.length >0){
			var results = {
				qList : result
			}
			res.render('admin/addAdmin', results);	
		}else{
			var results = {
				qList : ""
			}
			res.render('admin/addAdmin', results);	
		}
	});	
	
});

router.get('/addAdmin/:id', (req, res)=>{

	userModel.updatestatus(req.params.id, function(success){
		if(success){
			userModel.getModerator(function(result){
				if(result.length >0){
					var results = {
						qList : result
					}
					res.render('admin/addAdmin', results);	
				}else{
					var results = {
						qList : ""
					}
					res.render('admin/addAdmin', results);	
				}
			});	
		}else{
			res.redirect('/admin/addAdmin');
		}
	});
	
});

// ********************************************
// *************View Content*******************
router.get('/viewContent', (req, res)=>{

	fs.readdir('./data/', function(err, items) {
		Object.assign({}, items);
		var item={
			qList:items
		}
		res.render('admin/viewContent' , item);

	});

});
// *******************************************
// *************Upload Content****************
router.get('/uploadContent', (req, res)=>{
res.render('admin/uploadContent');	
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
		res.redirect('/admin');
		
	});

// ********************************************
// *************Delete Content*******************
router.get('/deleteContent', (req, res)=>{

	fs.readdir('./data/', function(err, items) {
		Object.assign({}, items);
		var item={
			qList:items
		}
		res.render('admin/deleteContent' , item);
	});
});

router.get('/deleteContent/:name', (req, res)=>{

	fs.unlinkSync('./data/'+req.params.name);
	fs.readdir('./data/', function(err, items) {
		Object.assign({}, items);
		var item={
			qList:items
		}
		res.render('admin/deleteContent' , item);
	});

});
// ********************************************








	





module.exports = router;


