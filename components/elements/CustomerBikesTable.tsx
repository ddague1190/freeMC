import * as React from "react";
import {DataGrid, GridColDef, GridValueGetterParams, GridEventListener, GridApi} from "@mui/x-data-grid";
import {useDispatch, useSelector} from "react-redux";
import { changeRoute, changeTab } from "../../store/admin-route/admin-route";
import {selectors} from "../../store/customer/selector";
import {customersSelector, setSelectedId} from "../../store/customer/reducer";
import Button from "./Button";
import { customerBikesSelector } from "../../store/customer-bikes/reducer";
import { customerBikesSelectors } from "../../store/customer-bikes/selector";
import { getBikeDetailAction } from "../../store/bike-detail/action";

export default function CustomerBikesTable() {

  const customerBikesState = useSelector(customerBikesSelector);
  const dispatch = useDispatch();
  const customerBikes = customerBikesSelectors.selectAll(customerBikesState)

  const columns: GridColDef[] = [
    {field: "id", headerName: "ID", width: 70},
    {
      field: "model",
      headerName: "Model",
      type: "string",
      width: 250,
    },
    {
      field: "activeJob",
      headerName: "Active Job",
      type: "number",
      width: 80,
    },
    {
      field: "viewDetails",
      headerName: "View Details",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          dispatch(changeRoute({route: "Customer's-bikes"}))
          dispatch(changeTab({index: 2}))
          dispatch(getBikeDetailAction(params.row.id));
        };
  
        return <Button variant='contained' onClick={onClick}>Select</Button>;
      }
    },
  
  ];
  
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    console.log(params.row);
  };



  return (
    <div style={{height: 400, width: "100%"}}>
      <DataGrid
        experimentalFeatures={{newEditingApi: true}}
        rows={customerBikes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]} 
      />
    </div>
  );
}
