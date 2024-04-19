import pg from 'pg';
//import { bdconfig } from '../../BD_Config';

//const client = new pg.Client(DBConfig);
//clinet.connect();

export default class Bd{
    async Consulta(sql) {
        const respuesta = await client.query(sql);
        return respuesta;
    }
    
}
