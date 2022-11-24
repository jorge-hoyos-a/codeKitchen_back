require('dotenv').config();

const config = {
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET 
}

module.exports = { config };