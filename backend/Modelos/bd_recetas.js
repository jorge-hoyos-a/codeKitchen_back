const mongoose = require('mongoose');

let esquema = mongoose.Schema({
    nombre:String,
    categoria: String,
    ingredientes:String,
    imagen:String,
    porciones:Number,
    instrucciones:String,
    idUsuario: String,
})

//Línea que crea en la bbdd el campo de creado y actualizado en una fecha
esquema.set('timestamps', true);

let Esquema = mongoose.model("recetas", esquema);

module.exports = Esquema