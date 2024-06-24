import pg from 'pg';
import { bdconfig } from './BD_Config.js';


export default class Bd{
    
    constructor(){
        const {Client} = pg;
        this.client = new Client(bdconfig);
        this.client.connect();
    }

    async consulta1(limit, offset, id){
        const bd = `SELECT * FROM event_categories limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(bd);
        return respuesta.rows
    }
    
    async consulta2(id, limit, offset){
        const bd = `SELECT * FROM event_categories WHERE id = ${id}' limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(bd)
        return respuesta.rows
    }

    async consulta3(name, display_order){
        const bd = `INSERT INTO event_category (name, display_order) values ('${name}', '${display_order}')`
        const rta = await this.client.query(bd)
        return rta
    }

    async consulta4(name, display_order){
        const bd = `UPDATE event_category SET name = ${name}, display_order = ${display_order}`
        const rta = await this.client.query(bd)
        return rta
    }
}