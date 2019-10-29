/*
frontend/uniboSupports/applCode
*/
const express = require('express');
const path = require('path');
const logger = require('morgan');	//see 10.1 of nodeExpressWeb.pdf;
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const fs = require('fs');
const index = require('./routes/index');
const PrologTestUnit = require('./prolog/test');

var app = express();

// view engine setup;
app.set('views', path.join(__dirname,  'views'));
app.set('view engine', 'ejs');

//create a write stream (in append mode) ;
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'morganLog.log'), { flags: 'a' })
app.use(logger("short", { stream: accessLogStream }));

//Creates a default route. Overloads app.use('/', index);
//app.get("/", function(req,res){ res.send("Welcome to frontend Server"); } );

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname,  'favicon.ico')));
app.use(logger('dev'));				//shows commands, e.g. GET /pi 304 23.123 ms - -;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'jsCode'))); //(***)

//DEFINE THE ROUTES ;
//app.use('/', index);		 

//Creates a default route for /pi;
app.get('/info', function (req, res) {
	res.send('This is the CompilationHelper!')
});

//js
app.get('/myAjax.js',function(req,res){
    res.sendFile(path.join(__dirname, '/js/myAjax.js')); 
});

//css
app.get('/style.css',function(req,res){
    res.sendFile(path.join(__dirname, '/css/style.css')); 
});

app.get('/', function (req, res) {
	res.render("index");
});


/*
* ====================== CMD ================
*/
app.get('/assert', function (req, res) {
	if(PrologTestUnit.test1()){
		res.send('<p style="color: green;">Test1 Passed, Prolog work :)</p>')
	}else{
		res.send('<p style="color: red;">Test1 NOT Passed, Prolog not work :(</p>')
	}
});
/*
* ====================== TEST ================
*/
app.get('/test1', function (req, res) {
	if(PrologTestUnit.test1()){
		res.send('<p style="color: green;">Test1 Passed, Prolog work :)</p>')
	}else{
		res.send('<p style="color: red;">Test1 NOT Passed, Prolog not work :(</p>')
	}
});
app.get('/test2', function (req, res) {
	if(PrologTestUnit.test2()){
		res.send("Passed")
	}else{
		res.send("NOT Passed")
	}
});
app.get('/test3', function (req, res) {
	var ris = PrologTestUnit.test3();
	console.log("test3--->"+ris);
	if(ris){
		res.send("Passed")
	}else{
		res.send("NOT Passed")
	}
});
/*
* ====================== REPRESENTATION ================
*/
app.use(function (req, res) {
	console.info("SENDING THE ANSWER " + result + " json:" + req.accepts('josn'));
	try {
		console.log("answer> " + result);
	    /*
	   if (req.accepts('json')) {
	       return res.send(result);		//give answer to curl / postman
	   } else {
	       return res.render('index' );
	   };
	   */
		return res.render('index');
	} catch (e) { console.info("SORRY ..." + e); }
}
);

//app.use(converter());

/*
 * ============ ERROR HANDLING =======
 */

// catch 404 and forward to error handler;
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler;
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	// render the error page;
// 	res.status(err.status || 500);
// 	res.render('error');
// });
module.exports = app;