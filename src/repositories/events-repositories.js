import pg from 'pg';
import { bdconfig } from './BD_Config.js';


export default class Bd{
    
    constructor(){
        const {Client} = pg;
        this.client = new Client(bdconfig);
        this.client.connect();
    }

    async Consulta1(pageSize, requestedPage) {
        const validaciones = []
        if (pageSize) validaciones.push(`limit ${pageSize}`)
        if (requestedPage) validaciones.push(`offset ${requestedPage}`)
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, e.id_creator_user, u.id AS user_id, u.username, u.first_name, u.last_name, ec.id AS eventcat_id, ec.name AS eventcat_name, ec.display_order,
        json_build_object(
            'id', el.id,
            'name', el.name,
            'full_address', el.full_address,
            'latitude', el.latitude,
            'longitude', el.longitude,
            'max_capacity', el.max_capacity
        ) AS event_location,
        json_build_object(
            'id', l.id,
            'name', l.name,
            'latitude', l.latitude,
            'longitude', l.longitude
        ) AS location,
        json_build_object(
            'id', p.id,
            'name', p.name,
            'full_name', p.full_name,
            'latitude', p.latitude,
            'longitude', p.longitude,
            'display_order', p.display_order
        ) AS province,
        array(
            SELECT json_build_object(
                'id', tags.id,
                'name', tags.name
            )
            FROM tags
        ) AS tags
        FROM events e
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_locations el ON e.id_event_location = el.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN locations l ON el.id_location = l.id
        JOIN provinces p ON l.id_province = p.id
        GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16, el.id, l.id, p.id
        ${validaciones.length > 0 ?  `${validaciones.join()}` : null}`;
        const respuesta = await this.client.query(sql);
        return respuesta.rows
    }
    
    async Consulta2(name, category, startDate, tag){ 
        const variables = [name, category, startDate, tag]
        const sql = this.ValidacionConsul2(variables)
        const respuesta = await this.client.query(sql);
        return respuesta.rows;
    }
    
    ValidacionConsul2(variables){
        const validaciones = []
        if (variables[0]) validaciones.push(`e.name = '${variables[0]}'`)
        if (variables[1]) validaciones.push(`ec.name = '${variables[1]}'`)
        if (variables[2]) validaciones.push(`e.start_date = ${variables[2]}`)
        if (variables[3]) validaciones.push(`t.name = '${variables[3]}'`)  
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, e.id_creator_user, u.id AS user_id, u.username, u.first_name, u.last_name, ec.id AS eventcat_id, ec.name AS eventcat_name, ec.display_order,
        json_build_object(
            'id', el.id,
            'name', el.name,
            'full_address', el.full_address,
            'latitude', el.latitude,
            'longitude', el.longitude,
            'max_capacity', el.max_capacity
        ) AS event_location,
        json_build_object(
            'id', l.id,
            'name', l.name,
            'latitude', l.latitude,
            'longitude', l.longitude
        ) AS location,
        json_build_object(
            'id', p.id,
            'name', p.name,
            'full_name', p.full_name,
            'latitude', p.latitude,
            'longitude', p.longitude,
            'display_order', p.display_order
        ) AS province,
        array(
            SELECT json_build_object(
                'id', tags.id,
                'name', tags.name
            )
            FROM tags
        ) AS tags
        FROM events e
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_locations el ON e.id_event_location = el.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN locations l ON el.id_location = l.id
        JOIN provinces p ON l.id_province = p.id
        ${variables.length > 0 ?  ` AND ${validaciones.join(' AND ')}` : null}`;
        const groupby = ` GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16, el.id, l.id, p.id`
        const sql2 = sql + groupby
        return sql2;
    }
    
    async Consulta3(id){
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, e.id_creator_user,u.id as user_id, u.username, u.first_name, u.last_name, ec.id as eventcat_id, ec.name as eventcat_name, el.id as el_id, el.name as el_name, el.full_address, el.latitude, el.longitude, el.max_capacity, 
        array( select json_build_object(
            'id', tags.id,
            'name', tags.name
        )FROM tags ) as tags
            FROM events e    
            JOIN users u ON e.id_creator_user = u.id
            INNER JOIN event_categories ec ON e.id_event_category = ec.id
            JOIN event_locations el ON e.id_event_location = el.id
            INNER JOIN event_tags et ON e.id = et.id_event
            JOIN tags t ON et.id_tag = t.id
        WHERE e.id = ${id} group by 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 `;
        const respuesta = await this.client.query(sql);
        return respuesta; 
    }

    async Consulta4(id, first_name, last_name, username, attended, rating){
        const sql = `SELECT u.id, u.username, u.first_name, u.last_name, ee.attended, ee.rating, ee.description 
        FROM users 
        JOIN event_enrollments ee ON u.id = ee.id_user
        WHERE u.id = '${id}' AND u.username = '${username}' AND u.first_name = '${first_name}' AND u.last_name = '${last_name}' AND ee.attended = '${attended}' AND ee.rating = '${rating}'`
        const respuesta = await this.client.query(sql);
        return respuesta
    }

    async Consulta5(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `INSERT INTO events (id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
        values ('${id}', '${name}', '${description}', '${id_event_category}', '${id_envet_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')`;
        const respuesta = await this.client.query(sql);
        return respuesta
    }

    async Consulta6(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `UPDATE events SET id = '${id}', name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_envet_location = '${id_envet_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}' 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const respuesta = await this.client.query(sql);
        return respuesta
    }

    async Consulta7(id, id_creator_user){
        const sql = `DELETE * FROM events 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const respuesta = await this.client.query(sql);
        return respuesta
    }
}
