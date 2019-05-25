import React, { Component } from "react";
import "../../scss/dashboard.scss";
import DatatablePage from "../../base_components/DatatablePage";
import AuthHelperMethods from "./authHelperMethods";
import { Link } from "react-router-dom";
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
      label: "Tiempo medio (seg.)",
      field: "tiempo_medio",
      sort: "asc",
      width: 150
    },
    {
      label: "Tiempo total (seg.)",
      field: "tiempo_total",
      sort: "asc",
      width: 150
    },
    {
      label: "Media de las acciones registradas",
      field: "acciones_medias",
      sort: "asc",
      width: 150
    },
    {
      label: "Total de acciones registradas",
      field: "acciones_totales",
      sort: "asc",
      width: 150
    },
    {
      label: "...",
      field: "details",
      sort: "asc",
      width: 150
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
      visits_by_day: [],
      tiempo_medio_by_day: [],
      tiempo_total_by_day: [],
      media_acciones_by_day: [],
      total_acciones_by_day: [],
      inicio: "",
      fin: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.filtrarPorFecha = this.filtrarPorFecha.bind(this);
    this.filtrarPorDias = this.filtrarPorDias.bind(this);
  }
  componentWillMount() {
    this.getVisitsByDay("", "");
    this.getGeneral("", "");
    this.getTiempoMedioByDay("", "");
    this.getTiempoTotalByDay("", "");
    this.getMediaAccionesByDay("", "");
    this.getTotalAccionesByDay("", "");
  }

  getVisitsByDay(inicio, fin) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    //const url ="https://uxserverstattips.herokuapp.com/visitsByDay?url=" + Auth.getWebPage() + "&inicio=" + oldDate.getTime() +"&fin=" +new Date().getTime();

    /*const url =
      "http://localhost:3001/visitsByDay?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/visitsByDay?url=" +
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

  getTiempoMedioByDay(inicio, fin) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    //const url ="https://uxserverstattips.herokuapp.com/visitsByDay?url=" + Auth.getWebPage() + "&inicio=" + oldDate.getTime() +"&fin=" +new Date().getTime();

    /*const url =
      "http://localhost:3001/tiempoMedioByDay?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/tiempoMedioByDay?url=" +
      Auth.getWebPage() +
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
  getTiempoTotalByDay(inicio, fin) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    //const url ="https://uxserverstattips.herokuapp.com/visitsByDay?url=" + Auth.getWebPage() + "&inicio=" + oldDate.getTime() +"&fin=" +new Date().getTime();

    /*const url =
      "http://localhost:3001/tiempoTotalByDay?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/tiempoTotalByDay?url=" +
      Auth.getWebPage() +
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

  getMediaAccionesByDay(inicio, fin) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    //const url ="https://uxserverstattips.herokuapp.com/visitsByDay?url=" + Auth.getWebPage() + "&inicio=" + oldDate.getTime() +"&fin=" +new Date().getTime();

    /*const url =
      "http://localhost:3001/mediaAccionesByDay?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/mediaAccionesByDay?url=" +
      Auth.getWebPage() +
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

  getTotalAccionesByDay(inicio, fin) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }
    this.setInputDates(inicio, fin);

    //const url ="https://uxserverstattips.herokuapp.com/totalAccionesByDay?url=" + Auth.getWebPage() + "&inicio=" + oldDate.getTime() +"&fin=" +new Date().getTime();

    /* const url =
      "http://localhost:3001/totalAccionesByDay?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/totalAccionesByDay?url=" +
      Auth.getWebPage() +
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

  getGeneral(inicio, fin) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }

    //const url ="https://uxserverstattips.herokuapp.com/general?url=" + Auth.getWebPage() + "&inicio=" + oldDate.getTime() +"&fin=" +new Date().getTime();

    /*const url =
      "http://localhost:3001/general?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/general?url=" +
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
            tiempo_total: general[i].tiempo_total,
            acciones_medias: general[i].acciones_medias,
            acciones_totales: general[i].acciones_totales,
            details_button: (
              <Link to={`/vista?path=${general[i].path}`}>Detalles</Link>
            )
          });
        }
        return fields_general;
      })
      .then(data => {
        this.setState({ general: data });
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
    this.getTiempoMedioByDay(inicio, fin);
    this.getTiempoTotalByDay(inicio, fin);
    this.getMediaAccionesByDay(inicio, fin);
    this.getTotalAccionesByDay(inicio, fin);
  }

  filtrarPorDias(dias) {
    var inicio = new Date();
    inicio.setDate(inicio.getDate() - dias);
    inicio = inicio.getTime();
    var fin = new Date().getTime();

    this.getGeneral(inicio, fin);
    this.getVisitsByDay(inicio, fin);
    this.getTiempoMedioByDay(inicio, fin);
    this.getTiempoTotalByDay(inicio, fin);
    this.getMediaAccionesByDay(inicio, fin);
    this.getTotalAccionesByDay(inicio, fin);
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
        <DatatablePage data={this.state.general} update={this.state.update} />
      </div>
    );
  }
}

export default Dashboard;
