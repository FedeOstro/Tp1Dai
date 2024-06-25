import express from "express"
import ProvinciasServicios from "../servicios/provincias.js";
const router = express.Router()
const serviceProv = new ProvinciasServicios();

router.get("/", async (request, response) =>{
    const id = request.query.id;
    const limit = request.query.limit;
    const offset = request.query.offset;
    try{
        if(id != null){
            try{
                const provinciaId = await serviceProv.ObtencionProvinciasID(id)
                return response.json(provinciaId);
            }catch(error){
                console.log("Error obtencion provincias id")
                return response.json("Error en la obtencion de la provincia con id")
            }
            
        }else{
            try{
                const todoProvincias = await serviceProv.ObtencionProvincias(limit, offset)
                if(todoProvincias){
                    return response.json(todoProvincias);
                }
            }catch(error){
                console.log("Error obtencion provincias")
                return response.json("Error obtenicon de las provincias 7")
            }
        }
    }catch(error){
        console.log("Error en toda obtencion")
        return response.json("Error en toda manera de obtencion")
    }   
})

router.post("/:id", (request, response) => {
    const name = request.name;
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

router.post("/crear", async (request, response) => {
    const { name, full_name, latitude, longitude } = request.body;
    try {
      const AutenticarRegistro = await ProvinciasServicios.autenticarRegistro(
        name,
        full_name,
        latitude,
        longitude
      );
      return response.json(AutenticarRegistro);
    } catch (error) {
      console.error("Error durante el registro de una provincia:", error);
      return response.status(500).json({ error: "Error interno del servidor" });
    }
  });

export default router