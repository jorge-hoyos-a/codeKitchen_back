const jwt = require('jsonwebtoken');

const secret = 'myShark';
const payload = {
    sub: 1,
    role: 'user'
}

function signToken(payload, secret){
    return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);