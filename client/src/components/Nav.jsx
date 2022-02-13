import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";
import styles from "./Nav.module.css";

export default function Nav() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value); // actualiza/setea
  }
  console.log(name);

  const handleClick = (event) => {
    event.preventDefault();
    // Name es mi estado local
    dispatch(getByName(name));
    setName(""); // limpio el input
  };
  return (
    <form
      className={styles.searchContainer}
      onSubmit={(event) => handleClick(event)}
    >
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type='text'
          value={name}
          placeholder='Buscar pais...'
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className={styles.searchButton}
          type='submit'
          onClick={(event) => handleClick(event)}
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
