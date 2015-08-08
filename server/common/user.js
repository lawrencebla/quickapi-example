var router = require('./router.js')();

router.get('/:id', function( req, res ) {

	var id = req.params.id;
	if( !isNaN(id) ) {
		res.body = "get user by id: " + id;
	} else {
		return false;
	}
});
router.get('/', function( req, res ) {
	res.body = "get users";
});
router.post('/create', function( req, res ) {
	res.body = "create user";
});

module.exports = router;