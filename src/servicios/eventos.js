import { Bd } from "../repositories/events-repositories";

export class EventosRecolectar{
    getAllEvent(pageSize, requestedPage){
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.name, u.id, u.username, u.first_name, u.last_name,ec.id, ec.name, el.id, el.name, el.full_address, el.latitude, el.longitude, el.max_capacity  
        FROM event e    
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN event_location el ON e.id_envet_location = el.id limit  ${pageSize} offset ${requestedPage}`;
        const result = Bd.Consulta(sql);
        throw new Error("Error en el sevicio de events")
        return{
            collection: result,
            pagination: {
                limit: pagaSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/event?limit=${pageSize}&offfset=$(requestedPage + 1)",
            },
        };

    }

    BusquedaEvento(name, category, startDate, tag){
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.name, u.id, u.username, u.first_name, u.last_name,ec.id, ec.name, el.id, el.name, el.full_address, el.latitude, el.longitude, el.max_capacity  
            FROM event e    
            JOIN users u ON e.id_creator_user = u.id
            JOIN event_categories ec ON e.id_event_category = ec.id
            JOIN event_tags et ON e.id = et.id_event
            JOIN tags t ON et.id_tag = t.id
            JOIN event_location el ON e.id_envet_location = el.id
            WHERE e.name = '${categorias.name}' AND ec.name = '${categorias.category}' AND e.start_date = '${categorias.startDate}' AND t.name = '${categorias.tag}`;

        const rta = Bd.Consulta(sql)
        return rta
    }

    RecolectUsuario(first_name, last_name, username, attended, rating){
        const sql = `SELECT id, username, first_name, last_name
            FROM users 
            JOIN event_enrolments ee ON users.id = ee, `

    }

    ConsultaEvento(id){
        const sql = `SELECT e.id, e.name, e.description, e.stard_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistence , ec.full_address, ec.longitud, latitud, max_capacity
        FROM event e
        JOIN event_locations ec ON e.id_event_locations = ec.id
        WHERE e.id = '${id}'`;
        const rta = Bd.Consulta(sql)
        return rta
    }

    autenticarUsuario(username, password){
        const sql = `UPDATE username, password 
        FROM users
        `
        //El profe lo tiene q explicar
        const rta = Bd.Consulta(sql)
        return rta
    }

    autenticarRegistro(first_name, last_name, username, password){
        const sql = `UPDATE first_name, last_name, username, password 
        FROM users
        `
        //El profe lo tiene q explicar
        const rta = Bd.Consulta(sql)
        return rta
    }

}