var express  = require('express');
var fs       = require('fs');

var app    = express();
var routes = require('./routes/routes');

app.set( 'views', './public' );
app.set( 'view engine', 'pug' );
app.use( '/public', express.static( __dirname + '/public' ));

// Use the Routes we have defined above.
app.use( '/', routes );

// 404 page
app.use( '*', function ( req,res ) {
  res.render( '404' );
});

// -> Start Server <-
app.listen(8088, function () {
    console.log("¡Servidor arrancado en http://localhost:8088!");
});

