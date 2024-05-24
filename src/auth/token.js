import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function generarToken(usuario) {
    const options = {
        expiresIn: "1h", // Opcional: tiempo de expiración del token
        issuer: "Fede_Simon",
    };

    // Genera el payload del token utilizando los datos del usuario
    const payload = {
        id: usuario.id,
        username: usuario.username,
        // Agrega cualquier otro dato necesario para tu aplicación
    };

    // Genera y devuelve el token JWT firmado
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);
    return token;
}
