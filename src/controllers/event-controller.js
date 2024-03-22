import { EventosRecolectar } from "../servicios/eventos.js";    

router.get("/",  (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;

    try {
        const todoseventos = EventosRecolectar.getAllEvent();
        return response.json(todoseventos);
    } catch(error){
        console.log("Un error");
        return response.json("Un Error");
    }
});

router.get("/", (request, response) => {
    const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;
    try {
        const BusquedaEvent = EventosRecolectar.BusquedaEvent(name, category, startDate, tag);
        return response.json(BusquedaEvent);
    } catch(error){
        console.log("Un eror Papu :V")
        return response.json("La hora sad :'v")
    }
})

export default router;