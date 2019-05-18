import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Registro from "./app/registro";
import Login from "./app/login";
import Documentacion from "./app/documentacion";
import Dashboard from "./app/private/dashboard";
import withAuth from "./app/private/withAuth";
import { withRouter, Redirect } from "react-router-dom";
import MenuHeader from "./app/menuHeader";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MenuHeader />
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
