const boom = require('@hapi/boom');
const Esquema = require('../Modelos/bd_recetas');

class RecetasService {
    //Create new user
    async createRecipe(body) {
        const newRecipe = new Esquema({
            nombre:body.nombre,
            categoria: body.categoria,
            ingredientes: body.ingredientes,
            porciones: body.porciones,
            instrucciones: body.instrucciones,
            imagen: body.imagen,
            idUsuario: body.idUsuario,
        });

        await newRecipe.save()
        return newRecipe;
    }

    // Find all recipes
    async findRecipes() {
        const rta = await Esquema.find({});
        return rta;
    }

    //Find recipe by id
    async findRecipeById(id) {
        const recipe = await Esquema.findById(id)
        if (!recipe) {
            throw boom.notFound('recipe not found');
        }
        return recipe;
    }

    //Find recipe by name
    async findRecipeByName(nome) {
        let xy = new RegExp(nome, "i")
        const recipe = await Esquema.find({$or: [{ingredientes: {$regex: xy}}, {nombre: {$regex: xy}}]})  
        if (!recipe) {
            throw boom.notFound('recipe not found');
        }
        return recipe;
    }
    

    //Update recipe
    async updateRecipe(id, body) {
        const rta = await Esquema.updateOne({_id:id}, {
            $set:{
                nombre: body.nombre,
                categoria: body.categoria,
                ingredientes: body.ingredientes,
                imagen: body.imagen,
                porciones: body.porciones,
                instrucciones: body.instrucciones
            }
        })
            .clone()
        return rta;
    }

    //Delete recipe
    async deleteRecipe(id) {
        let borrarReceta = await Esquema.findByIdAndDelete(id)
        return (borrarReceta);
    }
}

module.exports = RecetasService;