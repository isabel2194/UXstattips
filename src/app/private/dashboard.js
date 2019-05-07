import React, { Component } from "react";
import FilterableTable from "react-filterable-table";
import "../../scss/dashboard.scss";
import DatatablePage from "../../base_components/DatatablePage";

const fields_general = {
  columns: [
    {
      label: "Vista",
      field: "path",
      sort: "asc",
      width: 150
    },
    {
      label: "Total de visitas",
      field: "total_visitas",
      sort: "asc",
      width: 150
    },
    {
      label: "Tiempo medio",
      field: "tiempo_medio",
      sort: "asc",
      width: 150
    },
    {
      label: "Media de las acciones registradas",
      field: "total_acciones",
      sort: "asc",
      width: 150
    }
  ],
  rows: []
};

const fields_browser = {
  columns: [
    {
      label: "Navegador",
      field: "key",
      sort: "asc",
      width: 150
    },
    {
      label: "Numero de sesiones",
      field: "value",
      sort: "asc",
      width: 270
    }
  ],
  rows: []
};

const fields_ssoo = {
  columns: [
    {
      label: "Sistema operativo",
      field: "key",
      sort: "asc",
      width: 150
    },
    {
      label: "Numero de sesiones",
      field: "value",
      sort: "asc",
      width: 270
    }
  ],
  rows: []
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: [],
      browsers: [],
      ssoo: [],
      ubications: []
    };
  }
  componentWillMount() {
    this.getGeneral();
    this.getBrowsers();
    this.getSsoo();
  }

  getGeneral() {
    //const url ="https://uxserverstattips.herokuapp.com/website=" + website + "/browsers";
    const url =
      "https://uxserverstattips.herokuapp.com/sessions/datatable1?url=file:///C:/Users/Isabel/Desktop/Master/htdocs/isabel/index.html";
    return fetch(url)
      .then(response => response.json())
      .then(general => {
        for (let i = 0; i < general.length; i++) {
          fields_general.rows.push({
            path: general[i].path,
            total_visitas: general[i].total_visitas,
            tiempo_medio: general[i].tiempo_medio,
            total_acciones: general[i].total_acciones
          });
        }
        return fields_general;
      })
      .then(data => {
        this.setState({ general: data });
      })
      .catch(error => console.log(error));
  }

  getBrowsers() {
    //const url ="https://uxserverstattips.herokuapp.com/website=" + website + "/browsers";
    const url =
      "https://uxserverstattips.herokuapp.com/websites/browsers?website=file:///C:/Users/Isabel/Desktop/Master/htdocs/isabel/index.html";
    return fetch(url)
      .then(response => response.json())
      .then(browsers => {
        for (let i = 0; i < browsers.length; i++) {
          fields_browser.rows.push({
            key: browsers[i]._id,
            value: browsers[i].count
          });
        }
        return fields_browser;
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
        for (let i = 0; i < ssoo.length; i++) {
          fields_ssoo.rows.push({
            key: ssoo[i]._id,
            value: ssoo[i].count
          });
        }
        return fields_ssoo;
      })
      .then(data => {
        this.setState({ ssoo: data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="dashboard">
        <h2 className="titulo2 box-blue">Dashboard</h2>
        <DatatablePage data={this.state.general} />
        <div className="browser_ssoo">
          <div className="browser">
            <h3 className="titulo3">Navegadores utilizados</h3>
            <DatatablePage data={this.state.browsers} />
            <div />
          </div>
          <div className="ssoo">
            <h3 className="titulo3">Sistemas operativos utilizados</h3>
            <DatatablePage data={this.state.ssoo} />
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
