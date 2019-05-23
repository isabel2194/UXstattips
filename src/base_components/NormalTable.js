import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";

const NormalTable = props => {
  return (
    <div className="basic-table">
      <MDBTable>
        <MDBTableHead columns={props.data.columns} />
        <MDBTableBody rows={props.data.rows} />
      </MDBTable>
    </div>
  );
};

export default NormalTable;
