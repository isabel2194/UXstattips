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

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    fetch("https://uxserverstattips.herokuapp.com/clients/login", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/dashboard");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

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
        <form className="formulario" onSubmit={this.onSubmit}>
          <label className="label" from="emailCliente">
            Email:
          </label>
          <input
            className="input"
            id="emailCliente"
            type="email"
            name="email"
            placeholder="Introduce tu email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <label className="label" from="passwordCliente">
            Contraseña:
          </label>
          <input
            className="input"
            id="passwordCliente"
            type="password"
            name="passwd"
            placeholder="Introduce password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" className="btn btn-active" value="Accede" />
        </form>
      </div>
    );
  }
}

export default Login;
