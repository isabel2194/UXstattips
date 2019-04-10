import React, { Component } from "react";
import "./scss/base.scss";
import { Route, BrowserRouter } from "react-router-dom";
import "./scss/menu_header.scss";

import logo from "./img/logo.png";

import Registro from "./home/registro";
import Login from "./home/login";
import Home from "./home/home";
import Documentacion from "./home/documentacion";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <nav className="menu-header">
              <img src={logo} className="logo" alt="logo" />
              <ul>
                <li>
                  <a href="/js">Comienza</a>
                </li>
                <li>
                  <a href="/documentacion">Documentacion</a>
                </li>
                <li className="btn btn-active">
                  <a href="/registro">Regístrate</a>
                </li>
                <li>
                  <a href="/login">Iniciar sesión</a>
                </li>
              </ul>
            </nav>
          </header>
          <Route path="/index" component={Home} />
          {/*<Route path="/js" component={libraryJS} />*/}
          <Route path="/documentacion" component={Documentacion} />
          <Route path="/registro" component={Registro} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
