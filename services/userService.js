const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const Esquema = require('../Modelos/bd_usuarios');

class UserService {
    //constructor() { }

    //Create new user
    async createUser(body) {
        const hashedPswd = await bcrypt.hash(body.pswd, 10);
        const newUser = new Esquema({
            nombres:body.nombres,
            apellidos: body.apellidos,
            edad: body.edad,
            ciudad: body.ciudad,
            email: body.email,
            pswd: body.pswd
        });

        newUser.pswd = hashedPswd;
        await newUser.save()
        delete newUser["pswd"];
        return newUser;
    }

    // Find all users
    async findAllUsers() {
        const rta = await Esquema.find({});
        return rta;
    }

    //Find user by id
    async findUser(id) {
        const user = await Esquema.findById(id)
        if (!user) {
            throw boom.notFound('user not found');
        }
        return user;
    }

    //Find user by name
    async findUserByName(xy) {
        const user = await Esquema.find({nombres: {$regex: xy}}) 
        if (!user) {
            throw boom.notFound('user not found');
        }
        return user;
    }
    
    //Find user by email
    async findUserByEmail(email) {
        let yz = new RegExp(email, "i")
        const user = await Esquema.findOne({email: {$regex: yz}})  
        if (!user) {
            throw boom.notFound('user not found');
        }
        return user;
    }

    //Update user
    async updateUser(id, body) {
        const rta = await Esquema.updateOne({_id:id}, {
            $set:{
                nombres:body.nombres,
                apellidos: body.apellidos,
                edad: body.edad,
                ciudad: body.ciudad,
                email: body.email,
            }
        })
            .clone()
        return rta;
    }

    //Delete user
    async deleteUser(id) {
        let borrarUsuario = await Esquema.findByIdAndDelete(id)
        return (borrarUsuario);
    }
}

module.exports = UserService;