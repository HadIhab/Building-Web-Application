const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');

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

	bookRouter.route('/')
    .get((req, res) => {
	      const url = 'mongodb://localhost:27017';
	      const dbName = 'libraryApp';

	      (async function mongo() {
	        let client;
	        try {
	          client = await MongoClient.connect(url);
	          debug('Connected correctly to server');

	          const db = client.db(dbName);
	          const col = await db.collection('books');
	          const books = await col.find().toArray();
	          res.render(
	            'bookListView',
	            {
	              nav,
	              title: 'Library',
	              books
	            }
	          );
	        } 
	        catch (err) {
	          debug(err.stack);
	        }
	        client.close();
	      }());
    });

    bookRouter.route('/:id')
    .get((req, res) => {
	      const { id } = req.params;
	      const url = 'mongodb://localhost:27017';
	      const dbName = 'libraryApp';

	      (async function mongo() {
	        let client;
	        try {
	          client = await MongoClient.connect(url);
	          debug('Connected correctly to server');

	          const db = client.db(dbName);

	          const col = await db.collection('books');

	          const book = await col.findOne({ _id: new ObjectID(id) });
	          debug(book);
	          res.render(
	            'bookView',
	            {
	              nav,
	              title: 'Library',
	              book
	            }
	          );
	        } catch (err) {
	          debug(err.stack);
	        }
	      }());
    });

	return bookRouter;	
}
	

module.exports = router;