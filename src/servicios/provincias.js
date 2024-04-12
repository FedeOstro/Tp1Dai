import { Bd } from "../repositories/provincias-repositories";

export class ProvinciasServicios{
    
    CrearEjercicio7(id, name, full_name, latitude, longitude, display_order){
        const sql = `INSERT INTO provinces (id, name, full_name, latitude, longitude, display_order) 
        values ${id}, ${name}, ${full_name}, ${latitude}, ${longitude}, ${display_order}`
    }
    
    EditarEjercicio7(id, name, full_name, latitude, longitude, display_order){
        const sql = `UPDATE name, full_name, latitude, longitude, display_order 
        FROM provinces 
        WHERE id = '${id}'`
    }

    EliminarEjercicio7(id, name, full_name, latitude, longitude, display_order){
        const sql = `DELETE * 
        FROM provinces 
        WHERE id = '${id}'`
    }
}

