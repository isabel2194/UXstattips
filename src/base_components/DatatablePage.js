import React from "react";
import { MDBDataTable } from "mdbreact";

const DatatablePage = props => {
  return (
    <div>
      <MDBDataTable
        hover
        data={props.data}
        entriesLabel="Número de entradas"
        infoLabel={["Mostrando", "a", "de", "entradas"]}
        paginationLabel={["Anterior", "Siguiente"]}
        searchLabel="Buscar"
      />
    </div>
  );
};

export default DatatablePage;
