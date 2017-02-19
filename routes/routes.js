var express  = require('express');
var arDrone  = require('ar-drone');
var showdown = require('showdown');
var fs       = require('fs');

var router   = express.Router();
var dronappi = arDrone.createClient();

// Executed before any other routes
router.use(function (req, res, next) {
  console.log( req.method + ' ' + req.path );
  next();
});

// Home
router.get('/', function (req, res) {
    dronappi.stop();
    res.render('index', {});
});

// Take-off
router.get('/take-off', function ( req, res ) {
    takeOffDrone();
    res.render( 'index', { });
});

// Land 
router.get('/land', function ( req, res ) {
    aterrizar_drone();
    res.render( 'index', { });
});

// Left
router.get('/left', function ( req, res ) {
    izquierda();
    res.render( 'index', { });
});

// Right
router.get('/right', function ( req, res ) {
    derecha();
    res.render( 'index', { });
});

// Info
router.get('/info', function ( req, res ) {
    var data = render_markdown( 'readme.md' );
    res.render( 'markdown', { 
        data: data,
        title: 'readme.md'
    });
});

// License
router.get('/license', function ( req, res ) {
    var data = render_markdown( 'license.md' );
    res.render( 'markdown', { 
        data: data,
        title: 'license.md'
    });
});


// Functions
// ==================

// Log Battery
function bateria () {
    // console.log( `==> Bateria: ==> ${ dronappi.battery() }` );
}

// Take Off
function takeOffDrone() {
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
    var text = fs.readFileSync( file, 'utf8', function( err, contents ) {
        if ( err ) throw err;
    });

    console.log( `Reading ${file} file...` );
    
    var html = converter.makeHtml(text);

    return html;
}

module.exports = router;