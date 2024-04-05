import { EventosRecolectar } from "../servicios/eventos.js";    

router.get("/",  (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;
    if(limit != null || offset != null){
        try {
            const todoseventos = EventosRecolectar.getAllEvent();
            return response.json(todoseventos);
        } catch(error){
            console.log("Un error");
            return response.json("Un Error");
        }
    }else if(name != null || category != null || startDate != null || tag != null){
        try {
            const BusquedaEvent = EventosRecolectar.BusquedaEvent(name, category, startDate, tag);
            return response.json(BusquedaEvent);
        } catch(error){
            console.log("Ej 3")
            return response.json("Ej 3")
        }
    }else{
        console.log("error endpoint /")
    }
    
    
})


router.get("/:id/enrollment", (request, response) => {
    const first_name = request.query.fisrt_name
    const last_name = request.query.last_name
    const username = request.query.username
    const attended = request.query.attended
    const rating = request.query.rating
    try{
        const BusquedaUsuario = EventosRecolectar.RecolectUsuario(first_name, last_name, username, attended, rating)
        return response.json(BusquedaUsuario)
    }catch(error){
        console.log("Ej 5")
        return response.json("Ej 5")
    }
})

router.get("/:id", (request, response) => {
    try {  
        const evento = EventosRecolectar.ConsultaEvento(request.params.id);
    } catch(error){
        console.log("Error ejercicio 4")
        return response.json("No se encontro evento")
    }
})

export default router;