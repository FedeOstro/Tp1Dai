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
}
