//DECLARATION
var express 		= require('express');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var path			= require('path');
var multer 			= require('multer');
var formidable 		= require('formidable');
var fs 				= require('fs');
var cookieParser 	= require('cookie-parser');
var login			= require('./controllers/login');
var signup			= require('./controllers/signup');
var member			= require('./controllers/member');
var moderator		= require('./controllers/moderator');
var admin			= require('./controllers/admin');
var logout			= require('./controllers/logout');
var app  			= express();
var port 			= 2040;

//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(exSession({secret: 'No More Pera', saveUninitialized: true, resave: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// var storage = multer.diskStorage({
// 	destination: "./images/",
// 	filename   : function(req,file,cb){
// 		cb(null , "image_"+Date.now()+path.extname(file.originalname));
// 	}
// });
// app.use(multer({
// 	storage:storage
// }).single('imageFile'));

app.use('/login', login);
app.use('/signup', signup);
app.use('/member', member);
app.use('/moderator', moderator);
app.use('/admin', admin);
app.use('/logout', logout);
app.use('/assets', express.static('ext'));
app.use('/pictures', express.static('images'));
app.use('/content', express.static('data'));
app.use('/', express.static('data'));

//ROUTES
app.get('/', (req, res)=>{
	res.render('landingPage/index');
});


// app.get('/setCookie', (req,res)=>{
// 	res.cookie('cookie1', 'first cookie');
// 	res.send("done");
// });

// app.get('/viewCookie', (req,res)=>{
// 	res.send(req.cookies['cookie1']);
// });

// app.get('/rmCookie', (req,res)=>{
// 	res.clearCookie('cookie1');
// 	res.send('Done');
// });


//SERVER STARTUP
app.listen(port, ()=>console.log('Server running on port '+port+" ..."));