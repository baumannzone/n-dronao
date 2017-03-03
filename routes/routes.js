'use strict';

const express = require( 'express' );
const arDrone = require( 'ar-drone' );
const controller = require( '../controllers' );

// controller.sayHello();

const router = express.Router();
const dronappi = arDrone.createClient();

// Executed before any other routes
router.use( function ( req, res, next ) {
  console.log( req.method + ' ' + req.path );
  // FIXME console log once instead one by request
  controller.battery();
  next();
} );

// Home
router.get( '/', function ( req, res ) {
  dronappi.stop();
  res.render( 'index', {} );
} );

// Take-off
router.get( '/take-off', function ( req, res ) {
  controller.takeOffDrone();
  res.render( 'index', {} );
} );

// Land 
router.get( '/land', function ( req, res ) {
  controller.landDrone();
  res.render( 'index', {} );
} );

// Left
router.get( '/rotateLeft', function ( req, res ) {
  controller.rotateLeftDrone();
  res.render( 'index', {} );
} );

// Right
router.get( '/rotateRight', function ( req, res ) {
  controller.rotateRightDrone();
  res.render( 'index', {} );
} );

// Info
router.get( '/info', function ( req, res ) {
  const data = controller.renderMarkdown( 'readme.md' );
  res.render( 'markdown', {
    data: data,
    title: 'readme.md'
  } );
} );

// License
router.get( '/license', function ( req, res ) {
  const data = controller.renderMarkdown( 'license.md' );
  res.render( 'markdown', {
    data: data,
    title: 'license.md'
  } );
} );

module.exports = router;