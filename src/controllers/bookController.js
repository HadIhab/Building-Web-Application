const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(nav) {

	function getIndex(req, res) {
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
    }

	function getById(req, res) {
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
    }

	return {
		getIndex,
		getById
	};
}

module.exports = bookController;