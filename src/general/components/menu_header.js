import React, { Component } from "react";
import "../../scss/menu_header.scss";
import logo from "../../img/logo.png";

class MenuHeader extends Component {
  render() {
    return (
      <nav className="menu-header">
        <img src={logo} className="logo" alt="logo" />
        <ul>
          <li>
            <a href="/js">Comienza</a>
          </li>
          <li>
            <a href="/login">Documentacion</a>
          </li>
          <li className="btn btn-active">
            <a href="/registro">Regístrate</a>
          </li>
          <li>
            <a href="/login">Iniciar sesión</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default MenuHeader;
