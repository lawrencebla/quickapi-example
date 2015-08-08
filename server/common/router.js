var pathToRegexp = require('path-to-regexp')


module.exports = Router;

var router = Router.prototype;

var METHODS = [
	"GET",
	"POST",
	"PUT",
	"DELETE"
];

function Router() {

	if (!(this instanceof Router)) {
		return new Router();
	}
	this.routerStack = [];
}

// 设置 RESTful 方法
METHODS.forEach( function(method) {
	router[ method.toLowerCase() ] = function( path, middleware ) {
		this.register( path, method, middleware );
	}

} );


router.register = function( path, method, middleware ) {

	this.routerStack.push( {
		path: path,
		method: method,
		middleware: middleware,
		regexp: pathToRegexp( path ),
		parsePaths: pathToRegexp.parse( path )
	} );

};

router.use = function( path, subRouter ) {

	var that = this;
	subRouter.routerStack.forEach( function( router ) {
		that.register( path + router.path, router.method, router.middleware );
	} );

};

router.getRouter = function( req ) {

	var path = req.path;
	var method = req.method;

	var selectedRouter = null;
	this.routerStack.forEach( function( router ) {

		if( !selectedRouter ) {
			if( router.method === method ) {
				if( router.regexp.test( path ) ) {
					var paramsValue = path.match( router.regexp ).slice(1);
					if( paramsValue.length > 0 ) {
						var params = {},
							count = 0;

						router.parsePaths.forEach( function( parsePath ) {

							if( typeof parsePath !== "string" ) {
								count++;
								params[ parsePath.name || "param" + count ] = paramsValue[count - 1];
							}

						} );
						req.params = params;

					}
					selectedRouter = router;
				}
			}
		}

	} );
	return selectedRouter;

};

router.setup = function( req, res, next ) {

	var router = this.getRouter( req );

	if( router && router.middleware ) {
		return router.middleware( req, res, next ) !== false;
	}
	return false;
};