import express, { response } from "express";
import UsuarioServicios from "../servicios/user.js";
import generarToken from "../auth/token.js"; 
import AuthMiddleware from "../auth/AuthMiddleware.js"; 

const router = express.Router();
const usuarioServicios = new UsuarioServicios();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await usuarioServicios.login(username, password);
        if(usuario == 400){
            res.status = usuario 
            return response.json ("Usuario Invalido")
        }else if (usuario == 401){
            res.status = usuario
            return response.json ("Contraseña Invalida")
        }else{
            const token = await generarToken(usuario);
            return res.json({
                success: true,
                message: "",
                token: token
            });
        }
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error.message);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message,
            token: ""
        });
    }
});

router.post("/register", async (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    const cheq = await usuarioServicios.cheqUser(first_name, last_name, username, password)
    if(cheq != true){
        return response.json(cheq)
    }
    try {
        const resultadoRegistro = await usuarioServicios.register(first_name, last_name, username, password);
        return res.status(201).json({
            success: true,
            message: resultadoRegistro.message,
            userId: resultadoRegistro.userId
        });
    } catch (error) {
        console.error("Error durante el registro de usuario:", error.message);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
});

router.get("/", AuthMiddleware, async (req, res) => {
    try {
        const usuario = req.user;
        return res.json(usuario);
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error.message);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
