const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(){
	authRouter.route('/signUp')
	  .post((req,res)=>{

	  	debug(req.body);
	  	const { username, password } = req.body;
	  	const url = 'mongodb://localhost:27017';
	  	const dbName = 'libraryApp';

	  	(async function addUser(){
	  		let client;
	  		try{
	  			client = await MongoClient.connect(url);
	  			debug('Succesfully connected to mongodb server');
	  			const db = client.db(dbName);
	  			const col = db.collection('user');
	  			const user = { username, password };
	  			const results = await col.insertOne(user);
	  		}
	  		catch(err){

	  		}
	  	}())

	  	//create user : req.login came from passport initialise
	  	req.login(req.body,() =>{
	  		res.redirect('/auth/profile');
	  	});

	  });

	authRouter.route('/profile')
	  .get((req,res)=>{
	  	res.json(req.user); /*because i'm already logged in, passport attaches the user to the request*/
	  });  
	return authRouter;  
};

module.exports = router;