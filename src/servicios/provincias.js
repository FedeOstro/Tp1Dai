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
      prov.id = row.id,
      prov.name = row.name,
      prov.id_province = row.id_province,
      prov.latitude = row.latitude,
      prov.longitude = row.longitude
      return {
        province: prov
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

  EditarEjercicio7Provincia(
    id,
    name,
    full_name,
    latitude,
    longitude,
    display_order
  ) {
    try {
      bd.Consulta(id, name, full_name, latitude, longitude, display_order);
      return "Provincia editada con exito";
    } catch (error) {
      console.log("Error edicion de provincia servicio");
      return response.json("Error edicion de provincia");
    }
  }

  EliminarEjercicio7Provincia(id) {
    try {
      bd.Consulta(id);
      return "Provincia eliminada con exito";
    } catch (error) {
      console.log("Error eliminacion de provincia servicio");
      return response.json("Error eliminacion de provincia");
    }
  }
}
