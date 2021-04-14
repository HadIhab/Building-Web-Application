
function goodreadsService() {

	function getBookById() {
		
		return new Promise((resolve, reject) => {
			resolve({ description: 'My Descrp' });
		});
	}

	return {
		getBookById
	};
}

module.exports = goodreadsService();