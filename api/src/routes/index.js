const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const axios = require("axios");
const { Country, Activity, country_activity } = require("../db.js");

// Configurar los routers
// router.use('/countries', Countries);

// Busco la data de la API
const countriesApi = async () => {
  const countriesUrl = await axios.get("https://restcountries.com/v3/all");
  const countries = await countriesUrl.data.map((country) => {
    return {
      name: country.name.common,
      id: country.cca3,
      flags: country.flags[1],
      continent: country.continents[0],
      capital:
        country.capital != null ? country.capital : "No se encontro capital",
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });
  return countries;
};

router.get("/countries", async (req, res) => {
  // Guardo en una constante lo que obtengo de la api
  const countries = await countriesApi();

  // Guardo el name pasado por query
  const name = req.query.name;

  // const order = req.query.order;

  try {
    // Si la db esta llena no se hace nada
    let full = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    // Si no hay datos, se crean
    if (!full.length) {
      // bulkCreate busca los campos en el objeto y los pasa a la tabla
      // los datos del objeto para los que no hay campos en la tabla, no los guarda
      await Country.bulkCreate(countries);
    }
  } catch (error) {
    console.log(error);
  }

  if (name) {
    let countryName = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
    });
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("No se encontro el pais");
  } else if (req.query.order) {
    try {
      let country = await Country.findAll({
        // Trae hasta 9 paises
        // limit : 9,
        // Paginado - desde donde empieza a contar
        // offset: req.query.page,
        order: [["population", req.query.order]],
        include: {
          model: Activity,
        },
      });
      res.status(200).send(country);
    } catch (error) {
      res.status(500).send("Error");
    }
  } else {
    let full = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    res.status(200).send(full);
  }
});

router.get("/countries/:id", async (req, res) => {
  // Obtener el detalle de un país en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de país
  // Incluir los datos de las actividades turísticas correspondientes

  const countryId = req.params.id;

  let countryById = await Country.findByPk(countryId.toUpperCase(), {
    include: {
      model: Activity,
    },
  });

  res.status(200).send(countryById);
});

router.get("/activity", async (req, res) => {
  try {
    let activities = await Activity.findAll();
    res.status(200).send(activities);
  } catch (errors) {
    res.status(500).send("Error");
  }
});

router.post("/activity", async (req, res) => {
  try {
    let { name, difficulty, duration, season, countries } = req.body;
    // Se crea la actividad
    let newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Reviso el array de paises para ver en cual se debe crear la actividad
    countries.forEach(async (country) => {
      let activityCountry = await Country.findOne({
        where: {
          name: country,
        },
      });
      await newActivity.addCountry(activityCountry);
    });
    res.status(200).send("La actividad se creo exitosamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("No se pudo crear la actividad");
  }
});

module.exports = router;
