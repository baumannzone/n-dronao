console.log( '=> Server Running =>');

// Require
var fs       = require('fs');
var express  = require('express');
var arDrone  = require('ar-drone');
var showdown = require('showdown');
var path     = require('path');


// Functions
// ==================

// Log Battery
function bateria () {
    // console.log( `==> Bateria: ==> ${ dronappi.battery() }` );
}

function despegar_drone() {
    //dronappi.config("control:altitude_max", 10000); # 10m
    dronappi.takeoff();
    rotar_drone();
    bateria();
}

// Land Drone
function aterrizar_drone() {
    dronappi.stop();
    dronappi.land();
    bateria();
}

function rotar_drone() {
    dronappi.stop();
    dronappi.calibrate(0);
    dronappi.up(1);
}

// Move left
function izquierda() {
  dronappi.stop();
  dronappi.calibrate(0);
  dronappi.left(0.5);
}

// Move right
function derecha() {
  dronappi.stop();
  dronappi.calibrate(0);
  dronappi.right(0.5);
}

// Markdown to Html
function render_markdown ( file ) {
    var converter = new showdown.Converter();

    var text = fs.readFileSync('readme.md', 'utf8', function( err, contents ) {
        if ( err ) throw err;
        console.log("#### ==> Fichero: ")
        console.log( contents );
    });
    
    var html = converter.makeHtml(text);

    return html ||'<pre>vacio</pre>';
}


// App
var app        = express();
var router     = express.Router();
var dronappi   = arDrone.createClient();
var publicPath = __dirname + '/public/';

app.use( express.static( __dirname + '/public' ));


// Executed before any other routes
router.use(function (req, res, next) {
  console.log( req.method + ' ' + req.path );
  next();
});

// Home
router.get('/', function (req, res) {
    // dronappi.on('navdata', console.log);
    dronappi.stop();
    res.sendFile( publicPath + 'index.html' );
});

// Take-off
router.get('/despegar', function ( req, res ) {
    despegar_drone();
    res.sendFile( publicPath + 'index.html' );
});

// Land 
router.get('/aterrizar', function ( req, res ) {
    aterrizar_drone();
    res.sendFile( publicPath + 'index.html' );
});

// Left
router.get('/izquierda', function ( req, res ) {
    izquierda();
    res.sendFile( publicPath + 'index.html' );
});

// Right
router.get('/derecha', function ( req, res ) {
    derecha();
    res.sendFile( publicPath + 'index.html' );
});

// Info
router.get('/info', function ( req, res ) {
    var data = render_markdown( 'readme.md' );
    res.status(200).send( data );
});

// Use the Routes we have defined above.
app.use( '/', router );

// 404 
app.use( '*', function ( req,res ) {
  res.sendFile( publicPath + '404.html' );
});


// -> Start Server <-
app.listen(8088, function () {
    console.log("¡Servidor arrancado en localhost:8088!");
});