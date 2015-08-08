var Router = require('koa-router');

function *userServer( ctx, next, routerPath ) {
	var router = Router( {
		prefix: '/user',
		routerPath: routerPath
	} );
	router.get('/', function *( next ) {
			ctx.body = "get users";
		} )
		.get('/:id', function *( next ) {
			var id = ctx.params.id;
			if( !isNaN(id) ) {
				ctx.body = "get user: " + ctx.params.id;
			} else {
				yield* next;
			}
		} )
		.post('/create', function *( next ) {
			ctx.body = "create user";
		} );
	yield* router.routes().call(ctx, next);

}

module.exports = userServer;