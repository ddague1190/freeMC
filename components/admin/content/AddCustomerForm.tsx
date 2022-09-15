import React, { ReactPropTypes } from "react";
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
import LinearIndeterminate from "../../elements/Spinner";
import {email, required} from "../../../utils/emailValidation";
import {hideNotification} from "../../../store/notification/notification";
import allTheStates from "../../../data/states";
import {addCustomer} from "../../../store/customer/action";
import {
  adminRouteSelector,
  changeTab,
} from "../../../store/admin-route/admin-route";

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

const AddCustomerForm = () => {
  const [sent, setSent] = React.useState(false);

  const dispatch = useDispatch();
  const storeInfo = useSelector(storeInfoSelector);
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

    dispatch(addCustomer({...values, address: {...values.address, name: values.name}}));
  };

  return (
    <Paper
    sx={{
      maxWidth: 936,
      margin: "auto",
      overflow: "hidden",
      marginBottom: 2,
    }}>
      {storeInfo.errorMessage && (
        <FormFeedback error sx={{mt: 2}}>
          {storeInfo.errorMessage}
        </FormFeedback>
      )}

      <LinearIndeterminate show={false} />
      <Form
        validate={validate}
        onSubmit={onSubmit}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <Box 
          onSubmit={handleSubmit} 
          component="form" 
          noValidate
          padding={2}
          >
            {/* this is basic info part of form */}

              <Typography padding={1} variant="h5">
                New Customer Contact Info
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    autoFocus
                    fullWidth
                    component={RFTextField}
                    disabled={submitting || sent}
                    label="Customer name"
                    margin="normal"
                    placeholder="Customer name"
                    name="name"
                    required
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    autoFocus
                    fullWidth
                    component={RFTextField}
                    disabled={submitting || sent}
                    label="Customer email"
                    margin="normal"
                    name="email"
                    required
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    autoFocus
                    fullWidth
                    component={RFTextField}
                    disabled={submitting || sent}
                    label="Customer phone"
                    margin="normal"
                    name="phone"
                    required
                    size="medium"
                  />
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
                    size="medium"
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
                    size="medium"
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
                    size="medium"
                  />
                </Grid>
                <Grid item xs={6} md={3} pt={2.5}>
                  <Field
                    sx={{marginTop: "15px"}}
                    select
                    fullWidth
                    name="address.state"
                    label="State"
                    size="medium"
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
                    size="medium"
                  />
                </Grid>
              </Grid>
            {/* this is address part of form */}

            <Button
              sx={{margin: 2}}
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              disabled={submitting}>
              Submit changes
            </Button>
            <Button
              onClick={()=>dispatch(changeTab({index: 0}))}
              sx={{margin: 2}}
              color="secondary"
              size="large"
              type="submit"
              >
              Cancel add new customer
            </Button>
          </Box>
        )}
      />
    </Paper>
  );
};

export default AddCustomerForm;
