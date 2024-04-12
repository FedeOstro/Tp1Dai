import { Bd } from "../repositories/user-repositories";

export class UsuarioServicios{

    autenticarUsuario(username, password){
        const sql = `UPDATE username, password 
        FROM users`
        //El profe lo tiene q explicar
        const rta = Bd.Consulta(sql)
        return rta
    }

    autenticarRegistro(first_name, last_name, username, password){
        const sql = `UPDATE first_name, last_name, username, password 
        FROM users`
        //El profe lo tiene q explicar
        const rta = Bd.Consulta(sql)
        return rta
    }

    RecolectUsuario(first_name, last_name, username, attended, rating){
        const sql = `SELECT id, username, first_name, last_name
            FROM users 
            JOIN event_enrolments ee ON users.id = ee, `
    }

    verificarInscripcion(enabled_for_enrollment, id_event, max_assistance){
        
    }

}