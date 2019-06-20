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
            de la siguiente url:{" "}
            <a href="https://unioviedo-my.sharepoint.com/:f:/g/personal/uo231413_uniovi_es/Eha6B-hDeBtPt-4JIWXRvEUBAxf8KCKbLxoRRdTf8i0rwA?e=OajOa8">
              UXjs
            </a>
            .<br />A continuación, nos registraremos en esta web en el apartado{" "}
            <Link to="/registro">Registro</Link> e insertaremos la url de
            nuestra web si el protocolo, por ej. www.website.com , NO
            https://www.website.com . <br />{" "}
          </p>
          <p>
            A continuación debes <Link to="/login">iniciar sesión</Link> y
            entrar en la opción de menú <Link to="/ajustes">Ajustes</Link>,
            copiar el token y pegarlo en la primera línea del fichero JS después
            del '='.
          </p>
          <p>Ejemplo: var uxstattips_token = "AQUI_VA_EL_TOKEN";</p>
          <p>
            Una vez hecho esto la librería UXjs va a empezar a recopilar
            información de los usuario y podrá ver diferentes datos que nuestra
            herramienta recolecta:
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
