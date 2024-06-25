import Bd from "../repositories/event-location.js";
const bd = new Bd();

export default class locationServicios{

    parsedOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }

    parsedLimit(limit){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
    }

    async cheq(name, id){
        const limit = this.parsedLimit(0)
        const offset = this.parsedOffset(0)
        if(name.lenght < 3 || name == null){
            return 400
        }else if(id != null){
            const category = await bd.consulta2(id,limit, offset)
            if(category == null){
                return 404
            }
        }else{
            return "salchipapa"
        }
    }

    async getAllEventLocation(limit, offset, path){
        const limited = this.parsedLimit(limit)
        const offseted = this.parsedOffset(offset)
        const result = await bd.consulta1(limited, offseted);
        const totalCount = result.length
        const parsedDB = result.map(row => {
            var event_locations = new Object()
            event_locations.id = row.id
            event_locations.name = row.name
            event_locations.display_order = row.display_order
            return{
                event_locations: event_locations,
                pagination: {
                    limit: limit,
                    offset: limit,
                    nextPage: ((offset + 1) * limit <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limit}&offset=${offset + 1}` : null,
                },
                total: totalCount,   
            }
        })
        return parsedDB
    }

    async ConsultEventoLocation(id,limit, offset, path){
        const limited = this.parsedLimit(limit)
        const offseted = this.parsedOffset(offset)
        const result = await bd.consulta2(id, limited, offseted)
        const totalCount = result.lenght
        const parsedDB = result.map(row => {
            var event_locations = new Object()
            event_locations.id = row.id
            event_locations.name = row.name
            event_locations.display_order = row.display_order
            return{
                event_locations: event_locations,
                pagination: {
                    limit: limited,
                    offset: offseted,
                    nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
                    total: totalCount
                }
            }
        })
        return parsedDB
    }

    async postCategory(name, display_order){
        const result = await bd.consulta3(name, display_order)
        return ("Insetado efectivamente")
    }

    async putCategory(id,name, display_order){
        const result = await bd.consulta4(id, name, display_order)
        return ("Actualizado efectivamente")
    }

    async deleteCategory(id){
        const result = await bd.consulta5(id)
        return ("Borrado efectivamente")
    }

}