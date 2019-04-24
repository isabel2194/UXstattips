import React, { Component } from "react";
import "../scss/login.scss";
import AuthHelperMethods from "./private/authHelperMethods";

class Login extends Component {
  state = { email: "", passwd: "" };

  Auth = new AuthHelperMethods();

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace("/dashboard");
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();

    /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
    this.Auth.login(this.state.email, this.state.passwd)
      .then(res => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        }
        console.log(res);
        this.props.history.replace("/dashboard");
      })
      .catch(err => {
        alert(err);
      });
  };

  /*onSubmit = event => {
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
          this.props.history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };*/

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
        <form className="formulario" onSubmit={this.handleFormSubmit}>
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
