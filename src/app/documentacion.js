import React, { Component } from "react";
import "../scss/documentacion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import $ from "jquery";

class Documentacion extends Component {
  render() {
    return (
      <div className="documentacion">
        <div className="box-blue">
          <input
            type="text"
            className="cdn-input"
            value="http://url_del_js"
            readOnly
          />
          <button>
            <FontAwesomeIcon icon={["far", "copy"]} />
          </button>
        </div>
        <div>
          <h2 className="titulo2">
            Inserta la librería en tu web <br />y comienza a ver tus
            estadísticas!
          </h2>
        </div>
      </div>
    );
  }
}

export default Documentacion;
