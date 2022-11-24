const mongoose = require('mongoose');

let esquema = mongoose.Schema({
    nombres:String,
    apellidos: String,
    edad:Number,
    ciudad:String,
    email:String,
    pswd:String
});

//Línea que crea en la bbdd el campo de creado y actualizado en una fecha
esquema.set('timestamps', true);

let Esquema_usr = mongoose.model("usuarios", esquema);

module.exports = Esquema_usr