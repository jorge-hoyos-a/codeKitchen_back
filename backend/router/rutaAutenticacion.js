const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config')

const rutaAuth = express.Router();

rutaAuth.post('/login', 
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user
            const payload = {
                sub: user.id,
                role: 'user'
            }
            const token = jwt.sign(payload, config.jwtSecret);
            res.json({
                user,
                token
            });
        } catch (error) {
            next(error)
        }
    }
);

module.exports = rutaAuth;