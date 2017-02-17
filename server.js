console.log("Server Iniciado ");

var arDrone = require("ar-drone");
var dronappi = arDrone.createClient();
var fs = require('fs');

function bateria () {
    console.log( `==> Bateria: ==> ${ dronappi.battery() }` );
}

function despegar_drone() {
    //dronappi.config("control:altitude_max", 10000); # 10m
    dronappi.takeoff();
    rotar_drone();
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

// Land Drone
function aterrizar_drone() {
    dronappi.stop();
    dronappi.land();
    bateria();
}

// md ==> html
function render_markdown ( file ) {
    var showdown  = require('showdown');
    var converter = new showdown.Converter();
    var text      = '#hello, markdown!';
    var html      = converter.makeHtml(text);

    fs.readFile('DATA', 'utf8', function(err, contents) {
        console.log(contents);
    });
}

/* Express y Sevidor Web */
var express = require("express");
var web = express();
var server;

server = web.listen(8080, function () {
    console.log("¡Servidor arrancado en localhost:8080!");
});

// Rutas
web.get("/", function(req, res)    {
    // dronappi.on('navdata', console.log);
    console.log("Home");
    dronappi.stop();
    res.sendfile("opciones.html");
});

/* Despegue URL */
web.get("/despegar", function(req, res)    {
    console.log("Despegando");
    despegar_drone();
    res.sendfile("opciones.html");
});

/* Aterrizar URL */
web.get("/aterrizar", function(req, res) {
    console.log("Aterrizando");
    aterrizar_drone();
    res.sendfile("opciones.html");
});

/* Izquierda URL */
web.get("/izquierda", function(req, res) {
    console.log("Izquierda");
    izquierda();
    res.sendfile("opciones.html");
});

/* Aterrizar URL */
web.get("/derecha", function(req, res) {
    console.log("derecha");
    derecha();
    res.sendfile("opciones.html");
});

web.get("/info", function (req, res) {

    res.sendFile('Lmao troll!');
});