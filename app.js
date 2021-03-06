const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({ secret: 'library', resave: false,saveUninitialized: true, }));

require('./src/config/passport.js')(app);

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
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/admin',adminRouter);	
app.use('/books',bookRouter);
app.use('/auth',authRouter);	

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