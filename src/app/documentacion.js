import React, { Component } from "react";
import "../scss/documentacion.scss";
import { Link } from "react-router-dom";

class Documentacion extends Component {
  render() {
    return (
      <div className="documentacion">
        <div className="box-blue">
          <h2 className="titulo2">¿Como utilizar UXjs?</h2>
          <p>
            Lo primero que debemos hacer será decargarnos el fichero JavaScript
            de la siguiente url: <a href="">UXjs</a>.<br />A continuación, nos
            registraremos en esta web en el apartado{" "}
            <Link to="/registro">Registro</Link> e insertaremos la url de
            nuestra web si el protocolo, por ej. www.website.com , NO
            https://www.website.com . <br />{" "}
          </p>
          <p>
            Después de esto simplemente nos loguearemos y podremos ver
            diferentes datos que nuestra herramienta recolecta:
          </p>
          <ul>
            <li>
              Usuarios (IP, navegadores utilizados, sistemas operativos
              utilizados, ubicación, acciones realizadas y sobre que elementos
              del DOM de nuestra web, tiempo que pasa en cada página,etc.)
            </li>
            <li>Páginas más visitadas</li>
            <li>Gráficas de tendencia</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Documentacion;
