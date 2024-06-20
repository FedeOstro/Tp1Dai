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
}