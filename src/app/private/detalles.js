import React, { Component } from "react";
import "../../scss/detalles.scss";
import NormalTable from "../../base_components/NormalTable";
import AuthHelperMethods from "./authHelperMethods";
import queryString from "query-string";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import DatatablePage from "../../base_components/DatatablePage";

//const server = "http://localhost:3001";
const server = "https://uxserverstattips.herokuapp.com";

const fields_general = {
  columns: [
    {
      label: "Usuarios totales",
      field: "total_users",
      sort: "asc",
      width: 150
    },
    {
      label: "Tiempo medio de sesion (seg.)",
      field: "time_session",
      sort: "asc",
      width: 150
    },
    {
      label: "Media de acciones realizadas",
      field: "average_actions",
      sort: "asc",
      width: 150
    }
  ],
  rows: []
};

const fields_details = {
  columns: [
    {
      label: "Usuario (IP)",
      field: "user",
      sort: "asc",
      width: 150
    },
    {
      label: "Acciones totales",
      field: "total_actions",
      sort: "asc",
      width: 150
    },
    {
      label: "Acciones de tipo 1",
      field: "type_one_actions",
      sort: "asc",
      width: 150
    },
    {
      label: "Tiempo (seg.)",
      field: "time",
      sort: "asc",
      width: 150
    },
    {
      label: "Navegadores utilizados",
      field: "browsers",
      sort: "asc",
      width: 150
    },
    {
      label: "Sistemas operativos utilizados",
      field: "ssoos",
      sort: "asc",
      width: 150
    }
  ],
  rows: []
};

const Auth = new AuthHelperMethods();

