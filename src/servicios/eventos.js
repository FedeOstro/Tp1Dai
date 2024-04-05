import { Bd } from "../repositories/events-repositories";

export class EventosServicios{
    getAllEvent(pageSize, requestedPage){
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.name, u.id, u.username, u.first_name, u.last_name,ec.id, ec.name, el.id, el.name, el.full_address, el.latitude, el.longitude, el.max_capacity  
        FROM event e    
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN event_location el ON e.id_envet_location = el.id limit  ${pageSize} offset ${requestedPage}`;
        const result = Bd.Consulta(sql);
        var event = new Object();
        var creator_user = new Object();
        var event_categories  = new Object();
        var event_location = new Object();

    
        description = result.e.description,
        start_Date = result.e.start_date,
        price = result.e.price,
        enable_for_enrollment = result.e.enable_for_enrollment,
        max_assistance = result.e.max_assistance,
        tags = result.t.tags,

        const parsedDB = result.map(row => {
            event.id = row.e.id
            event.name = row.e.name
            event.description = row.e.description
            event.start_date = row.e.start_date
            event.duration_in_minutes = row.e.duration_in_minutes
            event.price = row.e.price
            event.max_assistance = row.e.max_assistance
            event.tags = row.t.name
            creator_user.id = row.u.id
            creator_user.username = row.u.username
            creator_user.first_name = row.u.first_name
            creator_user.last_name = row.u.last_name
            event_categories.id = row.ec.id
            event_categories.name = row.ec.name
            event_location.name = row.el.name
            event_location.full_address = row.el.full_address
            event_location.latitude = row.el.latitude
            el.name, el.full_address, el.latitude, el.longitude, el.max_capacity 
        })

        return{
            collection: parsedDB,
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

    ConsultaEvento(id){
        const sql = `SELECT e.id, e.name, e.description, e.stard_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistence , ec.full_address, ec.longitud, latitud, max_capacity
        FROM event e
        JOIN event_locations ec ON e.id_event_locations = ec.id
        WHERE e.id = '${id}'`;
        const rta = Bd.Consulta(sql)
        return rta
    }

}    