import React, { Component } from "react";
import "../scss/documentacion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Documentacion extends Component {
  copy() {}

  render() {
    return (
      <div className="documentacion">
        <div>
          <input type="text" val="aqui va el cdn" className="cdn-input" />
          <button onClick={this.copy}>
            <FontAwesomeIcon icon={["far", "copy"]} />
          </button>
        </div>
        <div>
          <h2 className="titulo2">
            Inserta la librería en tu web <br />y comienza a mejorarla!
          </h2>
        </div>
      </div>
    );
  }
}

export default Documentacion;
