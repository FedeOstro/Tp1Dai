import express from "express";
import UsuarioServicios1 from "../servicios/user.js";

const router = express.Router();
const UsuarioServicios = new UsuarioServicios1();

router.post("/login", async (request, response) => {
    const { username, password } = request.body;
    try {
        const AutenticarUsuario = await UsuarioServicios.autenticarUsuario(username, password);
        return response.json(AutenticarUsuario);
    } catch(error) {
        console.log("Error ejercicio 6 login:", error);
        return response.json("Error ejercicio 6 login");
    }
});

router.get("/register", async (request, response) => {
    const { first_name, last_name, username, password } = request.query;
    try {
        const AutenticarRegistro = await UsuarioServicios.autenticarRegistro(first_name, last_name, username, password);
        return response.json(AutenticarRegistro);
    } catch(error) {
        console.log("Error ejercicio 6 register:", error);
        return response.json("Error ejercicio 6 register");
    }
});

export default router;
