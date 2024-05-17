import jwt from "jsonwebtoken"

console.log(token);

export default async function (Usuario){

const secretKey = "contraseña123:)";

const options={
    expires:"1h",
    issuer:"Fede_Simon"
}

const payload=Usuario.id


return jwt.sign(payload,secretKey,options);
}