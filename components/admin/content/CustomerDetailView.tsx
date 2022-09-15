import React from "react";
import {Form, Field, FormSpy} from "react-final-form";
import FormFeedback from "../../form/FormFeedback";
import TextField from "@mui/material/TextField";
// import Select from "react-select";
import Typography from "../../elements/Typography";
import states from "../../../data/states";
import RFTextField from "../../form/RFTextField";
import Box, {BoxProps} from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Toggle from "../../elements/Toggle";
import Collapse from "@mui/material/Collapse";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SelectMulti from "../../elements/Select";
import FormControl from "@mui/material/FormControl";
import Paper from "../../elements/Paper";
import NavLink from "../../elements/NavLink";
import Chip from "@mui/material/Chip";
import ToggleButton from "../../elements/ToggleButton";
import {Theme, styled} from "@mui/material/styles";
import Button from "../../elements/Button";
import {editStoreInfoAction} from "../../../store/store-info/action";
import {useDispatch, useSelector} from "react-redux";
import {storeInfoSelector} from "../../../store/store-info/reducer";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Modal from "@mui/material/Modal";
import {
  Address,
  Days,
  DaysString,
  DayHours,
  initialHours,
} from "../../../store/store-info/state";
import getOpenHoursString from "../../../utils/getOpenHoursString";
import isValidAddress from "../../../utils/isValidAddress";
import {FORM_ERROR} from "final-form";
import LinearIndeterminate from "../../../components/elements/Spinner";
import {email, required} from "../../../utils/emailValidation";
import {hideNotification} from "../../../store/notification/notification";
import allTheStates from "../../../data/states";
import {customerDetailSelector} from "../../../store/customer-detail/reducer";
import BikeSelector from "../../form/BikeSelector";
import NewBikeForm from "./NewBikeForm";
import {editCustomerDetailAction} from "../../../store/customer-detail/action";
import {customerBikesSelector} from "../../../store/customer-bikes/reducer";
import CustomerBikesTable from "../../elements/CustomerBikesTable";

export const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  width: "80%",
  p: 4,
};

interface BoxWithXProps extends BoxProps {
  onlineOnly: boolean;
}

export const XonTopBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "onlineOnly",
})<BoxWithXProps>(({onlineOnly}) => ({
  ...(onlineOnly && {
    position: "relative",
    "&::after": {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "red",
      opacity: "0.1",
      content: '""',
      fontSize: 100,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "red",
    },
    "&::before": {
      position: "absolute",
      opacity: "0.5",
      content: '"X"',
      top: "50%",
      left: "50%",
      fontSize: "15rem",
      transform: "translate(-50%, -50%)",
      color: "red",
      zIndex: 100,
    },
  }),
}));

const TextFieldAdapter = ({input, meta, ...rest}) => (
  <TextField
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ""}
  />
);

const ToggleAdapter = ({input: {onChange, value}, label, ...rest}) => (
  <Toggle
    label={label}
    toggled={!!value}
    onToggle={(event, isInputChecked) => onChange(isInputChecked)}
    {...rest}
  />
);

const options = {
  AST: "Atlantic Standard Time (AST)",
  EST: "Eastern Standard Time (EST)",
  CST: "Central Standardd Time (CST)",
  MST: "Mountain Standard Time (MST)",
  PST: "Pacific Standard Time (PST)",
  AKST: "Alaskan Standard Time (AKST)",
  HST: "Hawaii-Aleutian Standard Time (HST)",
  "UTC-11": "Somoa Standard Time (UTC-11)",
  "UTC+10": "Chamorro Standard Time (UTC+10)",
};

