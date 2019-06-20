import React, { Component } from "react";

import logo from "../img/logo.png";
import AuthHelperMethods from "./private/authHelperMethods";

class MenuHeader extends Component {
  Auth = new AuthHelperMethods();

  /* Add the following into _handleLogout*/
  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/login");
  };

  render() {
    return (
      <header className="App-header">
        <nav className="menu-header">
          <a href="/index">
            <img src={logo} className="logo" alt="logo" />
          </a>
          <ul>
            <li>
              <a href="/js">Comienza</a>
            </li>
            <li>
              <a href="/documentacion">Documentacion</a>
            </li>
            {!this.Auth.loggedIn() && (
              <li className="btn btn-active">
                <a href="/registro">Regístrate</a>
              </li>
            )}
            {!this.Auth.loggedIn() && (
              <li>
                <a href="/login">Iniciar sesión</a>
              </li>
            )}
            {this.Auth.loggedIn() && (
              <li className="btn btn-active">
                <a href="/dashboard">Dashboard</a>
              </li>
            )}
            {this.Auth.loggedIn() && <li>Hola, {this.Auth.getUserEmail()}</li>}
            {this.Auth.loggedIn() && (
              <li>
                <a href="/ajustes">Ajustes</a>
              </li>
            )}
            {this.Auth.loggedIn() && (
              <li>
                <a onClick={this._handleLogout} href="/logout">
                  Cerrar sesion
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default MenuHeader;
