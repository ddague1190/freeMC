import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "../../elements/Typography";
import Paper from "../../elements/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Button from "../../elements/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DataTable from "../../elements/CustomerDataTable";
import {Form, Field, FormSpy} from "react-final-form";
import FormFeedback from "../../form/FormFeedback";
import RFTextField from "../../form/RFTextField";
import AddCustomerForm from "./AddCustomerForm";
import {useDispatch, useSelector} from "react-redux";
import {
  adminRouteSelector,
  changeTab,
} from "../../../store/admin-route/admin-route";

export default function AllCustomerRecords() {
  const [addNewCustomer, setAddNewCustomer] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Paper
        sx={{
          maxWidth: 936,
          margin: "auto",
          overflow: "hidden",
          marginBottom: 2,
        }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{borderBottom: "1px solid rgba(0, 0, 0, 0.12)"}}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center" columnSpacing={1}>
              <Grid item>
                <SearchIcon color="inherit" sx={{display: "block"}} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by name, phone number, or email"
                  InputProps={{
                    disableUnderline: true,
                    sx: {fontSize: "default"},
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained">Search customers</Button>
              </Grid>
              {!addNewCustomer && (
                <Grid item xs={6} md={4}>
                  <Button
                    onClick={() => dispatch(changeTab({index: 2}))}
                    color="secondary">
                    New customer
                  </Button>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>
      <Collapse in={addNewCustomer}>
        <Paper
          sx={{
            maxWidth: 936,
            margin: "auto",
            overflow: "hidden",
            marginBottom: 2,
          }}>
          <AddCustomerForm
            cancelAddNewCustomer={() => setAddNewCustomer(false)}
          />
        </Paper>
      </Collapse>

      <Paper sx={{maxWidth: 936, margin: "auto", overflow: "hidden"}}>
        <DataTable />
      </Paper>
    </>
  );
}
