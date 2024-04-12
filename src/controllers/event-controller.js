import { EventosServicios} from "../servicios/eventos.js";    

router.get("/",  (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;
    if(limit != null || offset != null){
        try {
            const todoseventos = EventosServicios.getAllEvent();
            return response.json(todoseventos);
        } catch(error){
            console.log("Error ej2 controller");
            return response.json("Erro ej2 controller");
        }
    }else if(name != null || category != null || startDate != null || tag != null){
        try {
            const BusquedaEvent = EventosServicios.BusquedaEvent(name, category, startDate, tag);
            return response.json(BusquedaEvent);
        } catch(error){
            console.log("Ej 3 controller")
            return response.json("Ej 3 controller")
        }
    }else{
        console.log("error endpoint /")
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

router.post("/:id/creation_event", (request, response) => {
    try{
        const confirmacion = EventosServicios.CrearEjercicio8(request.params.id)
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