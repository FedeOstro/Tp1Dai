import pg from 'pg';
import { bdconfig } from '../../BD_Config';

const client = new pg.Client(DBConfig);
clinet.connect();

export class Bd{
    async Consulta1(pageSize, requestedPage) {
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.name, u.id, u.username, u.first_name, u.last_name,ec.id, ec.name, el.id, el.name, el.full_address, el.latitude, el.longitude, el.max_capacity  
        FROM event e    
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN event_location el ON e.id_envet_location = el.id limit  ${pageSize} offset ${requestedPage}`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    
    async Consulta2(name, category, startDate, tag){ 
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.name, u.id, u.username, u.first_name, u.last_name,ec.id, ec.name, el.id, el.name, el.full_address, el.latitude, el.longitude, el.max_capacity  
        FROM event e    
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN event_location el ON e.id_envet_location = el.id
        WHERE e.name = '${name}' AND ec.name = '${category}' AND e.start_date = '${startDate}' AND t.name = '${tag}`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    
    async Consulta3(id){
        const sql = `SELECT e.id, e.name, e.description, e.stard_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance , el.id_location, el.name, el.full_address, el.longitude, el.latitude, el.max_capacity
        FROM event e
        JOIN event_locations el ON e.id_event_locations = el.id
        WHERE e.id = '${id}'`;
        const respuesta = await client.query(sql)
        return respuesta; 
    }

    async Consulta4(id, first_name, last_name, username, attended, rating){
        const sql = `SELECT u.id, u.username, u.first_name, u.last_name, ee.attended, ee.rating, ee.description 
        FROM users 
        JOIN event_enrollments ee ON u.id = ee.id_user
        WHERE u.id = '${id}' AND u.username = '${username}' AND u.first_name = '${first_name}' AND u.last_name = '${last_name}' AND ee.attended = '${attended}' AND ee.rating = '${rating}'`
        const respuesta = await client.query(sql)
        return respuesta
    }

    async Consulta5(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `INSERT INTO events (id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
        values ('${id}', '${name}', '${description}', '${id_event_category}', '${id_envet_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')`;
        const respuesta = await client.query(sql)
        return respuesta
    }

    async Consulta6(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `UPDATE event SET id = '${id}', name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_envet_location = '${id_envet_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}' 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const respuesta = await client.query(sql)
        return respuesta
    }

    async Consulta7(id, id_creator_user){
        const sql = `DELETE * 
        FROM events 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const respuesta = await client.query(sql)
        return respuesta
    }
}
