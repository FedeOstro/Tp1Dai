import jwt from 'jsonwebtoken';

const secretKey = 'contraseña123';
let token = '';
let payloadOriginal = null;

try{
    payloadOriginal = await jwt.verify(token, secretKey);
}catch(error){
    console.error(error)
}

console.log(payloadOriginal)