const express = require('express');
const rutas_usr = express.Router();
const validatorHandler = require('./../middlewares/validatorHandler');
const { crearUsuarioSchema, getUsuarioSchema, actualizarUsuarioSchema } = require('./../schemas/usuariosSchema');
//const bcrypt = require('bcrypt');

const UserService = require('../services/userService');
const service = new UserService();

//Servicio POST (Create)
rutas_usr.post('/nuevo', 
    validatorHandler(crearUsuarioSchema, 'body'),
    async (req, res, next) => {
        try {
            let body = req.body
            let nuevoUsuario = await service.createUser(body)
            delete nuevoUsuario["pswd"]
            res.status(201).json(nuevoUsuario)
        } catch (error){
            next(error)
        }
    }
);

// Servicio GET find all (Read)
rutas_usr.get('/', async (req, res, next) => {
    try {
        const usuarios = await service.findAllUsers();
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
});

// Servicio GET find one by Id(Read)
rutas_usr.get('/id/:id', 
    validatorHandler(getUsuarioSchema, 'params'),
    async (req, res, next) => {
        try{
            const { id } = req.params
            const usuario = await service.findUser(id)
            res.json(usuario)
        } catch (error) {
            next(error);
        }
    }
);

// Servicio GET find by name (Read)
rutas_usr.get('/nombre/:nome', 
    async (req, res, next) => {
        try {
            let {nome} = req.params
            let xy = new RegExp(nome, "i")
            let usuarioNome = await service.findUserByName(xy)
            res.json(usuarioNome)
        } catch (error) {
            next(error);
        }
    }
);
    
// Servicio GET find user by email (Read)
rutas_usr.get('/email/:email', 
    async (req, res, next) => {
        try {
            let {email} = req.params
            let usuarioEmail = await service.findUserByEmail(email)
            res.json(usuarioEmail)
        } catch (error) {
            next(error);
        }
    }
);

// Servicio PUT (Update)
rutas_usr.post('/actualizar/:id', 
    validatorHandler(getUsuarioSchema, 'params'),
    validatorHandler(actualizarUsuarioSchema, 'body'),
    async (req, res, next) => {
        let { id } = req.params
        let body = req.body
        try {
            const actualizarUsuario = await service.updateUser(id, body);
            res.json(actualizarUsuario)
        } catch (error) {
            next(error);
        }
    }
);

// Servicio DELETE
rutas_usr.get('/borrar/:id', 
    validatorHandler(getUsuarioSchema, 'params'),
    async (req, res, next) => {
        let { id } = req.params
        try {
            const borrarUsuario = service.deleteUser(id);
            res.status(202).json(borrarUsuario)
        } catch (error) {
            next(error)
        }
    }
);

module.exports = rutas_usr;