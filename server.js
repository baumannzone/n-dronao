console.log("Iniciando server de Node");

// Conectarse al WiFi del Drone

/* Drone Control Code */
var arDrone = require("ar-drone");
var dronappi = arDrone.createClient();

function bateria () {
    console.log( `==> Bateria: ==> ${ dronappi.battery() }` );
}

function despegar_drone() {
    // dronappi.config("control:altitude_max", 100000);
    dronappi.takeoff();
    rotar_drone();
    bateria();
}

function rotar_drone() {
    dronappi.stop();
    dronappi.calibrate(0);
    dronappi.up(1);
}

function izquierda() {
  dronappi.stop();
  dronappi.calibrate(0);
  dronappi.left(0.5);
}

function derecha() {
  dronappi.stop();
  dronappi.calibrate(0);
  dronappi.right(0.5);
}

function aterrizar_drone() {
    dronappi.stop();
    dronappi.land();
    bateria();
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