import React, { Component } from "react";
import "../scss/registro.scss";

class Registro extends Component {
  render() {
    return (
      <div class="registro">
        <h3>
          Completa tu registro con nosotros y<br /> comienza a mejorar tu web!
        </h3>
        <form class="formulario">
          <label class="label" for="nombreCliente">
            Nombre
          </label>
          <input class="input" id="nombreCliente" type="text" required />
          <label class="label" for="apellidosCliente">
            Apellidos
          </label>
          <input class="input" id="apellidosCliente" type="text" required />
          <label class="label" for="emailCliente">
            Email
          </label>
          <input class="input" id="emailCliente" type="email" required />
          <label class="label" for="passwordCliente">
            Contraseña
          </label>
          <input class="input" id="passwordCliente" type="password" required />
          <label class="label" for="repasswordCliente">
            Repetir contraseña
          </label>
          <input
            class="input"
            id="repasswordCliente"
            type="password"
            required
          />
        </form>
      </div>
    );
  }
}

export default Registro;
