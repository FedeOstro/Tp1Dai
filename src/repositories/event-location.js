import pg from 'pg';
import { bdconfig } from './BD_Config.js';
import { query } from 'express';


export default class Bd{
    
    constructor(){
        const {Client} = pg;
        this.client = new Client(bdconfig);
        this.client.connect();
    }

    async consulta1(limit, offset, id){
        const bd = `SELECT * FROM event_locations limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(bd);
        return respuesta.rows
    }
    
    async consulta2(id, limit, offset){
        const bd = `SELECT * FROM event_locations WHERE id = '${id}' limit '${limit}' offset '${offset}'`
        const respuesta = await this.client.query(bd)
        return respuesta.rows
    }

    async consulta3(name, display_order){
        const bd = `INSERT INTO event_locations (name, display_order) values ('${name}', '${display_order}')`
        const rta = await this.client.query(bd)
        return rta
    }

    async consulta4(id, name, display_order){
        const bd = `UPDATE event_locations SET name = '${name}', display_order = '${display_order}' WHERE id = '${id}'`
        const rta = await this.client.query(bd)
        return rta
    }

    async consulta5(id){
        const bd = `DELETE FROM event_locations WHERE id = '${id}'`
        const rta = await this.client.query(bd)
        return rta
    }
}