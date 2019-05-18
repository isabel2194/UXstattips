import React, { Component } from "react";
import "../../scss/dashboard.scss";
import DatatablePage from "../../base_components/DatatablePage";
import AuthHelperMethods from "./authHelperMethods";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

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
      field: "acciones_medias",
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
const Auth = new AuthHelperMethods();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: {},
      browsers: [],
      ssoo: [],
      ubications: [],
      visits_by_day: [],
      inicio: "",
      fin: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.filtrarPorFecha = this.filtrarPorFecha.bind(this);
  }
  componentWillMount() {
    this.getVisitsByDay("", "");
    this.getGeneral("", "");
    //this.getBrowsers();
    //this.getSsoo();
  }

  getVisitsByDay(inicio, fin) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }

    //const url ="https://uxserverstattips.herokuapp.com/visitsByDay?url=" + Auth.getWebPage() + "&inicio=" + oldDate.getTime() +"&fin=" +new Date().getTime();

    const url =
      "http://localhost:3001/visitsByDay?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ visits_by_day: data });
      })
      .catch(error => console.log(error));
  }

  getGeneral(inicio, fin) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }

    //const url ="https://uxserverstattips.herokuapp.com/general?url=" + Auth.getWebPage() + "&inicio=" + oldDate.getTime() +"&fin=" +new Date().getTime();

    const url =
      "http://localhost:3001/general?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;
    this.setState({ general: {} });
    fields_general.rows = [];
    return fetch(url)
      .then(response => response.json())
      .then(general => {
        for (let i = 0; i < general.length; i++) {
          fields_general.rows.push({
            path: general[i].path,
            total_visitas: general[i].total_visitas,
            tiempo_medio: general[i].tiempo_medio,
            acciones_medias: general[i].acciones_medias
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
    const url =
      "https://uxserverstattips.herokuapp.com/websites/browsers?website=" +
      Auth.getWebPage();
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
    const url =
      "https://uxserverstattips.herokuapp.com/websites/ssoo?website=" +
      Auth.getWebPage();
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  filtrarPorFecha() {
    var inicio = new Date(this.state.inicio).getTime();
    var f = new Date(this.state.fin);
    f.setHours(23, 59, 59);
    var fin = f.getTime();
    this.getGeneral(inicio, fin);
    this.getVisitsByDay(inicio, fin);
  }

  render() {
    return (
      <div className="dashboard">
        <h2 className="titulo2">Dashboard</h2>
        <div className="datepicker-group">
          <div className="form-group datepicker">
            <label htmlFor="inicio">Desde:</label>
            <input
              type="date"
              name="inicio"
              id="inicio"
              className="form-control"
              value={this.state.inicio}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group datepicker">
            <label htmlFor="fin">Hasta:</label>
            <input
              type="date"
              name="fin"
              id="fin"
              className="form-control"
              value={this.state.fin}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn" onClick={this.filtrarPorFecha}>
            Filtrar por fecha
          </button>
        </div>
        <LineChart
          width={800}
          height={300}
          data={this.state.visits_by_day}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis
            label={{ value: "Visitas", angle: -90, position: "insideLeft" }}
            allowDecimals={false}
          />
          <Tooltip />
          <Line
            name="Visitas"
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>

        <DatatablePage data={this.state.general} update={this.state.update} />
        {/*<div className="browser_ssoo">
          <div className="browser">
            <h3 className="titulo3">Navegadores utilizados</h3>
            <DatatablePage data={this.state.browsers} />
            <div />
          </div>
          <div className="ssoo">
            <h3 className="titulo3">Sistemas operativos utilizados</h3>
            <DatatablePage data={this.state.ssoo} />
          </div>
        </div>*/}
      </div>
    );
  }
}

export default Dashboard;
