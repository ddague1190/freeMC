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
const ShopInfoForm = () => {
  const [sent, setSent] = React.useState(false);
  const [editBasicInfo, setBasicInfo] = React.useState<boolean>(false);
  const [editHours, setEditHours] = React.useState<boolean>(false);
  const [editAddress, setEditAddress] = React.useState<boolean>(false);
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
    // let hours: DayHours = {...initialHours};
    // daysArray.forEach((day) => {
    //   hours[day] = values[day];
    //   delete values[day];
    // });

    dispatch(editStoreInfoAction({...values, id: storeInfo.id}));
  };

  React.useEffect(() => {
    if (storeInfo.success) {
      setBasicInfo(false);
      setEditHours(false);
      setEditAddress(false);
    }
  }, [storeInfo.success]);

  return (
    <>
      {storeInfo.errorMessage && (
        <FormFeedback error sx={{mt: 2}}>
          {storeInfo.errorMessage}
        </FormFeedback>
      )}

      <LinearIndeterminate show={storeInfo.isFetching} />
      <Form
        validate={validate}
        initialValues={{...storeInfo}}
        onSubmit={onSubmit}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <Box onSubmit={handleSubmit} component="form" noValidate>
            {/* this is form feedback */}

            {/* this is basic info part of form */}
            <Paper padding elevation={3} sx={{marginTop: 2}}>
              <Typography padding={1} variant="h5">
                Basic Info
              </Typography>
              <Collapse in={!editBasicInfo}>
                <Box padding={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Company name</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        {storeInfo.companyName || "Please add company name"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Company email</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>{storeInfo.companyEmail}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Company phone</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>
                        {storeInfo.companyPhone || "Please add company phone"}
                      </Typography>
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
                      label="Company name"
                      margin="normal"
                      placeholder="Your shop's name"
                      name="companyName"
                      required
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      fullWidth
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Company email"
                      margin="normal"
                      name="companyEmail"
                      required
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      fullWidth
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Company phone"
                      margin="normal"
                      name="companyPhone"
                      required
                      size="medium"
                    />
                  </Grid>
                </Grid>
              </Collapse>
              <Collapse in={!editBasicInfo}>
                <Chip
                  label="Edit"
                  sx={{position: "absolute", top: 2, right: 2, margin: 2}}
                  onClick={(e) => setBasicInfo(true)}
                />
              </Collapse>
            </Paper>

            {/* this is hours of operation for brick and morter shops */}
            <Paper padding elevation={3} sx={{marginTop: 2}}>
              <Typography padding={1} variant="h5">
                Hours of operation
              </Typography>

              <Collapse in={editHours}>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <Field
                      type="checkbox"
                      autoFocus
                      component={Toggle}
                      label="Online only shop?"
                      margin="normal"
                      name="onlineOnly"
                      required
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} md={4} mt={2}>
                    <Typography variant="body1" color="primary">
                      Please specify your time zone
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Field
                      select
                      fullWidth
                      name="timeZone"
                      label="Time zone"
                      size="medium"
                      margin="normal"
                      required
                      component={RFTextField}>
                      {Object.entries(options).map(([key, value], index) => (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  {daysArray.map((day, index) => {
                    return (
                      <ToggleButton
                        key={index}
                        stripe={index % 2 === 0}
                        hours={storeInfo.hours[day]}
                        dayOfWeek={day}
                      />
                    );
                  })}
                </Grid>
              </Collapse>
              <Collapse in={!editHours}>
                <TableContainer component={Box} sx={{marginTop: 2, padding: 2}}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Time zone
                        </TableCell>
                        <TableCell>
                          {storeInfo.timeZone || "Please specify time zone"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Online only store?
                        </TableCell>
                        <TableCell>
                          {storeInfo.onlineOnly ? "True" : "False"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <XonTopBox onlineOnly={storeInfo.onlineOnly} padding={2}>
                  <TableContainer component={Box} sx={{marginBlock: 2}}>
                    <Table sx={{minWidth: 100}} size="small">
                      <TableBody>
                        {daysArray.map((day, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {day}
                              </TableCell>
                              <TableCell>
                                {getOpenHoursString(storeInfo.hours[day])}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </XonTopBox>

                <Chip
                  label="Edit"
                  sx={{position: "absolute", top: 2, right: 2, margin: 2}}
                  onClick={(e) => setEditHours(true)}
                />
              </Collapse>
            </Paper>

            {/* this is address part of form */}

            <Paper padding elevation={3} sx={{marginTop: 2}}>
              <Typography padding={1} variant="h5">
                Shop address
              </Typography>
              <Collapse in={editAddress}>
                <Grid container columnSpacing={1}>
                  <Grid item xs={12}>
                    <Field
                      autoFocus
                      fullWidth
                      size="medium"
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Shipping name"
                      placeholder="Your company name or another name"
                      margin="normal"
                      name="address.name"
                      required
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
                      sx={{margin: "-4px"}}
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
              </Collapse>
              <Collapse in={!editAddress}>
                <Box m={2}>
                  {isValidAddress(storeInfo.address) ? (
                    <address>
                      {storeInfo.address.name}
                      <br />
                      {storeInfo.address.streetAddress}{" "}
                      {storeInfo.address.unitNumber}
                      <br />
                      {storeInfo.address.city}, {storeInfo.address.state}{" "}
                      {storeInfo.address.zip}
                      <br />
                      USA
                    </address>
                  ) : (
                    "Please add your shop address"
                  )}
                </Box>
                <Chip
                  label="Edit"
                  sx={{position: "absolute", top: 2, right: 2, margin: 2}}
                  onClick={(e) => setEditAddress(true)}
                />
              </Collapse>
            </Paper>
            <Button
              sx={{margin: 2}}
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              disabled={submitting}>
              Submit changes
            </Button>
          </Box>
        )}
      />
    </>
  );
};

export default ShopInfoForm;
