import { Bd } from "../repositories/provincias-repositories";

export class ProvinciasServicios{
    
    ObtencionProvincias(pageSize, requestedPage){
        const sql = `SELECT * from provinces`
        const provincias = Bd.Consulta(sql)
        return{
            collection: provincias,
            pagination: {                
                limit: pageSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/event?limit=${pageSize}&offfset=$(requestedPage + 1)",
            },
        }
    }

    ObtencionProvinciasID(id){
        const sql = `SELECT * from provinces WHERE id = ${id}`
        const provincia = Bd.Consulta(sql)
        return provincia
    }

    CrearEjercicio7Provincias(id, name, full_name, latitude, longitude, display_order){
        const sql = `INSERT INTO provinces (id, name, full_name, latitude, longitude, display_order) 
        values (${id}, ${name}, ${full_name}, ${latitude}, ${longitude}, ${display_order})`
        try{
            Bd.Consulta(sql)
            return("Provincia creada con exito")
        }catch(error){
            console.log("Error creacion de provincia servicio");
            return response.json("Error creacion de provincia");
        }
    }
    
    EditarEjercicio7Provincia(id, name, full_name, latitude, longitude, display_order){
        const sql = `UPDATE provinces SET name = '${name}', full_name = '${full_name}', latitude = '${latitude}', longitude = '${longitude}', display_order = '${display_order}' 
        WHERE id = '${id}'`
        try{
            Bd.Consulta(sql)
            return("Provincia editada con exito")
        }catch(error){
            console.log("Error edicion de provincia servicio");
            return response.json("Error edicion de provincia");
        }
    }

    EliminarEjercicio7Provincia(id){
        const sql = `DELETE * 
        FROM provinces 
        WHERE id = '${id}'`
        try{
            Bd.Consulta(sql)
            return("Provincia eliminada con exito")
        }catch(error){
            console.log("Error eliminacion de provincia servicio");
            return response.json("Error eliminacion de provincia");
        }
    }
}

