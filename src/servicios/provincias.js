import Bd from "../repositories/provincias-repositories.js";
const bd = new Bd();

export default class ProvinciasServicios {
  
  parsedOffset(offset){
    return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
  }

  parsedLimit(limit){
    return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
  }

  async ObtencionProvincias(pageSize, requestedPage) {
    const limited = this.parsedLimit(pageSize)
    const offseted = this.parsedOffset(requestedPage)
    const provincias = await bd.Consulta1(limited, offseted);
    console.log(provincias)
    parseProv = provincias.map((row) => {
      var provinciasr = new Object();
      provinciasr.id = row.id;
      provinciasr.name = row.name;
      provinciasr.full_name = row.full_name;
      provinciasr.latitude = row.latitude;
      provinciasr.longitude = row.longitude;
      return {
        collection: parseProv,
        pagination: {
          limit: limited,
          offset: offseted,
          nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
        },
      };
    });
    return parseProv;
  }

  async ObtencionProvinciasID(id) {
    const provincia = await bd.Consulta2(id);
    if(provincia[0] == null){
      return false
    }
    const parseProv = provincia.map((row) => {
      const prov = new Object();
        prov.id = row.id,
        prov.name = row.name,
        prov.id_province = row.id_province,
        prov.latitude = row.latitude,
        prov.longitude = row.longitude;
      return {
        province: prov,
      };
    });
    return parseProv;
  }

  async busqLocations(id, limit, offset){
    const limited = this.parsedLimit(limit)
    const offseted = this.parsedOffset(offset)
    const locations = await bd.locationsXid(id);
    if(locations[0] == null){
      return false
    }
    const parsedDB = result.map(row => {
      const location = new Object()
      location.id = row.id
      location.name = row.name
      location.id_province = row.id_province
      location.latitude = row.latitude
      location.longitude = row.longitude
      return{
          collection: location,
          pagination: {
              limit: limited,
              offset: offseted,
              nextPage: ((offseted + 1) * limited <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${limited}&offset=${offseted + 1}` : null,
              total: totalCount,   
          }
      }
    })
    return parsedDB;
  }

  esNumero(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  async cheqProv(name, longitude, latitude){
    if(name.length < 3 || name.length < 3) {
      return("Los campos first_name o last_name deben tener al menos tres caracteres.");
    }
    if(this.esNumero(longitude) == false){
      return("Longitud invalida no es un numero")
    }
    if(this.esNumero(latitude) == false){
      return("Latitud invalida no es un numero")
    }
    return true
  }

  async CrearEjercicio7Provincias(name, full_name, latitude, longitude, display_order) {
    try {
      await bd.Consulta3(name, full_name, latitude, longitude, display_order);
      return "Provincia creada con exito";
    } catch (error) {
      console.log("Error creacion de provincia servicio");
      return response.json("Error creacion de provincia");
    }
  }

  async autenticarRegistro(name, full_name, latitude, longitude) {
    const existingProvince = await this.buscarProvinciaPorUsername(name);
    if (existingProvince) {
      throw new Error("El nombre de usuario ya está en uso.");
    }
    const sql = ` INSERT INTO users (name, full_name, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING * `;
    const values = [name, full_name, latitude, longitude];
    try {
      const rta = await bd.Consulta(sql, values);
      return rta.rows[0];
    } catch (error) {
      throw new Error("Error al registrar usuario: " + error.message);
    }
  }

  async EditarProvincia(id, name,full_name, latitude, longitude, display_order ) {
    const cheq = await bd.Consulta2(id)
    if(cheq[0] == null){
      return 404
    }
    try {
      const confirmacion = await bd.Consulta4(id, name, full_name, latitude, longitude, display_order);
      return "Provincia editada con éxito";
    } catch (error) {
      console.error("Error en la actualización de la provincia:", error);
      throw new Error("Error en la actualización de la provincia");
    }
  }

  async EliminarProvincia(id) {
    const cheq = await bd.Consulta2(id)
    if(cheq[0] == null){
      return 404
    }
    try {
      await bd.Consulta5(id);
      return "Provincia eliminada con exito";
    } catch (error) {
      console.log("Error eliminacion de provincia servicio");
      return response.json("Error eliminacion de provincia");
    }
  }

  async buscarProvinciaPorUsername(name) {
    const sql = `SELECT * FROM provinces WHERE name = $1`;
    try {
      const rta = await bd.Consulta(sql, values);
      return rta.rows[0];
    } catch (error) {
      throw new Error("Error al buscar nombre por provincia: " + error.message);
    }
  }
}
