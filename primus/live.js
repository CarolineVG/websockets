exports.go = function(server) {
    // maak primus en verbind die met server 
    const Primus = require('primus');
    var primus = new Primus(server, {});

    // eenmalig laten uitvoeren om library in te voegen
    // primus.save(__dirname +'/primus.js');

    primus.on('connection', function connection(spark) {
            console.log('primus werkt');
    });
}