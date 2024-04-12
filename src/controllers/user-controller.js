import { UsuarioServicios } from "../servicios/user";

router.get("/user/login", (request, response) =>{
    const username = request.query.username
    const password = request.query.password
    try{
        const AutenticarUsuario = EventosServicios.autenticarUsuario(username, password)
        return response.json(AutenticarUsuario)
    }catch(error){
        console.log("Ejercicio 6 login")
        return response.json("Ejercicio 6 login")
    }
})

router.get("/:id/enrollment", (request, response) => {
    const first_name = request.query.fisrt_name
    const last_name = request.query.last_name
    const username = request.query.username
    const attended = request.query.attended
    const rating = request.query.rating
    try{
        const BusquedaUsuario = EventosServicios.RecolectUsuario(first_name, last_name, username, attended, rating)
        return response.json(BusquedaUsuario)
    }catch(error){
        console.log("Ej 5")
        return response.json("Ej 5")
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
        console.log("Ejercicio 6 register")
        return response.json("Ejercicio 6 register")
    }
})

router.get("/user/register", (request, response) =>{
    const enabled_for_enrollment = reques.query.enabled_for_enrollment
    const 
    try{
        const verificarInscripcion = EventosServicios.verificarInscripcion()
        return response.json(verificarInscripcion)
    }catch(error){
        console.log("Ejercicio 9")
        return response.json("Ejercicio 9")
    }
})