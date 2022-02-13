import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../actions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import styles from "./CreateActivity.module.css";
import styles1 from "./Button.module.css";

export default function CreateActivity() {
  const dispatch = useDispatch();

  const history = useHistory();

  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({}); // aca se guardan los errores que se pueden producir al crear una actividad

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  function handleChange(e) {
    // Le agregamos el e.target.value (lo que vamos modificando) al input actual
    setInput({
      ...input, // copiamos el input actual
      [e.target.name]: e.target.value, // aca se guarda el nombre del input y el valor que se esta modificando en ese input
    });
  }

  function handleCheck(e) {
    // aca se guarda el nombre del input y el valor que se esta modificando en ese input
    if (e.target.checked) {
      // si el checkbox esta checkeado se agrega el nombre del pais al input de countries
      setInput({
        //
        ...input, // copiamos el input actual para que no se borre el anterior valor del input countries
        [e.target.name]: e.target.value, // aca se guarda el nombre del input y el valor que se esta modificando en ese input
      });
    }
  }

  function handleSelect(e) {
    //
    setInput({
      ...input,
      // Concateno lo que ya habia en el array, con el nuevo value
      countries: [...input.countries, e.target.value],
    });
  }

  function handleSubmit(e) {
    if (
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.season ||
      !input.countries
    ) {
      e.preventDefault();
      alert("Complete todos los campos para poder continuar");
    } else {
      e.preventDefault();
      dispatch(postActivity(input));
      alert("Tu actividad ha sido creada exitosamente");
      // Para volver a la pantalla principal
      history.push("/home");
      // Reseteamos el input
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      //Se va a filtrar todo el array, devolviendo todos los paises que no coincidan con el seleccionado
      countries: input.countries.filter((country) => country !== e), // e es el pais que se esta eliminando de countries (el pais que se esta checkeando)
    });
  }

  useEffect(() => {
    dispatch(getCountries("asc"));
  }, [dispatch]);

  console.log(input);

  return (
    <div className={styles.create}>
      <div className={styles1.flex}>
        <Link to='/home'>
          <button className={styles1.back}>Volver</button>
        </Link>
      </div>
      <h1 className={styles.title}>CREAR ACTIVIDAD</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.justify}>
        <div>
          <div className={styles.container}>
            <label className={styles.label}>Nombre: </label>
            <input
              type='text'
              value={input.name}
              name='name'
              pattern='[a-zA-Z\u00C0-\u017F ]{2,254}'
              onChange={handleChange}
              className={styles.input}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className={styles.container}>
            <label className={styles.label}>Dificultad: </label>
            <label>
              <input
                type='radio'
                value='1'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              1
            </label>
            <label>
              <input
                type='radio'
                value='2'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              2
            </label>
            <label>
              <input
                type='radio'
                value='3'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              3
            </label>
            <label>
              <input
                type='radio'
                value='4'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              4
            </label>
            <label>
              <input
                type='radio'
                value='5'
                name='difficulty'
                onChange={(e) => handleCheck(e)}
              />
              5
            </label>
          </div>
          <div className={styles.container}>
            <label className={styles.label}>Duracion: </label>
            <input
              type='text'
              value={input.duration}
              name='duration'
              onChange={handleChange}
              className={styles.input}
            />
            {errors.duration && <p>{errors.duration}</p>}
          </div>
          <div className={styles.container}>
            <label className={styles.label}>Temporada: </label>
            <label>
              <input
                type='radio'
                value='Verano'
                name='season'
                onChange={(e) => handleCheck(e)}
              />
              Verano
            </label>
            <label>
              <input
                type='radio'
                value='Primavera'
                name='season'
                onChange={(e) => handleCheck(e)}
              />
              Primavera
            </label>
            <label>
              <input
                type='radio'
                value='Otoño'
                name='season'
                onChange={(e) => handleCheck(e)}
              />
              Otoño
            </label>
            <label>
              <input
                type='radio'
                value='Invierno'
                name='season'
                onChange={(e) => handleCheck(e)}
              />
              Invierno
            </label>
            {errors.season && <p>{errors.season}</p>}
          </div>
          <div className={styles.container}>
            <label className={styles.label}>Pais donde se realiza: </label>
            <div className={styles1.custom}>
              <select
                onChange={(e) => handleSelect(e)}
                className={styles1.select}
              >
                {countries.map((country) => (
                  <option value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
            {errors.countries && <p>{errors.countries}</p>}
          </div>
          {input.countries.map((e) => (
            <div className={styles.countryContainer}>
              <p className={styles.name}>{e}</p>
              <button
                type='button'
                onClick={() => handleDelete(e)}
                className={styles1.back}
              >
                X
              </button>
            </div>
          ))}
          <div className={styles.center}>
            <button type='submit' className={styles1.btn}>
              Crear actividad
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
