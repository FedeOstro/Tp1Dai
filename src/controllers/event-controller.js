import express from "express"
import EventosServicios from "../servicios/eventos.js";    
const router = express.Router()
const eventService = new EventosServicios();

//router.get("/", middleware, (request, response) => {

router.get("/",  async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;
    const url = request.originalUrl;
    if(name != null || category != null || startDate != null || tag != null){
        try {
            const BusquedaEvent = await eventService.BusquedaEvento(name, category, startDate, tag);
            return response.json(BusquedaEvent);
        } catch(error){
            console.log(error)
            return response.json(error)
        }
    }else{
        try {
            const todoseventos = await eventService.getAllEvent(limit, offset, url);
            return response.json(todoseventos);
        }catch(error){
            console.log("Error ej2 controller");
            return response.json("Error ej2 controller");
        }
    }
    
})


router.get("/:id", async (request, response) => {
    try { 
        const evento = await eventService.ConsultaEvento(request.params.id);
        if(evento.length == 0) {
            response.statusCode = 404;
            return response.json("Evento no encontrado")
        }else{
            response.statusCode = 200;
        }
        return response.json(evento)
    } catch(error){
        console.log("Error ejercicio 4 controller")
        return response.json("No se encontro evento")
    }
})

router.get("/:id/enrollment", async(request, respose) => {
    const first_name = request.query.first_name
    const last_name = request.query.last_name
    const usernames = request.query.username
    const attended = request.query.attended
    const rating = request.query.rating
    if(first_name != null || last_name != null || usernames != null || attended != attended || attended != null || rating != null){
        try{
            const usuario = await eventService.ListadoParticiPantes(request.params.id, first_name, last_name, usernames, attended, rating)
            if(usuario){
                return respose.json(usuario)
            } else{
                console.log("Error ejercicio 5 controller")
                return respose.json("No se encontro al usuario")
            }
        }catch(error){
            console.log("Error ej 5 catch")
            return respose.json("Error ej 5 catch")
        }
    }else{
        try{
            const verificarInscripcion = await eventService.verificarInscripcion(request.params.id)
            if(verificarInscripcion){
                return response.json(verificarInscripcion)
            } else{
                console.log("Error ejercicio 9 controller")
                return response.json("No se puede inscribir al evento")
            }
        }catch(error){

        }
    }
    
    
})

router.post("/:id", async(request, response) => {
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
        const confirmacion = await eventService.CrearEjercicio8(request.params.id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        if(confirmacion){
            return response.json(confirmacion)
        } else{
            console.log("Error en creacion de eventos controller")
            return response.json("Error en la creacion")
        }
    }catch(error){

    }
})

router.put("/:id", async (request, response) => {
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
        const confirmacion = await eventService.EditarEjercicio8Eventos(request.params.id, id_creator_user, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance)
        if(confirmacion){
            
        }
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
        return response.json("Error en borrado de evento")
    }
})

export default router;