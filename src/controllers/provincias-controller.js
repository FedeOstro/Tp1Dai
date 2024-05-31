import express from "express"
import ProvinciasServicios from "../servicios/provincias.js";
const router = express.Router()
const serviceProv = new ProvinciasServicios();

router.get("/", async (request, response) =>{
    const id = request.query.id;
    const limit = request.query.limit;
    const offset = request.query.offset;
    if(limit != null || offset != null){
        try{
            const todoProvincias = await serviceProv.ObtencionProvincias()
            if(todoProvincias){
                return response.json(todoseventos);
            }
        }catch(error){
            console.log("Error obtencion provincias")
            return response.json("Error obtenicon de las provincias 7")
        }
    }else if(id != null){
        try{
            const provinciaId = await serviceProv.ObtencionProvinciasID(id)
            return response.json(provinciaId);
        }catch(error){
            console.log("Error obtencion provincias id")
            return response.json("Error en la obtencion de la provincia con id")
        }
    }else{
        console.log("Error en toda obtencion")
        return response.json("Error en toda manera de obtencion")
    }
})

router.post("/:id", (request, response) => {
    const name = request.name.id;
    const full_name = request.body.full_name;
    const latitude = request.body.latitude;
    const longitude = request.body.longitude;
    const display_order = request.body.display_order;
    try{
        const confirmacion = serviceProv.CrearEjercicio7Provincias(request.params.id, name, full_name, latitude, longitude, display_order)
        return response.json(confirmacion)
    }catch(error){
        console.log("Error en creacion de provincias")
        return response.json("Error en creacion de provincia")
    }
})

router.put("/:id", (request, response) => {
    const name = request.body.name;
    const full_name = request.body.full_name;
    const latitude = request.body.latitude;
    const longitude = request.body.longitude;
    const display_order = request.body.display_order;
    try{
        const confirmacion = serviceProv.EditarEjercicio7Provincia(request.params.id, name, full_name, latitude, longitude, display_order)
        return response.json(confirmacion)
    }catch(error){
        console.log("Error en actualizacion")
    }
})

router.delete("/:id", (request, respose) => {
    try{
        const confirmacion = serviceProv.EliminarEjercicio7Provincia(request.params.id)
        return respose.json(confirmacion)
    }catch(error){
        console.log("Error en la eliminacion de provincia")
        return respose.json("Error en la eliminacion de provincia")
    }
})

export default router