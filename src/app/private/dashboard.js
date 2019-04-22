import React, { Component } from "react";
import "../../scss/dashboard.scss";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import geographyObject from "./world-50m.json";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

const include = [
  "ARG",
  "BOL",
  "BRA",
  "CHL",
  "COL",
  "ECU",
  "GUY",
  "PRY",
  "PER",
  "SUR",
  "URY",
  "VEN"
];

const markers = [
  {
    markerOffset: -25,
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037]
  },
  { markerOffset: -25, name: "La Paz", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 35, name: "Brasilia", coordinates: [-47.8825, -15.7942] }
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
          <div style={wrapperStyles}>
            <ComposableMap
              projectionConfig={{ scale: 800 }}
              width={1000}
              height={1000}
              style={{
                width: "100%",
                height: "auto"
              }}
            >
              <ZoomableGroup center={[-60, -25]} disablePanning>
                <Geographies geography={geographyObject}>
                  {(geographies, projection) =>
                    geographies.map(
                      (geography, i) =>
                        include.indexOf(geography.id) !== -1 && (
                          <Geography
                            key={`geography-${i}`}
                            cacheId={`geography-${i}`}
                            geography={geography}
                            projection={projection}
                            style={{
                              default: {
                                fill: "#ECEFF1",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none"
                              },
                              hover: {
                                fill: "#CFD8DC",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none"
                              },
                              pressed: {
                                fill: "#FF5722",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none"
                              }
                            }}
                          />
                        )
                    )
                  }
                </Geographies>
                <Markers>
                  {markers.map((marker, i) => (
                    <Marker
                      key={i}
                      marker={marker}
                      style={{
                        default: { fill: "#FF5722" },
                        hover: { fill: "#FFFFFF" },
                        pressed: { fill: "#FF5722" }
                      }}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={10}
                        style={{
                          stroke: "#FF5722",
                          strokeWidth: 3,
                          opacity: 0.9
                        }}
                      />
                      <text
                        textAnchor="middle"
                        y={marker.markerOffset}
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fill: "#607D8B"
                        }}
                      >
                        {marker.name}
                      </text>
                    </Marker>
                  ))}
                </Markers>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
