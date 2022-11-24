const Joi = require('joi');

const id = Joi.string();
const nombres = Joi.string().min(3).max(50);
const apellidos = Joi.string().min(3).max(50);
const edad = Joi.number().integer().min(1);
const ciudad = Joi.string()
const email = Joi.string().email();
const pswd = Joi.string();

const crearUsuarioSchema = Joi.object({
    nombres: nombres.required(),
    apellidos: apellidos.required(),
    edad: edad.required(),
    ciudad: ciudad.required(),
    email: email.required(),
    pswd: pswd.required(),
})

const getUsuarioSchema = Joi.object({
    id: id.required(),
})

const actualizarUsuarioSchema = Joi.object({
    nombres: nombres,
    apellidos: apellidos,
    edad: edad,
    ciudad: ciudad,
    email: email,
    pswd: pswd,
})

module.exports = { crearUsuarioSchema, getUsuarioSchema, actualizarUsuarioSchema };