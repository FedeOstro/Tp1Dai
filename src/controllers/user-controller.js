import { UsuarioServicios } from "../servicios/user";

router.get("/user/login", (request, response) =>{
    const username = request.query.username
    const password = request.query.password
    try{
        const AutenticarUsuario = EventosServicios.autenticarUsuario(username, password)
        return response.json(AutenticarUsuario)
    }catch(error){
        console.log("Error ejercicio 6 login")
        return response.json("Error ejercicio 6 login")
    }
})


router.get("/user/register", (request, response) =>{
    const first_name = request.query.first_name
    const last_name = request.query.last_name
    const username = request.query.username
    const password = request.query.password
    try{
        const AutenticarRegistro = EventosServicios.AutenticarRegistro(first_name, last_name, username, password)
        return response.json(AutenticarRegistro)
    }catch(error){
        console.log("Error ejercicio 6 register")
        return response.json("Error ejercicio 6 register")
    }
})

