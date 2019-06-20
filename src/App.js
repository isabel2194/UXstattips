import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Registro from "./app/registro";
import Login from "./app/login";
import Documentacion from "./app/documentacion";
import Dashboard from "./app/private/dashboard";
import withAuth from "./app/private/withAuth";
import Ajustes from "./app/private/ajustes";
import { withRouter, Redirect } from "react-router-dom";
import MenuHeader from "./app/menuHeader";
import Detalles from "./app/private/detalles";
import Home from "./app/home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MenuHeader />
          <Route exact path="/" render={() => <Redirect to="/index" />} />
          <Route exact path="/logout" render={() => <Redirect to="/index" />} />
          <Route path="/index" component={Home} />
          <Route path="/js" component={Home} />
          <Route path="/documentacion" component={Documentacion} />
          <Route path="/ajustes" component={Ajustes} />
          <Route path="/registro" component={Registro} />
          <Route path="/login" component={Login} />
          <Route
            path="/dashboard"
            component={withRouter(withAuth(Dashboard))}
          />
          <Route path="/vista" component={withRouter(Detalles)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
