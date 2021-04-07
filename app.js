const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public/')));

app.get('/',function(req, res){
  res.sendFile(path.join(__dirname,'views/index.html'));
});

app.listen(3000,function(){
  debug(`Listening on port 3000`);
});