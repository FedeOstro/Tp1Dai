import { Bd } from "../repositories/events-repositories";

export class EventosRecolectar{
    getAllEvent(pageSize, requestedPage){
        const sql = `select * from events limit  ${pageSize} offset ${requestedPage}`;
        const result = Bd.Consulta(sql);
        throw new Error("Error en el sevicio de events")
        return{
            collection: result,
            pagination: {
                limit: pagaSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/event?limit=${pageSize}&offfset=$(requestedPage + 1)",
            },
        };

    }

    BusquedaEvento(name, category, startDate, tag){
        const sql = `SELECT *
            FROM event
            JOIN event_categories ec ON event.id_event_category = ec.id
          JOIN event_tags et ON event.id = et.id_event
            JOIN tags t ON et.id_tag = t.id
            WHERE event.name = '${categorias.name}' AND ec.name = '${categorias.category}' AND event.start_date = '${categorias.startDate}' AND t.name = '${categorias.tag}`;

        const rta = Bd.Consulta(sql)
        return rta
        //seguir con el script
    }

    RecolectUsuario(first_name, last_name, username, attended){
        const sql = `SELECT *
            FROM event
            JOIN event_categories ec ON event.id_event_category = ec.id
            JOIN event_tags et ON event.id = et.id_event
            JOIN tags t ON et.id_tag = t.id
            WHERE event.name = '${categorias.name}' AND ec.name = '${categorias.category}' AND event.start_date = '${categorias.startDate}' AND t.name = '${categorias.tag}`;

    }
}