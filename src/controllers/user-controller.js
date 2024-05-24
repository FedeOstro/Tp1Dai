import express from "express";
import UsuarioServicios1 from "../servicios/user.js";
import generarToken from "../auth/token.js"; 
import AuthMiddleware from "../auth/AuthMiddleware.js"


const router = express.Router();
const UsuarioServicios = new UsuarioServicios1();

router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const usuario = await UsuarioServicios.autenticarUsuario(
      username,
      password
    );
    if (!usuario) {
      return response.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = await generarToken(usuario);
    return response.json({ token });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    return response.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/register", async (request, response) => {
  const { first_name, last_name, username, password } = request.body;
  try {
    const AutenticarRegistro = await UsuarioServicios.autenticarRegistro(
      first_name,
      last_name,
      username,
      password
    );
    return response.json(AutenticarRegistro);
  } catch (error) {
    console.error("Error durante el registro de usuario:", error);
    return response.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/", AuthMiddleware, async (request, response) => {
    try {
        const usuario = request.user;
        return response.json(usuario);
    } catch(error) {
        console.error("Error al obtener la información del usuario:", error);
        return response.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
