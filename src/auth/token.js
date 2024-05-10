import jwt from 'jsonwebtoken';

//info del token, 
const payload = {
    id: 'id',
    username: 'username'
};

const secretKey = 'contraseña123';

const options = {
    expiresIn : '1h',
    issuer : 'mi_organizacion',
    algorithm: hmacSha256
}

const token = jwt.sign(payload, secretKey, options)
console.log(token);