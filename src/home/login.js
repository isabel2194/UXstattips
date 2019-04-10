import React, { Component } from "react";
import $ from "jquery";
import "../scss/login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", passwd: "" };

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(event) {
    event.preventDefault();
    console.log(event.target.name.value);
    $.ajax({
      url: "https://uxserverstattips.herokuapp.com/clients/",
      method: "GET",
      data: JSON.stringify({
        email: event.target.email.value,
        password: event.target.passwd.value
      }),
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        alert("Usuario logueado");
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
          Inicia sesión
          <br />
        </h3>
        <form className="formulario" onSubmit={this.registrar}>
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
          <button type="submit" className="btn btn-active">
            Accede
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
