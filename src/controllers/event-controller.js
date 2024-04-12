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

router.get("/:id/creation_event", (request, response) => {
    try{
        const confirmacion = EventosServicios.CrearEjercicio8(request.params.id)
        return response.json(confirmacion)
    } catch(error){
        console.log("Error en creacion de eventos controller")
        return response.json("Error en la creacion")
    }
})

router.get("/:id/edition_event", (request, response) => {
    const 
    try{
        const confirmacion = EventosServicios.EditarEjercicio8Eventos(request.params.id)
    } catch(error){
        console.log("Error en edicion de eventos controller")
        return response.json("Error en edicion de eventos")
    }
})



export default router;