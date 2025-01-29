var express = require('express')
var app = express()
var path = require('path')
require().config();


app.get('/estado', function(request, response) {
    response.json({ mensaje: "Hola  mundo" })
})


app.use('/', express.static(__dirname + '/'));

app.get('/*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + "/index.html"));
});



var puerto = 3000;

app.listen(puerto, () => console.log('servidor funcionando por el puerto ' + puerto))



app.listen(config.puerto,function(){
    console.log("servidor funcionando por el puerto" + config.puerto)
})
