import jwt from 'jsonwebtoken';

export default async function (token){
    const secretKey = 'contraseña123';
    let payloadOriginal = null;

try{
    payloadOriginal = jwt.verify(token, secretKey);
}catch(error){
    console.error(error)
}

}


