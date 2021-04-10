const express = require('express');

const bookRouter = express.Router();

const books = []
bookRouter.route('/')
	.get((req,res)=>{
		res.render(
			'books', 
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
		  			],
		  		books	
		  	}
		);
	});
bookRouter.route('/single')
	.get((req,res)=>{
		res.send('Hello sing book');
	});	

module.exports = bookRouter;