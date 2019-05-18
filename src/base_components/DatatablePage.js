import React from "react";
import { MDBDataTable } from "mdbreact";

const DatatablePage = props => {
  return <MDBDataTable hover data={props.data} />;
};

export default DatatablePage;
