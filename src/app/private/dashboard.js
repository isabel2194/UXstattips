import React, { Component } from "react";
import FilterableTable from "react-filterable-table";

import "../../scss/dashboard.scss";

const fields_browser = [
  {
    name: "key",
    displayName: "Navegador",
    inputFilterable: true,
    sortable: true
  },
  {
    name: "value",
    displayName: "Numero de sesiones",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true
  }
];

const fields_ssoo = [
  {
    name: "key",
    displayName: "Navegador",
    inputFilterable: true,
    sortable: true
  },
  {
    name: "value",
    displayName: "Numero de sesiones",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true
  }
];

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
            <div>
              <FilterableTable
                namespace="Browsers"
                initialSort="key"
                data={this.state.browsers}
                fields={fields_browser}
                noRecordsMessage="No hay datos que mostrar"
                noFilteredRecordsMessage="No existe ningun dato que mostrar"
              />
            </div>
          </div>
          <div className="ssoo">
            <h3 className="titulo3">Sistemas operativos utilizados</h3>
            {/*<table className="table">
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
              </table>*/}
            <div>
              <FilterableTable
                namespace="SSOO"
                initialSort="key"
                data={this.state.ssoo}
                fields={fields_ssoo}
                noRecordsMessage="No hay datos que mostrar"
                noFilteredRecordsMessage="No existe ningun dato que mostrar"
              />
            </div>
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
