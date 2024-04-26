import pg from 'pg';
import { bdconfig } from './BD_Config.js';
const client = new pg.Client(bdconfig);
client.connect();

export default class Bd{
    async Consulta1(sql) {
        const respuesta = await pool.request().query(sql);
        return respuesta;
    }
    
    async Consulta2(id){
        const sql = `SELECT * from provinces WHERE id = ${id}`
        const respuesta = await pool.request().query(sql);
        return respuesta
    }
    
    async Consulta3(id, name, full_name, latitude, longitude, display_order){
        const sql = `INSERT INTO provinces (id, name, full_name, latitude, longitude, display_order) 
        values (${id}, ${name}, ${full_name}, ${latitude}, ${longitude}, ${display_order})`
        const respuesta = await pool.request().query(sql);
        return respuesta
    }

    async Consulta4(id, name, full_name, latitude, longitude, display_order){
        const sql = `UPDATE provinces SET name = '${name}', full_name = '${full_name}', latitude = '${latitude}', longitude = '${longitude}', display_order = '${display_order}' 
        WHERE id = '${id}'`
        const respuesta = await pool.request().query(sql);
        return respuesta
    }
    
    async Consulta5(id){
        const sql = `DELETE * 
        FROM provinces 
        WHERE id = '${id}'`
        const respuesta = await pool.request().query(sql);
        return respuesta
    }

}