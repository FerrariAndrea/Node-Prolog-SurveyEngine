'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const config = require('./costanti/DB.js');


const MyConsole=require('./components/MyConsole');
const MySocket =require('./components/MySocket');
const generalRouter = require('./router/GeneralRouter.js');


const {NODE_PORT_ON_LOCALHOST} = require('./costanti/connessione');
// process.env.port required by heroku
const PORT = process.env.PORT || NODE_PORT_ON_LOCALHOST;


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
	useNewUrlParser: true,
	socketTimeoutMS: 0,
	keepAlive: true,
  reconnectTries: 30,
  useCreateIndex: true,   //aggiunta
  useFindAndModify: false //aggiunta
	}).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const server = express()
  //.use((req, res) => res.sendFile(INDEX) )
  .use(cors())
  .use(bodyParser.urlencoded({extended: true}))//l'ordine è importante! se lo metti prima del router non viene presa come impostazione 
  .use(bodyParser.json())                      //l'ordine è importante! se lo metti prima del router non viene presa come impostazione 
  .use('/', generalRouter)
  .use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST','GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
  }) 
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


const socket = new MySocket( { server } );
