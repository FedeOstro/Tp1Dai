import Bd from "../repositories/provincias-repositories.js";
const bd = new Bd();

export default class ProvinciasServicios {
  ObtencionProvincias(pageSize, requestedPage) {
    const provincias = bd.Consulta1();
    var provinciasr = new Object();
    parseProv = provincias.map((row) => {
      provinciasr.id = row.id;
      provinciasr.name = row.name;
      provinciasr.full_name = row.full_name;
      provinciasr.latitude = row.latitude;
      provinciasr.longitude = row.longitude;
    });
    return {
      collection: parseProv,
      pagination: {
        limit: pageSize,
        offset: requestedPage,
        nextPage:
          "http://localhost:3000/event?limit=${pageSize}&offfset=$(requestedPage + 1)",
      },
    };
  }

  async ObtencionProvinciasID(id) {
    const provincia = await bd.Consulta2(id);
    const parseProv = provincia.map((row) => {
      const prov = new Object();
      (prov.id = row.id),
        (prov.name = row.name),
        (prov.id_province = row.id_province),
        (prov.latitude = row.latitude),
        (prov.longitude = row.longitude);
      return {
        province: prov,
      };
    });
    return parseProv;
  }

  CrearEjercicio7Provincias(
    id,
    name,
    full_name,
    latitude,
    longitude,
    display_order
  ) {
    try {
      bd.Consulta3(id, name, full_name, latitude, longitude, display_order);
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
    const sql = `
        INSERT INTO users (name, full_name, latitude, longitude)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const values = [name, full_name, latitude, longitude];
    try {
      const rta = await bd.Consulta(sql, values);
      return rta.rows[0];
    } catch (error) {
      throw new Error("Error al registrar usuario: " + error.message);
    }
  }

  async EditarProvincia(
    id,
    name,
    full_name,
    latitude,
    longitude,
    display_order
  ) {
    try {
      const confirmacion = await bd.Consulta4(
        id,
        name,
        full_name,
        latitude,
        longitude,
        display_order
      );
      return "Provincia editada con éxito";
    } catch (error) {
      console.error("Error en la actualización de la provincia:", error);
      throw new Error("Error en la actualización de la provincia");
    }
  }

  EliminarProvincia(id) {
    try {
      bd.Consulta5(id);
      return "Provincia eliminada con exito";
    } catch (error) {
      console.log("Error eliminacion de provincia servicio");
      return response.json("Error eliminacion de provincia");
    }
  }

  async buscarProvinciaPorUsername(name) {
    const sql = `
        SELECT *
        FROM provinces
        WHERE name = $1
    `;
    const values = [name];
    try {
      const rta = await bd.Consulta(sql, values);
      return rta.rows[0];
    } catch (error) {
      throw new Error("Error al buscar nombre por provincia: " + error.message);
    }
  }
}
