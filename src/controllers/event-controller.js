import express from "express"
import EventosServicios from "../servicios/eventos.js";    
const router = express.Router()
const eventService = new EventosServicios();

router.get("/",  (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;
    if(limit != null || offset != null){
        try {
            const todoseventos = eventService.getAllEvent(limit, offset);
            return response.json(todoseventos);
        }catch(error){
            console.log("Error ej2 controller");
            return response.json("Error ej2 controller");
        }
    }else if(name != null || category != null || startDate != null || tag != null){
        try {
            const BusquedaEvent = eventService.BusquedaEvent(name, category, startDate, tag);
            return response.json(BusquedaEvent);
        } catch(error){
            console.log("Ej 3 controller")
            return response.json("Ej 3 controller")
        }
    }else{
        console.log("error endpoint /")
        return response.json("Faltan variables para la busqueda")
    }
    
})


router.get("/:id", (request, response) => {
    try {  
        const evento = EventosServicios.ConsultaEvento(request.params.id);
        return response.json(evento)
    } catch(error){
        console.log("Error ejercicio 4 controller")
        return response.json("No se encontro evento")
    }
})

router.get("/:id/enrollment", (request, respose) => {
    const first_name = request.query.first_name
    const last_name = request.query.last_name
    const username = request.query.username
    const attended = request.query.attended
    const rating = request.query.rating
    if(first_name != null || last_name != null || username != null || attended != attended || attended != null || rating != null){
        try{
            const usuario = EventosServicios.ListadoParticiPantes(request.params.id, first_name, last_name, username, attended, rating)
            return respose.json(usuario)
        }catch(error){
            console.log("Error ejercicio 5 controller")
            return respose.json("No se encontro al usuario")
        }
    }else{
        try{
            const verificarInscripcion = EventosServicios.verificarInscripcion(request.params.id)
            return response.json(verificarInscripcion)
        }catch(error){
            console.log("Error ejercicio 9 controller")
            return response.json("No se puede inscribir al evento")
        }
    }
    
    
})

router.post("/creation_event", (request, response) => {
    const id = request.query.id
    const name = request.name.id
    const description = request.description.id
    const id_event_category = request.id_event_category.id
    const id_envet_location = request.id_envet_location.id
    const start_date = request.start_date.id
    const duration_in_minutes = request.duration_in_minutes.id
    const price = request.price.id
    const enabled_for_enrollment = request.enabled_for_enrollment.id
    const max_assistance = request.max_assistance.id
    const id_creator_user = request.id_creator_user.id
    try{
        const confirmacion = EventosServicios.CrearEjercicio8(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        return response.json(confirmacion)
    } catch(error){
        console.log("Error en creacion de eventos controller")
        return response.json("Error en la creacion")
    }
})

router.put("/:id/:id_creator_user/edition_event", (request, response) => {
    const name = request.query.name
    const description = request.query.description
    const id_event_category = request.query.id_event_category
    const id_envet_location = request.query.id_envet_location
    const start_date = request.query.start_date
    const duration_in_minutes = request.query.duration_in_minutes
    const price = request.query.price
    const enabled_for_enrollment = request.query.enabled_for_enrollment
    const max_assistance = request.query.max_assistance
    try{
        const confirmacion = EventosServicios.EditarEjercicio8Eventos(request.params.id, request.params.id_creator_user, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance)
        return response.json(confirmacion)
    } catch(error){
        console.log("Error en edicion de eventos controller")
        return response.json("Error en edicion de eventos")
    }
})

router.delete("/:id/:id_creator_user/delete_event", (request, response) => {
    try{
        const confirmacion = EventosServicios.EliminarEjercicio8Eventos(request.params.id, request.params.id_creator_user)
        return response.json(confirmacion)
    }catch(error){
        console.log("Error en el delete eventos")
        return response.json("Errro en borrado de evento")
    }
})

export default router;