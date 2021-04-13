const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController');
const sql = require('mssql');

function router(nav){
	/**************/
	/****
			In this file i've implemented two ways to store data:
				1- In MS Azure SQL server
				2- In NoSql MongoDB 

				USE THE ONE U WANT and set a comment to the way u discard

	****/


	/********************************************/
	/****  FIRST WAY : MS AZURE SQL SERVER   ****/
	/********************************************/

	/*
	bookRouter.route('/')
		.get((req,res)=>{

		  (async function query() {

			const request = new sql.Request();
			const { recordset } = await request.query('select * from books');
			//debug(result);
			res.render(
						'bookListView', 
					  	{ 
					  		title: 'My Library',
					  		nav,
					  		books: recordset	
					  	}
					);	
		    }());	
		});
	
	bookRouter.route('/:id')
		.all((req,res,next)=>{
		  
		  (async function query() {
		  	const { id } = req.params;
			const request = new sql.Request();
			const { recordset } = 
				await request.input('id',sql.Int,id)
					  .query('select * from books where id= @id');
			//I put {recordset} in place of the 'result' variable for optimisation
			//debug({recordset});
			req.book = recordset[0];
			// The line above is equivalent to this : [req.book] = recordset;
			next();
		    }());
		})
		.get((req,res)=>{
			res.render(
				'bookView', 
				{ 
					title: 'My Library',
					nav,
					book: req.book	
				}
			);	
		});
		*/


	/********************************************/
	/****  SECOND WAY : NOSQL MONGO DB       ****/
	/********************************************/
	
	const { getIndex, getById } = bookController(nav);
	bookRouter.use((req,res,next)=>{
		if(req.user){
			next();
		}
		else{
			res.redirect('/');
		}
	});

	bookRouter.route('/')
    .get(getIndex);

    bookRouter.route('/:id')
    .get(getById);

	return bookRouter;	
}
	

module.exports = router;