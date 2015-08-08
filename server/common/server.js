var path = require("path");

var userRouter = require('./user.js');
var bookRouter = require('./book.js');

var router = require('./router.js')();

router.use("/user", userRouter);
router.use("/book", bookRouter);

function server( ctx, next, routerPath ) {

	var req = ctx.request;
	var res = ctx.response;
	req.path = routerPath;

	if( !router.setup( req, res, next ) ) {
		ctx.body = "Can not found api: " + ctx.path;
	}
}

module.exports = server;