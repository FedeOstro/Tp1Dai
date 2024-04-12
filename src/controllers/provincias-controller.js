import { ProvinciasServicios } from "../servicios/provincias";
import router from "./event-controller";

router.get("/", (request, response) =>{
    const id = request.query.id;
    const limit = request.query.limit;
    const offset = request.query.offset;
    if(limit != null || offset != null){
        try{
            const todoProvincias = ProvinciasServicios.ObtencionProvincias()
            return response.json(todoProvincias)
        }catch(error){
            console.log("Error obtencion provincias")
            return response.json("Error obtenicon de las provincias 7")
        }
    }else if(id != null){
        try{
            const provinciaId = ProvinciasServicios.ObtencionProvinciasID(id)
            return response.json(provinciaId)
        }catch(error){
            console.log("Erro obtencion provincias id")
            return response.json("Erro en la obtencion de la provincia con id")
        }
    }else{
        console.log("Error en toda obtencion")
        return response.json("Error en toda manera de obtencion")
    }
})

router.post("/creation_province", (request, response) => {
    const id = request.query.id;
    const name = request.name.id;
    const full_name = request.query.full_name;
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;
    const display_order = request.query.display_order;
    try{
        const confirmacion = ProvinciasServicios.CrearEjercicio7Provincias(id, name, full_name, latitude, longitude, display_order)
        return response.json(confirmacion)
    }catch(error){
        console.log("Error en creacion de provincias")
        return response.json("Error en creacion de provincia")
    }
})

router.post("/:id/edition_province", (request, response) => {
    const name = request.query.name;
    const full_name = request.query.full_name;
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;
    const display_order = request.query.display_order;
    try{
        const confirmacion = ProvinciasServicios.EditarEjercicio7Provincia(request.params.id, name, full_name, latitude, longitude, display_order)
        return response.json(confirmacion)
    }catch(error){
        console.log("Error en actualizacion")
    }
})

router.delete("/:id/elimination_prvince", (request, respose) => {
    try{
        const confirmacion = ProvinciasServicios.EliminarEjercicio7Provincia(request.params.id)
        return respose.json(confirmacion)
    }catch(error){
        console.log("Error en la eliminacion de provincia")
        return respose.json("Error en la eliminacion de provincia")
    }
})
