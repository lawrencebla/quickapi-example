var Router = require('koa-router');

function *bookServer( ctx, next, routerPath ) {
	var router = Router( {
		prefix: '/book',
		routerPath: routerPath
	} );
	router.get('/', function *( next ) {
			ctx.body = "get books";
			return ctx.path;
		} )
		.get('/:id', function *( next ) {
			var id = ctx.params.id;
			if( !isNaN(id) ) {
				ctx.body = "get book: " + ctx.params.id;
				return ctx.path;
			} else {
				yield* next;
			}
		} )
		.post('/create', function *( next ) {
			ctx.body = "create book";
			return ctx.path;
		} );

	yield* router.routes().call(ctx, next);

}

module.exports = bookServer;