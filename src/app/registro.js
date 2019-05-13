import React, { Component } from "react";
import $ from "jquery";
import "../scss/registro.scss";

import AuthHelperMethods from "./private/authHelperMethods";

class Registro extends Component {
  Auth = new AuthHelperMethods();

  constructor(props) {
    super(props);
    this.state = { name: "", surname: "", email: "", passwd: "", website: "" };

    this.registrar = this.registrar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  registrar(event) {
    event.preventDefault();
    console.log(event.target.name.value);
    $.ajax({
      url: "http://localhost:3800/client",
      method: "POST",
      data: JSON.stringify({
        name: event.target.name.value,
        surname: event.target.surname.value,
        email: event.target.email.value,
        password: event.target.passwd.value,
        website: event.target.website.value
      }),
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        alert("Usuario registrado");
        this.props.history.replace("/login");
      }
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="registro">
        <h3 className="titulo3">
          Completa tu registro con nosotros y<br /> comienza a mejorar tu web!
        </h3>
        <form className="formulario" onSubmit={this.registrar}>
          <label className="label" from="nombreCliente">
            Nombre:
          </label>
          <input
            className="input"
            id="nombreCliente"
            type="text"
            required
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label className="label" from="apellidosCliente">
            Apellidos:
          </label>
          <input
            className="input"
            id="apellidosCliente"
            type="text"
            required
            name="surname"
            value={this.state.surname}
            onChange={this.handleChange}
          />
          <label className="label" from="emailCliente">
            Email:
          </label>
          <input
            className="input"
            id="emailCliente"
            type="email"
            required
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label className="label" from="passwordCliente">
            Contraseña:
          </label>
          <input
            className="input"
            id="passwordCliente"
            type="password"
            required
            name="passwd"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label className="label" from="passwordCliente">
            URL de tu web:
          </label>
          <input
            className="input"
            id="websiteCliente"
            type="text"
            required
            name="website"
            value={this.state.website}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-active">
            Registrarme
          </button>
        </form>
      </div>
    );
  }
}

export default Registro;
