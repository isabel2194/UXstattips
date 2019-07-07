import React, { Component } from "react";
import "../../scss/detalles.scss";
import NormalTable from "../../base_components/NormalTable";
import AuthHelperMethods from "./authHelperMethods";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import ToHHmmss from "../helpers/TimeHelper";

//const server = "http://localhost:3001";
const server = "https://uxserverstattips.herokuapp.com";

const fields_general = {
  columns: [
    {
      label: "Total de visitas",
      field: "total_users",
      sort: "asc",
      width: 150
    },
    {
      label: "Tiempo medio de sesion (HH:mm:ss)",
      field: "time_session",
      sort: "asc",
      width: 150
    },
    {
      label: "Media de acciones realizadas",
      field: "average_actions",
      sort: "asc",
      width: 150
    },
    {
      label: "Media de clicks",
      field: "average_actions_type_one",
      sort: "asc",
      width: 150
    },
    {
      label: "Media de pulsaciones de teclado",
      field: "average_actions_type_two",
      sort: "asc",
      width: 150
    },
    {
      label: "Media de movimientos de ratón",
      field: "average_actions_type_three",
      sort: "asc",
      width: 150
    }
  ],
  rows: []
};

const fields_details_action = {
  columns: [
    {
      label: "Identificador de la acción",
      field: "action_id",
      sort: "asc",
      width: 150
    },
    {
      label: "Tipo de acción",
      field: "type",
      sort: "asc",
      width: 150
    },
    {
      label: "Usuarios que realizaron la acción",
      field: "users_percent",
      sort: "asc",
      width: 150
    },
    {
      label: "Media de veces realizada (por usuario en la sesión)",
      field: "media_in_sesion",
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
      label: "Indicador UXSTATTIPS*",
      field: "total_actions",
      sort: "asc",
      width: 150
    },
    {
      label: "Click (1)",
      field: "type_one_actions",
      sort: "asc",
      width: 150
    },
    {
      label: "Pulsación de teclado (2)",
      field: "type_two_actions",
      sort: "asc",
      width: 150
    },
    {
      label: "Movimiento de ratón (3)",
      field: "type_three_actions",
      sort: "asc",
      width: 150
    },
    {
      label: "Tiempo (HH:mm:ss)",
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
      details_actions: {},
      visits_by_day: [],
      tiempo_medio_by_day: [],
      tiempo_total_by_day: [],
      media_acciones_by_day: [],
      media_acciones_1_by_day: [],
      media_acciones_2_by_day: [],
      media_acciones_3_by_day: [],
      total_acciones_by_day: [],
      inicio: "",
      fin: "",
      path: values.path,
      peso_click: 0.2,
      peso_mov: 0.05,
      peso_push: 0.2
    };
    this.handleChange = this.handleChange.bind(this);
    this.filtrarPorFecha = this.filtrarPorFecha.bind(this);
    this.setInputDates = this.setInputDates.bind(this);
    this.cambiarPeso = this.cambiarPeso.bind(this);
  }
  componentDidMount() {
    this.getGeneralView("", "", this.state.path);
    this.getDetailsView("", "", this.state.path);
    this.getVisitsByDay("", "", this.state.path);
    this.getTiempoMedioByDay("", "", this.state.path);
    this.getTiempoTotalByDay("", "", this.state.path);
    this.getMediaAccionesByDay("", "", this.state.path);
    this.getMediaAccionesTipo1ByDay("", "", this.state.path);
    this.getMediaAccionesTipo2ByDay("", "", this.state.path);
    this.getMediaAccionesTipo3ByDay("", "", this.state.path);
    this.getTotalAccionesByDay("", "", this.state.path);
    this.getDetailActionsView("", "", this.state.path);
    this.getPesos();
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

  getMediaAccionesTipo1ByDay(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/mediaAccionesTipo1ByDay?url=" +
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
        this.setState({ media_acciones_1_by_day: data });
      })
      .catch(error => console.log(error));
  }
  getMediaAccionesTipo2ByDay(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/mediaAccionesTipo2ByDay?url=" +
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
        this.setState({ media_acciones_2_by_day: data });
      })
      .catch(error => console.log(error));
  }
  getMediaAccionesTipo3ByDay(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/mediaAccionesTipo3ByDay?url=" +
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
        this.setState({ media_acciones_3_by_day: data });
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
            time_session: ToHHmmss(general[i].time_session),
            average_actions: general[i].average_actions,
            average_actions_type_one: general[i].average_actions_type_one,
            average_actions_type_two: general[i].average_actions_type_two,
            average_actions_type_three: general[i].average_actions_type_three
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
            type_two_actions: details[i].type_two_actions,
            type_three_actions: details[i].type_three_actions,
            time: ToHHmmss(details[i].time),
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

  getDetailActionsView(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);

      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    const url =
      server +
      "/detailActionsView?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;
    this.setState({ details_actions: {} });
    fields_details_action.rows = [];
    return fetch(url)
      .then(response => response.json())
      .then(details => {
        for (let i = 0; i < details.length; i++) {
          var tipo = "";
          if (details[i].type === 1) {
            tipo = "Click (1)";
          } else if (details[i].type === 2) {
            tipo = "Pulsacion (2)";
          } else if (details[i].type === 3) {
            tipo = "Movimiento (3)";
          }
          fields_details_action.rows.push({
            action_id: details[i].action_id,
            type: tipo,
            users_percent: details[i].users_percent + "%",
            media_in_sesion: details[i].media_in_sesion
          });
        }
        return fields_details_action;
      })
      .then(data => {
        this.setState({ details_actions: data });
      })
      .catch(error => console.log(error));
  }

  cambiarPeso(event) {
    event.preventDefault();
    return fetch(server + "/client/changeWeight", {
      method: "POST",
      body: JSON.stringify({
        email: Auth.getUserEmail(),
        peso_click: event.target.peso_click.value,
        peso_mov: event.target.peso_mov.value,
        peso_push: event.target.peso_push.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(alert("Nuevos pesos guardados"));
  }

  getPesos() {
    const url = server + "/client/pesos?email=" + Auth.getUserEmail();
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peso_click: data.peso_click,
          peso_mov: data.peso_mov,
          peso_push: data.peso_push
        });
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
    this.getDetailActionsView(inicio, fin, this.state.path);
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
    this.getMediaAccionesTipo1ByDay(inicio, fin, this.state.path);
    this.getMediaAccionesTipo2ByDay(inicio, fin, this.state.path);
    this.getMediaAccionesTipo3ByDay(inicio, fin, this.state.path);
    this.getTotalAccionesByDay(inicio, fin, this.state.path);
    this.getDetailActionsView(inicio, fin, this.state.path);
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
              <Tab>Media de clicks</Tab>
              <Tab>Media de pulsaciones de teclado</Tab>
              <Tab>Media de movimientos de ratón</Tab>
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
                data={this.state.media_acciones_1_by_day}
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
                    value: "Media de clicks",
                    angle: -90,
                    position: "insideLeft"
                  }}
                  allowDecimals={false}
                />
                <Tooltip />
                <Line
                  name="Media de clicks"
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
                data={this.state.media_acciones_2_by_day}
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
                    value: "Media de pulsaciones de teclado",
                    angle: -90,
                    position: "insideLeft"
                  }}
                  allowDecimals={false}
                />
                <Tooltip />
                <Line
                  name="Media de pulsaciones de teclado"
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
                data={this.state.media_acciones_3_by_day}
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
                    value: "Media de movimientos de ratón",
                    angle: -90,
                    position: "insideLeft"
                  }}
                  allowDecimals={false}
                />
                <Tooltip />
                <Line
                  name="Media de movimientos de ratón"
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
                  name="Total de acciones SUM(peso*num_acciones)"
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
          <p className="little-text">
            * El indicador UXSTATTIPS equivale a la suma de todos los pesos de
            cada acción por el número de veces realizada:
            (SUM[peso*numero_accion]). Si desea cambiar los pesos para cada
            acción puede hacerlo a través de <Link to="/ajustes">Ajustes</Link>.
          </p>
        </div>
        <div className="box-gray">
          <h3 className="titulo3">Resumen de acciones</h3>
          <DatatablePage
            data={this.state.details_actions}
            update={this.state.update}
          />
        </div>
        <Link className="return-btn" to={"/dashboard"}>
          <FontAwesomeIcon icon="arrow-left" />
          Volver al dashboard
        </Link>
      </div>
    );
  }
}

export default Detalles;
