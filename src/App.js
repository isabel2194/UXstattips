import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import logo from "./img/logo.png";

import Registro from "./app/registro";
import Login from "./app/login";
import Documentacion from "./app/documentacion";
import Dashboard from "./app/private/dashboard";
import withAuth from "./app/private/withAuth";
import AuthHelperMethods from "./app/private/authHelperMethods";
import { withRouter, Redirect } from "react-router-dom";

class App extends Component {
  Auth = new AuthHelperMethods();

  /* Add the following into _handleLogout*/
  _handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/login");
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
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
          <Route exact path="/" render={() => <Redirect to="/index" />} />
          <Route exact path="/logout" render={() => <Redirect to="/index" />} />
          <Route path="/index" component={Documentacion} />
          <Route path="/js" component={Documentacion} />
          <Route path="/registro" component={Registro} />
          <Route path="/login" component={Login} />
          <Route
            path="/dashboard"
            component={withRouter(withAuth(Dashboard))}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
