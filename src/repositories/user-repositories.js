import pg from 'pg';
import { bdconfig } from './BD_Config.js';


export default class Bd{

    constructor(){
        this.client = new pg.Client(bdconfig);
        this.client.connect();
    }


    async Consulta(sql) {
        const respuesta = await this.client.query(sql);
        return respuesta;
    }
    
}
