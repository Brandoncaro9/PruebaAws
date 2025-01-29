var express = require("express")
global.app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const mongoose = require("mongoose")
global.SHA256 = require("sha256")

const cors = require("cors")
const session = require("express-session")

const config = require("./config.js").config

app.get('/estado', function(request, response) {
    response.json({ mensaje: "Hola  mundo" })
})

app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});    

//METODOS
//GET-LISTAR INFORMACION
//PUT-ACTUALIZAR INFORMACION
//POST-CREAR INFORMACION
//DELETE-BORRAR INFORMACION
//API

global.datos = []
// CREATE


app.use(session({

   secret:config.secret,
   resave:true,
   saveUninitialized:true,
   cookie:{
    maxAge:config.expiracion,httpOnly:true
   },
   name:"Cookieapp",
   rolling:true    
}))

require("./rutas.js")

mongoose.connect("mongodb://127.0.0.1:27017/"+config.bd).then((respuesta)=>{
    console.log("Conexion a mongo correcta")
}).catch((error)=>{
    console.log(error)
})

app.use(cors({
    origin: function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.blacklist.indexOf(origin) === -1){
            return callback("error de cors sin permisos", false)
        }
        else{
            return callback(null, true)
        }
    }
}))

// MODELO VISTA CONTROLADOR RUTAS

app.use("/",express.static(__dirname + "/Pagina"))

<h2> Hola mundo <h2>

app.listen(config.puerto,function(){
    console.log("servidor funcionando por el puerto" + config.puerto)
})
