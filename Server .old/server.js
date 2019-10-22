'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const PORT = require('./costanti/connessione').NODE_PORT_ON_LOCALHOST;
const generalRouter = express.Router();
const Testunit = require('./test/testunit');

generalRouter.route('/Test1').all(Testunit.TestProlog);

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

//var server = http.createServer(server);