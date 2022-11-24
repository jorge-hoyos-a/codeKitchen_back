const bcrypt = require('bcrypt');

async function verifyPassword() {
    const myPass = 'admin123.2022';
    const myHash = '$2b$10$53t.OhDbb5LnN.ZW0kwHDe2C88dItfMRMDKD8pJKD3oJNxKkmXyx.';
    const isMatch = await bcrypt.compare(myPass, myHash);
    console.log(isMatch);
}

verifyPassword();