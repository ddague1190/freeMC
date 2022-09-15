import * as React from "react";
import {DataGrid, GridColDef, GridValueGetterParams, GridEventListener, GridApi} from "@mui/x-data-grid";
import {useDispatch, useSelector} from "react-redux";
import { changeTab } from "../../store/admin-route/admin-route";
import {selectors} from "../../store/customer/selector";
import {customersSelector, setSelectedId} from "../../store/customer/reducer";
import Button from "./Button";
import { fetchCustomerDetailAction } from "../../store/customer-detail/action";
import { fetchAllCustomersBikes } from "../../store/customer-bikes/action";


export default function CustomerDataTable() {

  const dispatch = useDispatch();

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
    {
      field: "viewDetails",
      headerName: "View Details",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          dispatch(fetchCustomerDetailAction(params.row.identifier));
          dispatch(fetchAllCustomersBikes(params.row.identifier));
          dispatch(changeTab({index: 1}))
          // const api: GridApi = params.api;
          // const thisRow: any= {};
          
          // api
          //   .getAllColumns()
          //   .forEach(
          //     (c) => (thisRow[c.field] = params.row[c.field])
          //   );
  
          // return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button variant='contained' onClick={onClick}>Select</Button>;
      }
    },
  
  ];
  
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    console.log(params.row);
  };
  const customersState = useSelector(customersSelector);
  const customers = selectors.selectAll(customersState);

  return (
    <div style={{height: 400, width: "100%"}}>
      <DataGrid
        getRowId={row => row.identifier}
        experimentalFeatures={{newEditingApi: true}}
        rows={customers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]} 
      />
    </div>
  );
}
