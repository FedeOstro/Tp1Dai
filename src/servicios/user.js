import Bd from "../repositories/user-repositories.js";
const bd = new Bd();


export default class UsuarioServicios {
    async autenticarUsuario(username, password) {
        const sql = `
            SELECT *
            FROM users
            WHERE username = $1 AND password = $2
        `;
        const values = [username, password];
        try {
            const rta = await bd.Consulta(sql, values);
            return rta.rows[0]; // Devuelve el usuario autenticado si se encuentra
        } catch (error) {
            throw new Error("Error al autenticar usuario: " + error.message);
        }
    }

    async autenticarRegistro(first_name, last_name, username, password) {
        // Verificar si el nombre de usuario ya existe en la base de datos
        const existingUser = await this.buscarUsuarioPorUsername(username);
        if (existingUser) {
            throw new Error("El nombre de usuario ya está en uso.");
        }

        // Si el nombre de usuario no existe, registrar al nuevo usuario
        const sql = `
            INSERT INTO users (first_name, last_name, username, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [first_name, last_name, username, password];
        try {
            const rta = await Bd.Consulta(sql, values);
            return rta.rows[0]; // Devuelve el nuevo usuario registrado
        } catch (error) {
            throw new Error("Error al registrar usuario: " + error.message);
        }
    }

    async buscarUsuarioPorUsername(username) {
        const sql = `
            SELECT *
            FROM users
            WHERE username = $1
        `;
        const values = [username];
        try {
            const rta = await Bd.Consulta(sql, values);
            return rta.rows[0]; // Devuelve el usuario si se encuentra
        } catch (error) {
            throw new Error("Error al buscar usuario por nombre de usuario: " + error.message);
        }
    }
}
