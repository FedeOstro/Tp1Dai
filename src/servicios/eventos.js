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
        parsedDB = result.map(row => {
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
            event_location.longitude = row.el.longitude
            event_location.max_capacity = row.el.max_capacity
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
        WHERE e.name = '${name}' AND ec.name = '${category}' AND e.start_date = '${startDate}' AND t.name = '${tag}`;
        const result = Bd.Consulta(sql)        
        var event = new Object();
        var creator_user = new Object();
        var event_categories  = new Object();
        var event_location = new Object();
        parsedDB = result.map(row => {
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
            event_location.longitude = row.el.longitude
            event_location.max_capacity = row.el.max_capacity
            })
        return{
            collection: parsedDB,
        };
    }

    ConsultaEvento(id){
        const sql = `SELECT e.id, e.name, e.description, e.stard_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance , el.id_location, el.name, el.full_address, el.longitude, el.latitude, el.max_capacity
        FROM event e
        JOIN event_locations el ON e.id_event_locations = el.id
        WHERE e.id = '${id}'`;
        const result = Bd.Consulta(sql)
        var event = new Object();
        var event_location = new Object();
        paresedDB = result.map(row => {
            event.id = row.e.id
            event.name = row.e.name
            event.description = row.e.description
            event.start_date = row.e.start_date
            event.duration_in_minutes = row.e.duration_in_minutes
            event.price = row.e.price
            event.max_assistance = row.e.max_assistance
            event_location.id_location = row.e.id_locations
            event_location.name = row.e.name
            event_location.full_address = row.e.full_address
            event_location.longitude = row.e.longitude
            event_location.latitude = row.e.latitude
            event_location.max_capacity = row.e.max_capacity
        })
        return{
            collection: paresedDB,
        };
    }

    CrearEjercicio8Eventos(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `INSERT INTO events (id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
        values ('${id}', '${name}', '${description}', '${id_event_category}', '${id_envet_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')`;
        try{
            Bd.Consulta(sql)
            return("Evento creado efectivamente")
        } catch(error){
            console.log("Error creacion de evento");
            return response.json("Error creacion de evento");
        }
    }
    
    EditarEjercicio8Eventos(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `UPDATE event SET id = '${id}', name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_envet_location = '${id_envet_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}' 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        try{
            Bd.Consulta(sql)
            return("Evento editado efectivamente")
        } catch(error){
            console.log("Error edicion de evento");
            return response.json("Error edicion de evento");
        }
    }

    EliminarEjercicio8Eventos(id, id_creator_user){
        const sql = `DELETE * 
        FROM events 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        try{
            Bd.Consulta(sql)
            return("Evento borrado efectivamente")
        } catch(error){
            console.log("Error borrado de evento");
            return response.json("Error borrado de evento");
        }
    }

}    