import jwt from 'jsonwebtoken';

const secretKey = '';
let token = '';
let payloadOriginal = null;

try{
    payloadOriginal = await jwt.verify(token, secretKey);
}catch(error){
    console.error(error)
}
