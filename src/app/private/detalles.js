import React, { Component } from "react";
import "../../scss/detalles.scss";
import NormalTable from "../../base_components/NormalTable";
import AuthHelperMethods from "./authHelperMethods";
import queryString from "query-string";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import DatatablePage from "../../base_components/DatatablePage";

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
      label: "Tiempo",
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
      inicio: "",
      fin: "",
      path: values.path
    };
    this.handleChange = this.handleChange.bind(this);
    this.filtrarPorFecha = this.filtrarPorFecha.bind(this);
  }
  componentDidMount() {
    this.getGeneralView("", "", this.state.path);
    this.getDetailsView("", "", this.state.path);
  }

  getLineGeneralView(inicio, fin, path) {
    if (isNaN(inicio) || isNaN(fin) || inicio === "" || fin === "") {
      inicio = new Date();
      inicio.setDate(inicio.getDate() - 7);
      inicio = inicio.getTime();
      fin = new Date().getTime();
    }

    /*const url =
      "http://localhost:3001/visitsByDay?url=" +
      Auth.getWebPage() +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/generalViewData?url=" +
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

    /*const url =
      "http://localhost:3001/generalView?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/generalView?url=" +
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

    /*const url =
      "http://localhost:3001/detailView?url=" +
      Auth.getWebPage() +
      "&path=" +
      path +
      "&inicio=" +
      inicio +
      "&fin=" +
      fin;*/

    const url =
      "https://uxserverstattips.herokuapp.com/detailView?url=" +
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
    //this.getVisitsByDay(inicio, fin);
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
        </div>
        {/*<LineChart
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
        </LineChart>*/}

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
