import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_BY_NAME,
  FILTER_CONTINENT,
  FILTER_ACTIVITY,
  GET_ACTIVITY,
  ORDER_BY_NAME,
  POST_ACTIVITY,
  CLEAN_COUNTRY,
} from "../actions";

const initialState = {
  // Estado para renderizar, se usa para hacer el filtrado
  countries: [],
  // Estado soporte que siempre tiene todos los paises
  allCountries: [],
  activities: [],
  country: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };

    case CLEAN_COUNTRY:
      return {
        ...state,
        country: [],
      };

    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    case ORDER_BY_NAME:
      let sortedCountries =
        action.payload === "asc"
          ? state.countries.sort((a, b) => a.name.localeCompare(b.name)) // negativo
          : state.countries.sort((a, b) => b.name.localeCompare(a.name)); // positivo
      return {
        ...state,
        countries: sortedCountries,
      };
    case FILTER_CONTINENT: // ordena por continente
      const allCountries = state.allCountries;
      const continentFilter =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((el) => el.continent === action.payload);

      return {
        ...state,
        countries: continentFilter,
      };

    case FILTER_ACTIVITY: // ordena por actividad
      const allCountriesAct = state.allCountries;
      const activitiesFilter =
        action.payload === "All"
          ? allCountriesAct
          : allCountriesAct.filter(
              (country) =>
                country.activities &&
                country.activities.map((el) => el.name).includes(action.payload)
            );

      return {
        ...state,
        countries: activitiesFilter,
      };
    default:
      return state;
  }
}

export default rootReducer;
