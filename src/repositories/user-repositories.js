import pg from 'pg';
import bdconfig from '../../BD_Config.js';
let pool = await sql.connect(bdconfig)
const client = new pg.Client(DBConfig);
client.connect();

export default class Bd{
    async Consulta(sql) {
        const respuesta = await pool.request().query(sql);
        return respuesta;
    }
    
}
