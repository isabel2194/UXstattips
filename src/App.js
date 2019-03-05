import React, { Component } from "react";
import "./scss/base.scss";
import MenuHeader from "./general/components/menu_header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MenuHeader />
        </header>
      </div>
    );
  }
}

export default App;
