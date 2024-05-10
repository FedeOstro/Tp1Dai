import Bd from "../repositories/events-repositories.js";
const bd = new Bd();


export default class EventosServicios{

    parsedOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }

    parsedLimit(limit){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
    }

    async getAllEvent(pageSize, requestedPage){
        const pageSizes = this.parsedLimit(pageSize)
        const requestedPages = this.parsedOffset(requestedPage)
        const result = await bd.Consulta1(pageSizes, requestedPages);
        var event = new Object();
        var creator_user = new Object();
        var event_categories  = new Object();
        var event_location = new Object();
        parsedDB = result.map(row => {
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
            event.tags = row.tags_name
            creator_user.id = row.user_id
            creator_user.username = row.username
            creator_user.first_name = row.first_name
            creator_user.last_name = row.last_name
            event_categories.id = row.eventcat_id
            event_categories.name = row.eventcat_name
            event_location.id = row.el_id
            event_location.name = row.el_name
            event_location.full_address = row.full_address
            event_location.latitude = row.latitude
            event_location.longitude = row.longitude
            event_location.max_capacity = row.max_assistance
            return
        })
        return{
            collection: parsedDB,
            pagination: {
                limit: pageSize,
                offset: requestedPage,
                nextPage: ((parsedOffset + 1) * parsedLimit <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${parsedLimit}&offset=${parsedOffset + 1}${(eventName) ? `&eventName=${eventName}` : null}${(eventCategory) ? `&eventCategory=${eventCategory}` : null} ${(eventDate) ? `&eventDate=${eventDate}` : null}${(eventTag) ? `&eventTag=${eventTag}` : null}` : null,
                total: totalCount,   
            }
        } 
    }
         
 

 
    async BusquedaEvento(name, category, startDate, tag){
        const result = await bd.Consulta2(name, category, startDate, tag)
        
        console.log(result)
        const parsedDB = result.map(row => {
            var event = new Object();
            var creator_user = new Object();
            var event_categories  = new Object();
            var event_location = new Object();
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
            creator_user.id = row.user_id
            creator_user.username = row.username
            creator_user.first_name = row.first_name
            creator_user.last_name = row.last_name
            event_categories.id = row.eventcat_id
            event_categories.name = row.eventcat_name
            event_location.id = row.el_id
            event_location.name = row.el_name
            event_location.full_address = row.full_address
            event_location.latitude = row.latitude
            event_location.longitude = row.longitude
            event_location.max_capacity = row.max_assistance
            return{
                event: event,
                creator_user: creator_user,
                event_categories: event_categories,
                event_location: event_location,
                tags: row.tags
            }
        })
        return(parsedDB)
    }

    async ConsultaEvento(id){
        const result = bd.Consulta3(id)
        var event = new Object();
        var event_location = new Object();
        paresedDB = result.map(row => {
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.max_assistance = row.max_assistance
            event_location.id_location = row.id_location
            event_location.name = row.el_name
            event_location.full_address = row.full_address
            event_location.longitude = row.longitude
            event_location.latitude = row.latitude
            event_location.max_capacity = row.max_capacity
        }) 
        return{
            collection: paresedDB,
        };
    }

    async ListadoParticiPantes(id, first_name, last_name, username, attended, rating){
        const result = bd.Consulta4(id, first_name, last_name, username, attended, rating)
        var user = new Object();
        parsedDB = result.map(row => {
            user.id = row.id
            user.username = row.username
            user.first_name = row.first_name
            user.last_name = row.last_name
            attended = row.ee.attended
            rating = row.ee.rating 
            description = row.ee.description 
        }) 
        return{
            collection: parsedDB,
        };
    }

    async CrearEjercicio8Eventos(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        try{
            bd.Consulta5(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
            return("Evento creado efectivamente")
        } catch(error){
            console.log("Error creacion de evento");
            return response.json("Error creacion de evento");
        }
    }
    
    async EditarEjercicio8Eventos(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        try{
            bd.Consulta6(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
            return("Evento editado efectivamente")
        } catch(error){
            console.log("Error edicion de evento");
            return response.json("Error edicion de evento");
        }
    }

    async EliminarEjercicio8Eventos(id, id_creator_user){
        try{
            bd.Consulta7(id, id_creator_user)
            return("Evento borrado efectivamente")
        } catch(error){
            console.log("Error borrado de evento");
            return response.json("Error borrado de evento");
        }
    }

    

}  

  