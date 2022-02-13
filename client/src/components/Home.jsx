import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByContinent,
  filterByActivity,
  getActivities,
  orderName,
} from "../actions";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";
import Paginado from "./Paginado";
import Nav from "./Nav";
import styles from "./Home.module.css";
import styles1 from "./Button.module.css";

function Home() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);

  const allActivities = useSelector((state) => state.activities);

  // Mientras se cargan los paises
  const [isLoading, setIsLoading] = useState(true);

  //Pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  var countriesPage = 0;
  if (currentPage === 1) {
    countriesPage = 9;
  }
  if (currentPage >= 2) {
    countriesPage = 10;
  }

  const [order, setOrder] = useState("");

  const LastCountry = currentPage * countriesPage;

  const FirstCountry = LastCountry - countriesPage;

  const currentCountries = allCountries.slice(FirstCountry, LastCountry);

  const paginado = (totalPages) => {
    setCurrentPage(totalPages);
  };

  useEffect(() => {
    dispatch(getCountries(order), dispatch(getActivities()));
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, [dispatch, order]);

  const changeOrder = (event) => {
    event.preventDefault();
    setOrder(event.target.value);
  };

  function handleSort(event) {
    event.preventDefault();
    dispatch(orderName(event.target.value));
    setCurrentPage(1); // Se resetea la pagina a 1 para que se muestren los paises ordenados por nombre al cambiar el orden de los paises
    setOrder(`Ordenado ${event.target.value}`); // Se muestra el orden en el boton de ordenar paises
  }

  function handleFilterContinent(event) {
    // Se toma como payload el value de la option que elija el usuario
    event.preventDefault();
    dispatch(filterByContinent(event.target.value));
    setCurrentPage(1);
  }

  function handleFilterActivity(event) {
    // Se toma como payload el value de la option que elija el usuario
    dispatch(filterByActivity(event.target.value));
    console.log(event.target.value);
  }

  return (
    <div>
      <header className={styles.titleContainer}>
        <Link to='/'>
          <h1 className={styles.title}>COUNTRIES</h1>
        </Link>
        <div className={styles.center}>
          <Link to='/activity' className={styles1.btn}>
            Crear Actividad
          </Link>
        </div>
      </header>
      <Nav />

      {/* <div className={styles.center}>
            <button className={styles1.back} onClick={event => handleClick(event)}>Cargar paises nuevamente</button>
        </div> */}
      <div>
        <div className={styles.selectGap}>
          <select
            onChange={(event) => changeOrder(event)}
            className={styles1.select}
          >
            {/** Deben ser filtrados ascendente y descendente por orden alfabetico y por cantidad de poblacion
             */}
            <option>Ordenar por poblacion</option>
            <option value='ASC'>Menor Poblacion</option>
            <option value='DESC'>Mayor Poblacion</option>
          </select>
          <select
            onChange={(event) => handleSort(event)}
            className={styles1.select}
          >
            {/** Deben ser filtrados ascendente y descendente por orden alfabetico y por cantidad de poblacion
             */}
            <option>Ordenar por nombre</option>
            <option value='asc'>A-Z</option>
            <option value='desc'>Z-A</option>
          </select>
          <select
            onChange={(event) => handleFilterContinent(event)}
            className={styles1.select}
          >
            {/* filtrar por continente */}
            <option value='All'>Todos</option>
            <option value='Africa'>Africa</option>
            <option value='North America'>America del Norte</option>
            <option value='South America'>America del Sur</option>
            <option value='Antarctica'>Antartica</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europa</option>
            <option value='Oceania'>Oceania</option>
          </select>
          <select
            onChange={(event) => handleFilterActivity(event)}
            className={styles1.select}
          >
            <option value='All'>Todas</option>
            {allActivities &&
              allActivities.map((activity) => (
                <option value={activity.name}>{activity.name}</option>
              ))}
          </select>
        </div>
        {/* Se hace el map sobre el nuevo array de countries, para renderizar solo los 
            necesarios por pagina */}
        {isLoading ? (
          <img
            src='https://i0.wp.com/38.media.tumblr.com/4f18b0857748195e156a00b4a75d4690/tumblr_inline_nqjtwww0R71qk1op9_540.gif'
            alt=''
          />
        ) : (
          <ul className={styles.countriesGrid}>
            {currentCountries?.map((country) => (
              <Link to={"/home/" + country.id}>
                <CountryCard
                  name={country.name}
                  flags={country.flags}
                  continent={country.continent}
                  id={country.id}
                  population={country.population}
                  key={country.id}
                />
              </Link>
            ))}
          </ul>
        )}

        <Paginado
          countriesPage={countriesPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}

export default Home;
