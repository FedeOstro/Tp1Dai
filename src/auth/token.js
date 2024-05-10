import jwt from 'jsonwebtoken';

//info del token, 
const payload = {
    userid: 'sd'
}

const secretKey = 'clave123'

const options = {
    expiresIn : '1h',
    issuer : 'mi_organizacion',
    algorithm: hmacSha256
}

