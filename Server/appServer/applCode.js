/*
frontend/uniboSupports/applCode
*/
const express = require('express');
const path = require('path');
const logger = require('morgan');	//see 10.1 of nodeExpressWeb.pdf;
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const fs = require('fs');
const PrologTestUnit = require('./prolog/test');
const PorlogEngine = require('./prolog/prologEngine');
const Session = require('./prolog/session');
const resolveModuleName = require('./prolog/pl/nameResolver');

var url = require('url');

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

//Creates a default route for /pi;
app.get('/info', function (req, res) {
	res.send('This is the CompilationHelper!')
});

//js
app.get('/springyui.js',function(req,res){
    res.sendFile(path.join(__dirname, '/js/springyui.js')); 
});
app.get('/springy.js',function(req,res){
    res.sendFile(path.join(__dirname, '/js/springy.js')); 
});
app.get('/myAjax.js',function(req,res){
    res.sendFile(path.join(__dirname, '/js/myAjax.js')); 
});

app.get('/graph.js',function(req,res){
    res.sendFile(path.join(__dirname, '/js/graph.js')); 
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
app.get('/init', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var typeInit = url_parts.query.typeInit;
	Session.Clean();
	var s =Session.Create();
	console.log("Init of "+typeInit + ", as session: user"+s.GetMyId());
	try{
		PorlogEngine.Istance.Init(resolveModuleName(typeInit),s);
		res.send('<p style="color: green;">Init of '+typeInit+' success</p><input type="hidden" id="UserId" name="UserId" value="'+s.GetMyId()+'">')
	}catch(err){
		console.log("Init error: "+ err);
		res.send('<p style="color: red;">Error on init of '+typeInit+'</p>')
	}
	
});
app.get('/startSurvey', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var s = Session.Get(url_parts.query.MyId);
	console.log("StartSurvey [session: user"+s.GetMyId()+"]");
	try{
		var ans =PorlogEngine.Istance.StartSurvey(s);
		if(ans!==false){
				res.send('<p style="color: white;">'+ans+'</p>')
		}else{
			console.log("StartSurvey error: PorlogEngine.Istance.StartSurvey()==false");
			res.send('<p style="color: red;">Error on startSurvey</p>')
		}
	}catch(err){
		console.log("StartSurvey error: "+ err);
		res.send('<p style="color: red;">Error on startSurvey</p>')
	}	
});
app.get('/setResp', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var respToAns = url_parts.query.respToAns;
	var s = Session.Get( url_parts.query.MyId);
	console.log("SetResp [session: user"+s.GetMyId()+"]");
	try{
		var ans =PorlogEngine.Istance.SetResp(respToAns,s);
		if(ans!==null){
			if(ans!==false){
				res.send('<p style="color: white;">'+ans+'</p>')
			}else{
				var result=PorlogEngine.Istance.GetResult(s);
				console.log("------>", result)
				res.send('<p style="color: green;">Survey finished with result: '+result[result.length-1].X+'</p>')
			}
		}else{
			var oldAns =PorlogEngine.Istance.GetLocalAnswer(s);
			//QUI SI POTRBBE FARE DEL REASONING per capire le risposte possibili da dare
			res.send('<p style="color: red;">Your answer is invalid</p><br><p style="color: white;">'+oldAns+'</p>')
		}
	}catch(err){
		console.log("SetResp error: "+ err);
		res.send('<p style="color: red;">Error on setResp</p><br><p style="color: red;">Your answer is invalid</p><br><p style="color: white;">'+oldAns+'</p>')
	}	
});
app.get('/getIA', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var s = Session.Get(url_parts.query.MyId);
	console.log("getIA [session: user"+s.GetMyId()+"]");
	try{
		res.status(200).json(PorlogEngine.Istance.GetAllAnswer(s));	
	}catch(err){
		console.log("SetResp error: "+ err);
		res.status(200).json({error:true});
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
app.get('/test4', function (req, res) {
	res.send(PrologTestUnit.test4());
});
app.get('/test5', function (req, res) {
	res.send(PrologTestUnit.test5());
});
app.get('/test6', function (req, res) {
	res.send(PrologTestUnit.test6());
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