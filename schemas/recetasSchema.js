const Joi = require('joi');

const id = Joi.string();
const nombre = Joi.string().min(3).max(50);
const categoria = Joi.string().min(3).max(20);
const porciones = Joi.number().integer().min(1);
const ingredientes = Joi.string();
const imagen = Joi.string().uri();
const instrucciones = Joi.string();


const crearRecetaSchema = Joi.object({
    nombre: nombre.required(),
    categoria: categoria.required(),
    porciones: porciones.required(),
    ingredientes: ingredientes.required(),
    imagen: imagen.required(),
    instrucciones: instrucciones.required()
})

const getRecetaSchema = Joi.object({
    id: id.required(),
})

const actualizarRecetaSchema = Joi.object({
    nombre: nombre,
    categoria: categoria,
    porciones: porciones,
    ingredientes: ingredientes,
    imagen: imagen,
    instrucciones: instrucciones,
})

module.exports = { crearRecetaSchema, getRecetaSchema, actualizarRecetaSchema };