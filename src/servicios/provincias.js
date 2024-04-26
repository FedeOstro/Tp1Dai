import Bd from "../repositories/provincias-repositories.js";

export default class ProvinciasServicios{
    
    ObtencionProvincias(pageSize, requestedPage){
        const sql = `SELECT * from provinces`
        const provincias = Bd.Consulta1(sql)
        const provincias1 = {
            name: "dad",
            full_name: "DD",
            latitude: 424,
            longitude: 4555,
            display_order: 52,
        }
        const provincias2 = {
            name: "dad",
            full_name: "DD",
            latitude: 424,
            longitude: 4555,
            display_order: 52,
        }
        const provincias3 = {
            name: "dad",
            full_name: "DD",
            latitude: 424,
            longitude: 4555,
            display_order: 52,
        }
        const provinciasss = {
            provincias1, provincias2, provincias3,
        }
        return{
            collection: provinciasss,
            pagination: {                
                limit: pageSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/event?limit=${pageSize}&offfset=$(requestedPage + 1)",
            },
        }
    }

    ObtencionProvinciasID(id){
        const provincia = Bd.Consulta2(id)
        const provincias1 = {
            name: "dad",
            full_name: "DD",
            latitude: 424,
            longitude: 4555,
            display_order: 52,
        }
        return provincias1
    }

    CrearEjercicio7Provincias(id, name, full_name, latitude, longitude, display_order){
        return("Provincia creada con exito")
        try{
            Bd.Consulta3(id, name, full_name, latitude, longitude, display_order)
            return("Provincia creada con exito")
        }catch(error){
            console.log("Error creacion de provincia servicio");
            return response.json("Error creacion de provincia");
        }
    }
    
    EditarEjercicio7Provincia(id, name, full_name, latitude, longitude, display_order){
        return("Provincia editada con exito")
        try{
            Bd.Consulta(id, name, full_name, latitude, longitude, display_order)
            return("Provincia editada con exito")
        }catch(error){
            console.log("Error edicion de provincia servicio");
            return response.json("Error edicion de provincia");
        }
    }

    EliminarEjercicio7Provincia(id){
        return("Provincia eliminada con exito")
        try{
            Bd.Consulta(id)
            return("Provincia eliminada con exito")
        }catch(error){
            console.log("Error eliminacion de provincia servicio");
            return response.json("Error eliminacion de provincia");
        }
    }
}

