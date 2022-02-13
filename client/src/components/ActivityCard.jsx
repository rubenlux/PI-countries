import React from "react";
import styles from "./ActivityCard.module.css";

const ActivityCard = (activity) => {
  return (
    <div className={styles.card}>
      {activity && ( // si hay una actividad seleccionada se muestra el
        // componente con los datos de la actividad seleccionada  y si no
        //se muestra un componente vacio
        <div>
          <p>
            <strong>Actividad: </strong>
            {activity.name}
          </p>
          <p>
            <strong>Dificultad: </strong>
            {activity.difficulty}
          </p>
          <p>
            <strong>Duracion: </strong>
            {activity.duration}
          </p>
          <p>
            <strong>Temporada: </strong>
            {activity.season}
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
