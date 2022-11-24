const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/userService');
const service = new UserService();

const localStrategy = new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
    try {
        const user = await service.findUserByEmail(email);
        if (!user) {
            done(boom.unauthorized(), false)
        }
        const isMatch = await bcrypt.compare(password, user.pswd);
        if (!isMatch) {
            done(boom.unauthorized(), false)
        }
        delete user.pswd;
        done(null, user);
    } catch (error) {
        done(error, false)    //El false indica que no fue posible hacer la validación
    }
});

module.exports = localStrategy;