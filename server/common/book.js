var router = require('./router.js')();

router.get('/:id', function( req, res ) {
	var id = req.params.id;
	if( !isNaN(id) ) {
		res.body = "get book by id: " + id;
	} else {
		return false;
	}
});
router.get('/', function( req, res ) {
	res.body = "get books";
});
router.post('/create', function( req, res ) {
	res.body = "create book";
});

module.exports = router;