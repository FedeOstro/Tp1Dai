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
            console.log("Un error");
            return response.json("Un Error");
        }
    }else if(name != null || category != null || startDate != null || tag != null){
        try {
            const BusquedaEvent = EventosServicios.BusquedaEvent(name, category, startDate, tag);
            return response.json(BusquedaEvent);
        } catch(error){
            console.log("Ej 3")
            return response.json("Ej 3")
        }
    }else{
        console.log("error endpoint /")
    }
    
})


router.get("/:id", (request, response) => {
    try {  
        const evento = EventosServicios.ConsultaEvento(request.params.id);
    } catch(error){
        console.log("Error ejercicio 4")
        return response.json("No se encontro evento")
    }
})




export default router;