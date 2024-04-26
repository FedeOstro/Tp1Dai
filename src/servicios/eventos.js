import Bd from "../repositories/events-repositories.js";
const bd = new Bd();


export default class EventosServicios{

    getAllEvent(pageSize, requestedPage){
        const result = bd.Consulta1(pageSize, requestedPage);
        var event = new Object();
        var creator_user = new Object();
        var event_categories  = new Object();
        var event_location = new Object();
        parsedDB = result.map(row => {
            event.id = 1 
            event.name = "Concierto 1"
            event.description = "El mejor concierto de la historia"
            event.start_date = '8/7/2000'
            event.duration_in_minutes = 120
            event.price = 30000
            event.max_assistance = 20000
            event.tags = 1
            creator_user.id = 1
            creator_user.username = "Felipa Candado"
            creator_user.first_name = "Felipa"
            creator_user.last_name = "Candado"
            event_categories.id = 1
            event_categories.name = "un buen show"
            event_location.name = "Ciudad Autonoma de Buenos Aires"
            event_location.full_address = "Estadio River Plate"
            event_location.latitude = -70,46546571
            event_location.longitude = 54,44458347
            event_location.max_capacity = 20000
        })
        return{
            collection: parsedDB,
            pagination: {                
                limit: pageSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/event?limit=${pageSize}&offfset=${requestedPage + 1}",
            },
        };

    }
        
    BusquedaEvento(name, category, startDate, tag){
        const result = bd.Consulta2(name, category, startDate, tag)
        console.log(result)
        var event = new Object();
        var creator_user = new Object();
        var event_categories  = new Object();
        var event_location = new Object();
        const parsedDB = {
            id: 3,
            name : "concierto 3",
            description :"el show del siglo",
            start_date : '2024-03-29 00:00:00',
            duration_in_minutes : 133,
            price : 321321,
            max_assistance : 312,
            tags : 'dad',
            id : 2,
            username : "FedeOstro",
            first_name : "Federico",
            last_name : "Ostrovsky",
            id : 2,
            name : "el show",
            name : "Ciudad Autonoma de Buenos Aires",
            full_address : "Estadio de Boca Junior",
            latitude : 80454560,
            longitude : -1054676,
            max_capacity : 100000,
        }
        return(parsedDB)
    }

    ConsultaEvento(id){
        const result = bd.Consulta3(id)
        var event = new Object();
        var event_location = new Object();
        /* paresedDB = result.map(row => {
            event.id = 3
            event.name = "concierto 3"
            event.description = "el show del siglo"
            event.start_date = '2024-03-29 00:00:00'
            event.duration_in_minutes = 165
            event.price = 56000
            event.max_assistance = 50000
            event_location.id_location = 3
            event_location.name = "Ciudad Autonoma de Buenos Aires"
            event_location.full_address = "Estadio de Independiente"
            event_location.longitude = -15,5646546
            event_location.latitude = 14,867979
            event_location.max_capacity = 50000
        }) */

        const paresedDB = {
            id: 3,
            name : "concierto 3",
            description :"el show del siglo",
            start_date : '2024-03-29 00:00:00',
            duration_in_minutes : 165,
            price : 56000,
            max_assistance : 50000,
            id_location : 3,
            full_address : "Estadio de Independiente",
            longitude : -155646546,
            latitude : 14867979,
            max_capacity : 50000,
        }

        return{
            collection: paresedDB,
        };
    }

    ListadoParticiPantes(id, first_name, last_name, username, attended, rating){
        const result = bd.Consulta4(id, first_name, last_name, username, attended, rating)
        var user = new Object();
        parsedDB = result.map(row => {
            user.id = 4
            user.username = "SimonSuken"
            user.first_name = "Simon"
            user.last_name = "Suken"
            row.ee.attended = true
            row.ee.rating = 8
            row.ee.description = "el show"
        })
        return{
            collection: parsedDB,
        };
    }

    CrearEjercicio8Eventos(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        try{
            bd.Consulta5(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
            return("Evento creado efectivamente")
        } catch(error){
            console.log("Error creacion de evento");
            return response.json("Error creacion de evento");
        }
    }
    
    EditarEjercicio8Eventos(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        try{
            bd.Consulta6(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
            return("Evento editado efectivamente")
        } catch(error){
            console.log("Error edicion de evento");
            return response.json("Error edicion de evento");
        }
    }

    EliminarEjercicio8Eventos(id, id_creator_user){
        try{
            bd.Consulta7(id, id_creator_user)
            return("Evento borrado efectivamente")
        } catch(error){
            console.log("Error borrado de evento");
            return response.json("Error borrado de evento");
        }
    }

}    