class Detalles extends Component {
  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);

    this.state = {
      general: {},
      details: {},
      visits_by_day: [],
      tiempo_medio_by_day: [],
      tiempo_total_by_day: [],
      media_acciones_by_day: [],
      total_acciones_by_day: [],
      inicio: "",
      fin: "",
      path: values.path
    };
    this.handleChange = this.handleChange.bind(this);
    this.filtrarPorFecha = this.filtrarPorFecha.bind(this);
    this.setInputDates = this.setInputDates.bind(this);
  }
  componentDidMount() {
    this.getGeneralView("", "", this.state.path);
    this.getDetailsView("", "", this.state.path);
    this.getVisitsByDay("", "", this.state.path);
    this.getTiempoMedioByDay("", "", this.state.path);
    this.getTiempoTotalByDay("", "", this.state.path);
    this.getMediaAccionesByDay("", "", this.state.path);
    this.getTotalAccionesByDay("", "", this.state.path);
  }
  getVisitsByDay(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/visitsPathByDay?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
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

  getTiempoMedioByDay(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/tiempoMedioPathByDay?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ tiempo_medio_by_day: data });
      })
      .catch(error => console.log(error));
  }
  getTiempoTotalByDay(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/tiempoTotalPathByDay?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ tiempo_total_by_day: data });
      })
      .catch(error => console.log(error));
  }

  getMediaAccionesByDay(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/mediaAccionesPathByDay?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ media_acciones_by_day: data });
      })
      .catch(error => console.log(error));
  }

  getTotalAccionesByDay(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/totalAccionesPathByDay?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ total_acciones_by_day: data });
      })
      .catch(error => console.log(error));
  }

  getLineGeneralView(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }

    const url =
      server +
      "/generalViewData?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
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

  getGeneralView(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }

    const url =
      server +
      "/generalView?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
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
            total_users: general[i].total_users,
            time_session: general[i].time_session,
            average_actions: general[i].average_actions
          });
        }
        return fields_general;
      })
      .then(data => {
        this.setState({ general: data });
      })
      .catch(error => console.log(error));
  }

  getDetailsView(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);

      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/detailView?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;
    this.setState({ details: {} });
    fields_details.rows = [];
    return fetch(url)
      .then(response => response.json())
      .then(details => {
        for (let i = 0; i < details.length; i++) {
          fields_details.rows.push({
            user: details[i].user,
            total_actions: details[i].total_actions,
            type_one_actions: details[i].type_one_actions,
            time: details[i].time,
            browsers: details[i].browsers,
            ssoos: details[i].ssoos
          });
        }
        return fields_details;
      })
      .then(data => {
        this.setState({ details: data });
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
    this.getDetailsView(inicio, fin, this.state.path);
    this.getGeneralView(inicio, fin, this.state.path);
    this.getVisitsByDay(inicio, fin, this.state.path);
    this.getTiempoMedioByDay(inicio, fin, this.state.path);
    this.getTiempoTotalByDay(inicio, fin, this.state.path);
    this.getMediaAccionesByDay(inicio, fin, this.state.path);
    this.getTotalAccionesByDay(inicio, fin, this.state.path);
  }

  filtrarPorDias(dias) {
    var inicio = new Date();
    inicio.setDate(inicio.getDate() - dias);
    inicio = inicio.getTime();
    var fin = new Date().getTime();

    this.getDetailsView(inicio, fin, this.state.path);
    this.getGeneralView(inicio, fin, this.state.path);
    this.getVisitsByDay(inicio, fin, this.state.path);
    this.getTiempoMedioByDay(inicio, fin, this.state.path);
    this.getTiempoTotalByDay(inicio, fin, this.state.path);
    this.getMediaAccionesByDay(inicio, fin, this.state.path);
    this.getTotalAccionesByDay(inicio, fin, this.state.path);
  }

  setInputDates(inicio, fin) {
    var date = new Date(inicio);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    this.setState({
      inicio:
        year + "-" + ("0" + (month + 1)).slice(-2) + "-" + ("0" + day).slice(-2)
    });

    date = new Date(fin);
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    this.setState({
      fin:
        year + "-" + ("0" + (month + 1)).slice(-2) + "-" + ("0" + day).slice(-2)
    });
  }

  render() {
    return (
      <div className="detalles">
        <h2 className="titulo2">Detalles de la vista {this.state.path} </h2>
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
          <div className="pull-right fast-options">
            <label>Últimos:</label>
            <button
              className="btn btn-link"
              onClick={this.filtrarPorDias.bind(this, 7)}
            >
              7 días
            </button>
            <button
              className="btn btn-link"
              onClick={this.filtrarPorDias.bind(this, 15)}
            >
              15 días
            </button>
            <button
              className="btn btn-link"
              onClick={this.filtrarPorDias.bind(this, 30)}
            >
              30 días
            </button>
          </div>
        </div>
        <div className="charts">
          <Tabs>
            <TabList>
              <Tab>Visitas</Tab>
              <Tab>Tiempo medio</Tab>
              <Tab>Tiempo total</Tab>
              <Tab>Media de acciones</Tab>
              <Tab>Total de acciones</Tab>
            </TabList>

            <TabPanel>
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
                  label={{
                    value: "Visitas",
                    angle: -90,
                    position: "insideLeft"
                  }}
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
            </TabPanel>
            <TabPanel>
              <LineChart
                width={800}
                height={300}
                data={this.state.tiempo_medio_by_day}
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
                  label={{
                    value: "Tiempo medio",
                    angle: -90,
                    position: "insideLeft"
                  }}
                  allowDecimals={false}
                />
                <Tooltip />
                <Line
                  name="Tiempo medio"
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </TabPanel>
            <TabPanel>
              <LineChart
                width={800}
                height={300}
                data={this.state.tiempo_total_by_day}
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
                  label={{
                    value: "Tiempo total",
                    angle: -90,
                    position: "insideLeft"
                  }}
                  allowDecimals={false}
                />
                <Tooltip />
                <Line
                  name="Tiempo total"
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </TabPanel>
            <TabPanel>
              <LineChart
                width={800}
                height={300}
                data={this.state.media_acciones_by_day}
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
                  label={{
                    value: "Media de acciones",
                    angle: -90,
                    position: "insideLeft"
                  }}
                  allowDecimals={false}
                />
                <Tooltip />
                <Line
                  name="Media de acciones"
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </TabPanel>
            <TabPanel>
              <LineChart
                width={800}
                height={300}
                data={this.state.total_acciones_by_day}
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
                  label={{
                    value: "Total de acciones",
                    angle: -90,
                    position: "insideLeft"
                  }}
                  allowDecimals={false}
                />
                <Tooltip />
                <Line
                  name="Total de acciones"
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </TabPanel>
          </Tabs>
        </div>

        <NormalTable data={this.state.general} update={this.state.update} />
        <div className="box-gray">
          <h3 className="titulo3">Resumen de usuarios</h3>
          <DatatablePage data={this.state.details} update={this.state.update} />
        </div>
      </div>
    );
  }
}

export default Detalles;
