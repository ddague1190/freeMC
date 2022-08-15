import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Field} from "react-final-form";
import RangeSlider from "./RangeSlider";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

export default function ToggleButton(props) {
  const [open, setOpen] = React.useState<boolean>(props.hours[0] !== props.hours[1]);

  return (
    <Grid item mt={2} padding={2} container xs={12} sx={{backgroundColor: props.stripe ? '#efefef' : ''}}>
      <Grid item xs={12} sm={8}>
        <Typography variant="h6" color="initial">
          {props.dayOfWeek}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          variant="contained"
          sx={{backgroundColor: open ? "green" : "red"}}
          onClick={() => setOpen(!open)}>
          {open ? "Shop is Open" : "Shop is Closed"}
        </Button>
      </Grid>

      <Collapse in={open}>
        <Field
          name={`hours.${props.dayOfWeek}`}
          label={`Hours of operation ${props.dayOfWeek}`}
          component={RangeSlider}></Field>
      </Collapse>
    </Grid>
  );
}
