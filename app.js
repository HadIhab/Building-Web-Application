const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public/')));
app.set('views','./src/views');
app.set('view engine', 'pug');

app.get('/',function(req, res){
  res.render('index');
});

app.listen(3000,function(){
  debug(`Listening on port ${chalk.red(port)}`);
});