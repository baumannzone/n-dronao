'use strict';

const showdown = require( 'showdown' );
const arDrone = require( 'ar-drone' );
const fs = require( 'fs' );
const dronappi = arDrone.createClient();

const controller = {};

// Log Battery
controller.battery = function battery () {
  console.log( `# Battery: ==> ${ dronappi.battery() }` );
};

// Take Off
controller.takeOffDrone = function takeOffDrone () {
  //dronappi.config("control:altitude_max", 5000); # 5m
  dronappi.takeoff();
};

// Land Drone
controller.landDrone = function landDrone () {
  dronappi.stop();
  dronappi.land();
};

controller.rotarDrone = function rotarDrone () {
  dronappi.stop();
  dronappi.calibrate( 0 );
  dronappi.up( 1 );
};

// Rotate left
controller.rotateLeftDrone = function rotateLeftDrone () {
  dronappi.stop();
  dronappi.calibrate( 0 );
  dronappi.left( 0.5 );
};

// Rotate right
controller.rotateRightDrone = function rotateRightDrone () {
  dronappi.stop();
  dronappi.calibrate( 0 );
  dronappi.right( 0.5 );
};

// Markdown to Html
controller.renderMarkdown = function renderMarkdown ( file ) {
  const converter = new showdown.Converter();
  const text = fs.readFileSync( file, 'utf8', function ( err, contents ) {
    if ( err ) throw err;
  } );

  console.log( `Reading ${file} file...` );

  return converter.makeHtml( text );
};

module.exports = controller;