import Bd from "../repositories/user-repositories.js";
const bd = new Bd();


export default class UsuarioServicios {
    async login(username, password) {
        try {
            const usuario = await bd.buscarUsuarioPorUsername(username);
            if (!usuario) {
                console.log(error)
            }
            if (password !== usuario.password) {
                console.log(error)
            }
            return usuario
        } catch (error) {
            console.error('Error durante el inicio de sesión:');
            throw new Error('Error interno del servidor');
        }
    }   


    async cheqUser(first_name, last_name, username, password){
        if (first_name.length < 3 || last_name.length < 3) {
            return("Los campos first_name o last_name deben tener al menos tres caracteres.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            return("El email es inválido.");
        }
        if (password.length < 3) {
           return("El campo password debe tener al menos tres caracteres.");
        }
        const existingUser = await bd.buscarUsuarioPorUsername(username);
        if(existingUser[0] != null){
            return("Usuario ya existente")
        }
        return true
    }

    async register(firstName, lastName, username, password) {
        try {
            const userId = await bd.autenticarRegistro(firstName, lastName, username, password);
            return { success: true, message: 'Usuario creado con éxito.', userId: userId};
        } catch (error) {
            console.error('Error durante el registro de usuario:');
            throw new Error('Error interno del servidor');
        }
    }
}