const CustomerDetailView = () => {
  const [sent, setSent] = React.useState(false);
  const [editBasicInfo, setBasicInfo] = React.useState<boolean>(false);
  const [addBike, setAddBike] = React.useState<boolean>(false);
  const [addPurchase, setAddPurchase] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const storeInfo = useSelector(storeInfoSelector);
  const customerInfo = useSelector(customerDetailSelector);
  const customerBikes = useSelector(customerBikesSelector);
  const daysArray = Object.values(Days) as Array<keyof typeof Days>;

  const validate = () => {
    return true;
  };


  const onSubmit = (values) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(editCustomerDetailAction({id: customerInfo.identifier, values}));
  };

  React.useEffect(() => {
    if (customerInfo.success) {
      setBasicInfo(false);
    }
  }, [customerInfo.success]);

  return (
    <>
      {customerInfo.errorMessage && (
        <FormFeedback error sx={{mt: 2}}>
          {customerInfo.errorMessage}
        </FormFeedback>
      )}

      <LinearIndeterminate show={customerInfo.isFetching} />
      <Form
        validate={validate}
        initialValues={{...customerInfo}}
        onSubmit={onSubmit}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <Box onSubmit={handleSubmit} component="form" noValidate>
            {/* this is form feedback */}

            {/* this is basic info part of form */}
            <Paper padding elevation={3} sx={{marginTop: 2}}>
              <Typography padding={1} variant="h5">
                Overview
              </Typography>
              <Collapse in={!editBasicInfo}>
                <Box padding={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Name</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        {customerInfo.name || "Please add customer's name"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Email</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        {customerInfo.email || "Please add customer's email"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Phone</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        {customerInfo.phone || "Please add customer's phone"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Address</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        {isValidAddress(customerInfo.address) ? (
                          <address>
                            {customerInfo.address.name}
                            <br />
                            {customerInfo.address.streetAddress}{" "}
                            {customerInfo.address.unitNumber}
                            <br />
                            {customerInfo.address.city},{" "}
                            {customerInfo.address.state}{" "}
                            {customerInfo.address.zip}
                            <br />
                            USA
                          </address>
                        ) : (
                          "Please add customer's address"
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Customer Since</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>{customerInfo.customerSince}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Customer number</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>{customerInfo.identifier}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>
              <Collapse in={editBasicInfo}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      fullWidth
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Customer name"
                      margin="normal"
                      name="name"
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      fullWidth
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Customer email"
                      margin="normal"
                      name="email"
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      fullWidth
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Customer phone"
                      margin="normal"
                      name="phone"
                      required
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Field
                    autoFocus
                    fullWidth
                    component={RFTextField}
                    disabled={submitting || sent}
                    label="Street Address"
                    placeholder="Street address"
                    margin="normal"
                    name="address.streetAddress"
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Field
                    autoFocus
                    fullWidth
                    component={RFTextField}
                    disabled={submitting || sent}
                    label="Unit Number"
                    placeholder="Unit or Suite"
                    margin="normal"
                    name="address.unitNumber"
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Field
                    autoFocus
                    fullWidth
                    component={RFTextField}
                    disabled={submitting || sent}
                    label="City"
                    placeholder="City"
                    margin="normal"
                    name="address.city"
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} md={3} pt={2.5}>
                  <Field
                    sx={{margin: "-4px"}}
                    select
                    fullWidth
                    name="address.state"
                    label="State"
                    size="small"
                    required
                    component={RFTextField}>
                    {allTheStates.map((state, index) => (
                      <MenuItem key={index} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Field
                    autoFocus
                    fullWidth
                    component={RFTextField}
                    disabled={submitting || sent}
                    label="Zip code"
                    placeholder="Zip code"
                    margin="normal"
                    name="address.zip"
                    required
                    size="small"
                  />
                </Grid>
                <Button
                  sx={{margin: 2}}
                  color="secondary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={submitting}>
                  Submit changes
                </Button>
              </Collapse>
              <Collapse in={!editBasicInfo}>
                <Chip
                  label="Edit"
                  sx={{position: "absolute", top: 2, right: 2, margin: 2}}
                  onClick={(e) => setBasicInfo(true)}
                />
              </Collapse>
            </Paper>
          </Box>
        )}
      />

      <Paper padding elevation={3} sx={{marginTop: 2}}>
        <Grid container spacing={2} alignItems="center" columnSpacing={1}>
          <Grid item>
            <Typography padding={1} variant="h5">
              Vehicles
            </Typography>
          </Grid>
          {customerBikes.errorMessage && (
            <Grid item xs={12}>
              <FormFeedback>{customerBikes.errorMessage}</FormFeedback>
            </Grid> 
          )}
          {!addBike && (
            <Grid item xs={6} md={4} sx={{marginLeft: "auto"}}>
              <Button onClick={() => setAddBike(true)} color="secondary">
                Add new vehicle
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <CustomerBikesTable />
          </Grid>
        </Grid>
      </Paper>

      <Modal
        open={addBike}
        onClose={() => setAddBike(false)}
        aria-labelledby="new bike modal"
        aria-describedby="new bike form">
        <Box sx={modalBoxStyle}>
          <NewBikeForm closeForm={() => setAddBike(false)} />
        </Box>
      </Modal>
    </>
  );
};

export default CustomerDetailView;
