import pg from 'pg';
import { bdconfig } from './BD_Config.js';

export default class Bd {
    constructor() {
        const {Client} = pg;
        this.client = new pg.Client(bdconfig);
        this.client.connect();
    }

    async Consulta(sql, values = []) {
        try {
            const respuesta = await this.client.query(sql, values);
            return respuesta;
        } catch (error) {
            throw new Error("Error al realizar la consulta: " + error.message);
        }
    }

     async autenticarUsuario(username, password) {
        const sql = `
            SELECT *
            FROM users
            WHERE username = $1 AND password = $2
        `;
        const values = [username, password];
        
        try {
            const respuesta = await pool.query(sql, values);
            return respuesta.rows[0];
        } catch (error) {
            console.error("Error al autenticar usuario:", error);
            throw new Error("Error al autenticar usuario");
        }
    }

    async autenticarRegistro(first_name, last_name, username, password) {
        const existingUser = await this.buscarUsuarioPorUsername(username);
        if (existingUser) {
            throw new Error("El nombre de usuario ya está en uso.");
        }

        const sql = `
            INSERT INTO users (first_name, last_name, username, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `;
        const values = [first_name, last_name, username, password];

        try {
            const respuesta = await pool.query(sql, values);
            return respuesta.rows[0].id;
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            throw new Error("Error al registrar usuario");
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
            const respuesta = await pool.query(sql, values);
            return respuesta.rows[0];
        } catch (error) {
            console.error("Error al buscar usuario por nombre de usuario:", error);
            throw new Error("Error al buscar usuario por nombre de usuario");
        }
    }
}
