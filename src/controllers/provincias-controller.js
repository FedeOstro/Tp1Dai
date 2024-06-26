import express, { response } from "express"
import ProvinciasServicios from "../servicios/provincias.js";
const router = express.Router()
const serviceProv = new ProvinciasServicios();

router.get("/", async (request, response) =>{
    const id = request.query.id;
    const limit = request.query.limit;
    const offset = request.query.offset;
    try{
        const todoProvincias = await serviceProv.ObtencionProvincias(limit, offset)
        if(todoProvincias){
            response.statusCode = 200
            return response.json(todoProvincias);
        }
    }catch(error){
        console.log("Error obtencion provincias")
        return response.json("Error obtenicon de las provincias 7")
    }
})
    


router.get("/:id", async (request, response) => {
    const id = request.params.id
    try{
        const provinciaId = await serviceProv.ObtencionProvinciasID(id)
        if(provinciaId = false){
            response.statusCode = 404
            return response.json("Provincia inexistente id no valido")
        }
            response.statusCode = 200
            return response.json(provinciaId);
        }catch(error){
            console.log("Error obtencion provincias id")
            return response.json("Error en la obtencion de la provincia con id")
    }
})


router.get("/:id/locations", async (request, response) => {
    const id = request.params.id
    try{
        const locationsid = serviceProv.busqLocations(id)
        if(locationsid = false){
            response.statusCode = 404
            return response.json("Localizaciones no encontradas por provincia invalida")
        }
    }catch(error){
        console.log("Error obtencion localizaciones id")
        return response.json("Error obtencion localizaciones id")
    }   
})


router.post("/:id", (request, response) => {
    const name = request.body.name;
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

router.put("/editar", async (request, response) => {
    const { id,name, full_name, latitude, longitude, display_order } = request.body;
    try {
        const confirmacion = await serviceProv.EditarProvincia(id, name, full_name, latitude, longitude, display_order);
        return response.json(confirmacion);
    } catch(error) {
        console.error("Error en actualización:", error);
        return response.status(500).json({ error: "Error en la actualización de la provincia" });
    }
});


router.delete("/borrar", (request, respose) => {
    try{
        const confirmacion = serviceProv.EliminarProvincia(request.params.id)
        return respose.json(confirmacion)
    }catch(error){
        console.log("Error en la eliminacion de provincia")
        return respose.json("Error en la eliminacion de provincia")
    }
})

export default router