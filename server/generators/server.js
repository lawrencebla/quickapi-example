var user = require('./user.js');
var book = require('./book.js');

function server( ctx, next, routerPath, servers ) {

	if( servers.length > 0 ) {
		prevServer = servers[0];
		servers.shift();
	} else {
		return (function *( ctx, next, routerPath ) {
				console.log( "cannot found api: " + ctx.path );
				ctx.body = "Can not found api: " + ctx.path;
				return ;
			})( ctx, next, routerPath );
	}

	return prevServer( ctx, server( ctx, next, routerPath, servers ), routerPath );

}

module.exports = function *( ctx, next, routerPath ) {

	yield* server( ctx, next, routerPath, 
		[
			user, 
			book
		]
	);

};