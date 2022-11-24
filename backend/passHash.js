const bcrypt = require('bcrypt');

async function hashPassword() {
    const myPass = 'admin123.2022';
    const hash = await bcrypt.hash(myPass, 10);
    console.log(hash);
}

hashPassword();