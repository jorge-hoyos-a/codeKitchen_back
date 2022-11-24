const express = require('express');
//const passport = require('passport');
const rutas = express.Router();
const validatorHandler = require('./../middlewares/validatorHandler');
const { crearRecetaSchema, getRecetaSchema, actualizarRecetaSchema } = require('./../schemas/recetasSchema')
//const { checkApiKey } = require('../middlewares/authHandler');

const RecetaService = require('../services/recetaService');
const service = new RecetaService();

// Prueba auth
// rutas.get('/prueba', checkApiKey, async (req,res) => {
//     await Esquema
//         .find({})
//         .then(data => res.json(data))
// })

//Servicio POST (Create)
rutas.post('/nueva', 
    //passport.authenticate('jwt', {session: false}),
    validatorHandler(crearRecetaSchema, 'body'),
    async (req, res, next) => {
        try {
            let body = req.body
            let nuevaReceta = await service.createRecipe(body)
            res.status(201).json(nuevaReceta)
        } catch (error){
            next(error)
        }
    }
);

// Servicio GET find all (Read)
rutas.get('/', async (req, res, next) => {
    try {
        const recetas = await service.findRecipes();
        res.json(recetas);
    } catch (error) {
        next(error);
    }
});

// Servicio GET find one (Read)
rutas.get('/id/:id', 
    validatorHandler(getRecetaSchema, 'params'),
    async (req, res, next) => {
        try{
            let { id } = req.params
            let receta = await service.findRecipeById(id);
            res.json(receta)
        } catch (error) {
            next(error);
        }
    }
);

// Servicio GET find many by name (Read)
rutas.get('/nombre/:nome', 
    async (req, res, next) => {
        try{
            let {nome} = req.params
            let recipeNome = await service.findRecipeByName(nome);
            res.json(recipeNome)
        } catch (error) {
            next(error)
        }
    }
);

// Servicio PUT (Update)
rutas.post('/actualizar/:id', 
    validatorHandler(getRecetaSchema, 'params'),
    validatorHandler(actualizarRecetaSchema, 'body'),
    async (req, res, next) => {
        let { id } = req.params
        let body = req.body
        try {
            let actualizarReceta = await service.updateRecipe(id, body);
            res.json(actualizarReceta)
        } catch (error){
            next(error)
        }
    }
);

// Servicio DELETE
rutas.get('/borrar/:id',
    validatorHandler(getRecetaSchema, 'params'),
    async (req, res, next) => {
        let { id } = req.params
        try {
            const borrarReceta = service.deleteRecipe(id);
            res.status(202).json(borrarReceta)
        } catch (error) {
            next(error)
        }
    }
);

module.exports = rutas;