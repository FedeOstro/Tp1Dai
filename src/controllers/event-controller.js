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
    const url = request.originalUrl;
    if(limit != null || offset != null){
        try {
            const todoseventos = eventService.getAllEvent(limit, offset, url);
            return response.json(todoseventos);
        }catch(error){
            console.log("Error ej2 controller");
            return response.json("Error ej2 controller");
        }
    }else if(name != null || category != null || startDate != null || tag != null){
        try {
            console.log("test 1 ")
            const BusquedaEvent = eventService.BusquedaEvento(name, category, startDate, tag);

            return response.json(BusquedaEvent);
        } catch(error){
            console.log(error)
            return response.json(error)
        }
    }else{
        console.log("error endpoint /")
        return response.json("Faltan variables para la busqueda")
    }
    
})


router.get("/:id", (request, response) => {
    try {  
        const evento = eventService.ConsultaEvento(request.params.id);
        return response.json(evento)
    } catch(error){
        console.log("Error ejercicio 4 controller")
        return response.json("No se encontro evento")
    }
})

router.get("/:id/enrollment", (request, respose) => {
    const first_name = request.body.first_name
    const last_name = request.body.last_name
    const username = request.body.username
    const attended = request.body.attended
    const rating = request.body.rating
    if(first_name != null || last_name != null || username != null || attended != attended || attended != null || rating != null){
        try{
            const usuario = eventService.ListadoParticiPantes(request.params.id, first_name, last_name, username, attended, rating)
            return respose.json(usuario)
        }catch(error){
            console.log("Error ejercicio 5 controller")
            return respose.json("No se encontro al usuario")
        }
    }else{
        try{
            const verificarInscripcion = eventService.verificarInscripcion(request.params.id)
            return response.json(verificarInscripcion)
        }catch(error){
            console.log("Error ejercicio 9 controller")
            return response.json("No se puede inscribir al evento")
        }
    }
    
    
})

router.post("/:id", (request, response) => {
    const name = request.body.name
    const description = request.body.description
    const id_event_category = request.body.id_event_category
    const id_envet_location = request.body.id_event_location
    const start_date = request.body.start_date
    const duration_in_minutes = request.body.duration_in_minutes
    const price = request.body.price
    const enabled_for_enrollment = request.body.enabled_for_enrollment
    const max_assistance = request.body.max_assistance
    const id_creator_user = request.body.id_creator_user
    try{
        const confirmacion = eventService.CrearEjercicio8(request.params.id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        return response.json(confirmacion)
    } catch(error){
        console.log("Error en creacion de eventos controller")
        return response.json("Error en la creacion")
    }
})

router.put("/:id", (request, response) => {
    const name = request.body.name
    const description = request.body.description
    const id_event_category = request.body.id_event_category
    const id_envet_location = request.body.id_envet_location
    const start_date = request.body.start_date
    const duration_in_minutes = request.body.duration_in_minutes
    const price = request.body.price
    const enabled_for_enrollment = request.body.enabled_for_enrollment
    const max_assistance = request.body.max_assistance
    const id_creator_user = request.body.id_creator_user
    try{
        const confirmacion = eventService.EditarEjercicio8Eventos(request.params.id, id_creator_user, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance)
        return response.json(confirmacion)
    } catch(error){
        console.log("Error en edicion de eventos controller")
        return response.json("Error en edicion de eventos")
    } 
})

router.delete("/:id", (request, response) => {
    const id_creator_user = request.body.id_creator_user
    try{
        const confirmacion = eventService.EliminarEjercicio8Eventos(request.params.id,id_creator_user)
        return response.json(confirmacion)
    }catch(error){
        console.log("Error en el delete eventos")
        return response.json("Errro en borrado de evento")
    }
})

export default router;