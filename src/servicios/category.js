import res from "express/lib/response.js";
import Bd from "../repositories/category-respositories.js";
const bd = new Bd();

export default class locationServicios{

    parsedOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }

    parsedLimit(limit){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
    }

    async cheq(name, id){
        if(name.lenght < 3 || name == null){
            return 400
        }else if(id != null){
            const category = await Bd.Consulta2(id)
            if(category == null){
                return 404
            }
        }else{
            return "salchipapa"
        }
    }

    async GetAllCategoryes(limit, offset, url){
        const limit = this.parsedLimit(limit)
        const offset = this.parsedOffset(offset)
        const result = await bd.Consulta1(limit, offset);
        const totalCount = result.length
        const parsedDB = result.map(row => {
            var event_categories = new Object()
            event_categories.id = row.id
            event_categories.name = row.name
            event_categories.display_order = row.display_order
            return{
                event_categories: event_categories,
                pagination: {
                    limit: pageSizes,
                    offset: requestedPages,
                    nextPage: ((requestedPages + 1) * pageSizes <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${pageSizes}&offset=${requestedPages + 1}` : null,
                    total: totalCount,   
                }
            }
        })
        return parsedDB
    }

    async ConsultCategory(id,limit, offset, url){
        const limit = this.parsedLimit(limit)
        const offset = this.parsedOffset(offset)
        const result = await bd.Consulta2(limit, offset, id)
        const totalCount = result.lenght
        const parsedDB = result.map(row => {
            var event_categories = new Object()
            event_categories.id = row.id
            event_categories.name = row.name
            event_categories.display_order = row.display_order
            return{
                event_categories: event_categories,
                pagination: {
                    limit: pageSizes,
                    offset: requestedPages,
                    nextPage: ((requestedPages + 1) * pageSizes <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${pageSizes}&offset=${requestedPages + 1}` : null,
                    total: totalCount,   
                }
            }
        })
        return parsedDB
    }

    async postCategory(name, display_order){
        const result = await bd.consulta3(name, display_order)
        return result
    }

    async putCategory(name, display_order){
        const result = await bd.Consulta4(name, display_order)
        return result
    }

}