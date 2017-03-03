const fs = require( 'fs' );
const express = require( 'express' );

const app = express();
const routes = require( './routes/routes' );

app.set( 'views', './public' );
app.set( 'view engine', 'pug' );
app.use( '/public', express.static( __dirname + '/public' ) );

// Use the Routes we have defined
app.use( '/', routes );

// 404 page
app.use( '*', function ( req, res ) {
  res.render( '404' );
} );

// -> Start Server <-
app.listen( 8088, function () {
  console.log( "¡Servidor arrancado en http://localhost:8088!" );
} );

