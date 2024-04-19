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

}