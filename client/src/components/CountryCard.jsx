import { Link } from "react-router-dom";
import styles from "./CountryCard.module.css";

function CountryCard({ flags, name, continent, id }) {
  return (
    <div className={styles.card}>
      <div>
        <Link to={"/home/" + id}>
          <img
            src={flags}
            alt='imagen no encontrada'
            width='250px'
            height='125px'
            className={styles.countryImage}
          />
          <h3>{name.toUpperCase()}</h3>
          <h5>{continent}</h5>
        </Link>
      </div>
    </div>
  );
}

export default CountryCard;
