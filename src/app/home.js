import React, { Component } from "react";
import "../scss/home.scss";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="box-blue">
          <a
            className="cdn-input"
            href="https://unioviedo-my.sharepoint.com/:u:/g/personal/uo231413_uniovi_es/EYcx-FF8sP5KssBZIpJh5_EBk6TOzNwZEqH166f-HiRBgA?e=kcEsqv"
          >
            DESCÁRGATELA
          </a>
        </div>
        <div>
          <h2 className="titulo2">
            Inserta la librería <b>UXjs</b> en tu web <br />y comienza a ver tus
            estadísticas!
          </h2>
        </div>
      </div>
    );
  }
}

export default Home;
