const jwt = require('jsonwebtoken');

const secret = 'myShark';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjY5MjM4NTA5fQ.r0rzYcd-gcGHaMuCcQnnG_9LvWJu4oRY2ieZqSTaZvE'

function verifyToken(token, secret){
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);