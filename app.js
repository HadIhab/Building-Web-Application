const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
    user: 'library',
    password: 'SQLserver123',
    server: 'ihab-library.database.windows.net',
    database: 'Library',
    "options": {
        "encrypt": true,
        "enableArithAbort": true
        }
};

sql.connect(config).catch(err => debug(err));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views','./src/views');
app.set('view engine', 'ejs');

const nav = [
	{ link:'/books', title:'Book' },
	{ link:'/authors', title:'Author' }
  ];
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books',bookRouter);	
app.get('/',function(req, res){
  res.render(
  	'index', 
  	{ 
  		title: 'My Library',
  		nav: [
  			  {
  				link:'/books',
  				title:'Books'
  			  },
  			  {
  				link:'/authors',
  				title:'Authors'
  			  }
  			]
  	}
  	);
});

app.listen(port,function(){
  debug(`Listening on port ${chalk.red(port)}`);
});