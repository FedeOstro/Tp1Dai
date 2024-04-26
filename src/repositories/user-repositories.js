import pg from 'pg';
import { bdconfig } from './BD_Config.js';
const client = new pg.Client(bdconfig);
client.connect();

export default class Bd{
    async Consulta(sql) {
        const respuesta = await pool.request().query(sql);
        return respuesta;
    }
    
}
