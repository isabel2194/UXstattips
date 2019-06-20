import React, { Component } from "react";
import AuthHelperMethods from "./authHelperMethods";
import "../../scss/ajustes.scss";

//const server = "http://localhost:3001";
const server = "https://uxserverstattips.herokuapp.com";

const Auth = new AuthHelperMethods();

class Ajustes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peso_click: 0.2,
      peso_mov: 0.05,
      peso_push: 0.2
    };
    this.handleChange = this.handleChange.bind(this);
    this.cambiarPeso = this.cambiarPeso.bind(this);
  }

  componentDidMount() {
    this.getPesos();
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  cambiarPeso(event) {
    event.preventDefault();
    return fetch(server + "/client/changeWeight", {
      method: "POST",
      body: JSON.stringify({
        email: Auth.getUserEmail(),
        peso_click: event.target.peso_click.value,
        peso_mov: event.target.peso_mov.value,
        peso_push: event.target.peso_push.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(alert("Nuevos pesos guardados"));
  }

  getPesos() {
    const url = server + "/client/pesos?email=" + Auth.getUserEmail();
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peso_click: data.peso_click,
          peso_mov: data.peso_mov,
          peso_push: data.peso_push
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="ajustes">
        <h3 className="titulo2">
          Ajustes
          <br />
        </h3>
        <h4>Tu token es: {Auth.getClientToken()}</h4>
        <div className="pesoAcciones box-blue">
          <h4>Cambia el peso de las acciones:</h4>
          <form onSubmit={this.cambiarPeso}>
            <div className="form-group">
              <label htmlFor="pesoClick">Peso de click:</label>
              <input
                id="pesoClick"
                name="peso_click"
                type="number"
                className="form-control"
                value={this.state.peso_click}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pesoMov">Peso de movimiento de 1px:</label>
              <input
                id="pesoMov"
                name="peso_mov"
                className="form-control"
                type="number"
                value={this.state.peso_mov}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pesoPush">Peso de pulsación de tecla:</label>
              <input
                id="pesoPush"
                name="peso_push"
                type="number"
                className="form-control"
                value={this.state.peso_push}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn">
              Cambiar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Ajustes;
