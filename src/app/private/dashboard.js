import React, { Component } from "react";
import "../../scss/dashboard.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      browsers: [],
      ssoo: [],
      ubications: []
    };
  }
  componentWillMount() {
    this.getBrowsers();
    this.getSsoo();
  }

  getBrowsers() {
    //const url ="https://uxserverstattips.herokuapp.com/website=" + website + "/browsers";
    const url =
      "https://uxserverstattips.herokuapp.com/websites/browsers?website=file:///C:/Users/Isabel/Desktop/Master/htdocs/isabel/index.html";
    return fetch(url)
      .then(response => response.json())
      .then(browsers => {
        var data = [];
        for (let i = 0; i < browsers.length; i++) {
          data.push({
            key: browsers[i]._id,
            value: browsers[i].count
          });
        }
        return data;
      })
      .then(data => {
        this.setState({ browsers: data });
      })
      .catch(error => console.log(error));
  }

  getSsoo() {
    //const url ="https://uxserverstattips.herokuapp.com/website=" + website + "/browsers";
    const url =
      "https://uxserverstattips.herokuapp.com/websites/ssoo?website=file:///C:/Users/Isabel/Desktop/Master/htdocs/isabel/index.html";
    return fetch(url)
      .then(response => response.json())
      .then(ssoo => {
        var data = [];
        for (let i = 0; i < ssoo.length; i++) {
          data.push({
            key: ssoo[i]._id,
            value: ssoo[i].count
          });
        }
        return data;
      })
      .then(data => {
        this.setState({ ssoo: data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="browser_ssoo">
          <div className="browser">
            <h3 className="titulo3">Navegadores utilizados</h3>
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>Navegador</th>
                  <th>Número de sesiones</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {this.state.browsers.map(function(item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.key}</td>
                      <td>{item.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="ssoo">
            <h3 className="titulo3">Sistemas operativos utilizados</h3>
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>Sistema operativo</th>
                  <th>Número de sesiones</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {this.state.ssoo.map(function(item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.key}</td>
                      <td>{item.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="ubication">
          <h3 className="titulo3">Ubicación de los usuarios</h3>
        </div>
      </div>
    );
  }
}

export default Dashboard;
