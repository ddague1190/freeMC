import * as React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {field: "identifier", headerName: "ID", width: 70},
  {field: "name", headerName: "Name", width: 130},
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 90,
  },
  {
    field: "phone",
    headerName: "Phone",
    description: "This column has a value getter and is not sortable.",
    width: 100,
    // sortable: false,
    // width: 160,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: "activeJob",
    headerName: "Active Job",
    type: "number",
    width: 90,
  },
];

const rows = [
  {id: 1, lastName: "Snow", firstName: "Jon", age: 35},
  {id: 2, lastName: "Lannister", firstName: "Cersei", age: 42},
  {id: 3, lastName: "Lannister", firstName: "Jaime", age: 45},
  {id: 4, lastName: "Stark", firstName: "Arya", age: 16},
  {id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null},
  {id: 6, lastName: "Melisandre", firstName: null, age: 150},
  {id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44},
  {id: 8, lastName: "Frances", firstName: "Rossini", age: 36},
  {id: 9, lastName: "Roxie", firstName: "Harvey", age: 65},
];

export default function CustomerDataTable() {
  return (
    <div style={{height: 400, width: "100%"}}>
      <DataGrid
        experimentalFeatures={{newEditingApi: true}}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
