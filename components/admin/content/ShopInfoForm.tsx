import React from "react";
import {Form, Field} from "react-final-form";
import TextField from "@mui/material/TextField";
// import Select from "react-select";
import Typography from "../../elements/Typography";
import states from "../../../data/states";
import RFTextField from "../../form/RFTextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Toggle from "../../elements/Toggle";
import Collapse from "@mui/material/Collapse";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Paper from "../../elements/Paper";
import NavLink from "../../elements/NavLink";

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

// const ReactSelectAdapter = ({input, ...rest}) => (
//   <Select {...input} {...rest} searchable />
// );

const onSubmit = (values) => {
  console.log(values);
};

const ShopInfoForm = () => {
  const [sent, setSent] = React.useState(false);
  const [editHours, setEditHours] = React.useState(false);

  return (
    <>
      <Typography></Typography>
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <Box onSubmit={handleSubmit} component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  autoFocus
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  label="Company name"
                  margin="normal"
                  name="companyName"
                  required
                  size="large"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  autoFocus
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  label="General company email"
                  margin="normal"
                  name="generalCompanyEmail"
                  required
                  size="large"
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Field
                  type="checkbox"
                  autoFocus
                  component={Toggle}
                  label="Online only shop?"
                  margin="normal"
                  name="brickMortar"
                  required
                  size="large"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Collapse in={true}>
                  <div></div>
                </Collapse>
              </Grid>
            </Grid>
            <Paper>
              <Typography variant="h5">Hours of operation</Typography>
              <table className="operating-hours">
                <tbody>
                  <tr>
                    <th>Sunday</th>
                    <td>Closed</td>
                  </tr>
                  <tr>
                    <th>Monday</th>
                    <td>9am - 5pm</td>
                  </tr>
                  <tr>
                    <th>Tuesday</th>
                    <td>9am - 5pm</td>
                  </tr>
                  <tr>
                    <th>Wednesday</th>
                    <td>9am - 5pm</td>
                  </tr>
                  <tr>
                    <th>Thursday</th>
                    <td>9am - 5pm</td>
                  </tr>
                  <tr>
                    <th>Friday</th>
                    <td>9am - 5pm</td>
                  </tr>
                  <tr>
                    <th>Saturday</th>
                    <td>9am - 5pm</td>
                  </tr>
                </tbody>
              </table>
              <NavLink to="" sx={{position: "absolute", top: 0, right: 0}}>
                EDIT
              </NavLink>
            </Paper>
            <Paper>
              <Typography variant="h5">Physical address</Typography>
              <address>
                Mozilla Foundation
                <br />
                331 E Evelyn Ave
                <br />
                Mountain View, CA 94041
                <br />
                USA
              </address>
            </Paper>
            <button type="submit" disabled={submitting}>
              Submit changes
            </button>
          </Box>
        )}
      />
    </>
  );
};

export default ShopInfoForm;
