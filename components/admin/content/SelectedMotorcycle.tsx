import React from "react";
import {Form, Field, FormSpy} from "react-final-form";
import FormFeedback from "../../form/FormFeedback";
import {useSelector, useDispatch} from "react-redux";
import {customerBikeDetailSelector} from "../../../store/bike-detail/reducer";
import {editBikeDetailAction} from "../../../store/bike-detail/action";
import LinearIndeterminate from "../../elements/Spinner";
import Paper from "../../elements/Paper";
import Box, {BoxProps} from "@mui/material/Box";
import Typography from "../../elements/Typography";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "../../elements/Button";
import RFTextField from "../../form/RFTextField";

const SelectedMotorcycle = () => {
  const [sent, setSent] = React.useState(false);
  const [editBasicInfo, setEditBasicInfo] = React.useState(false);
  const dispatch = useDispatch();
  const bikeInfo = useSelector(customerBikeDetailSelector);

  const validate = () => {
    return true;
  };

  React.useEffect(() => {
    if (bikeInfo.success) {
      setEditBasicInfo(false);
    }
  }, [bikeInfo]);

  const onSubmit = (values) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(editBikeDetailAction({id: bikeInfo.id, values}));
  };
  return (
    <>
      {bikeInfo.errorMessage && (
        <FormFeedback error sx={{mt: 2}}>
          {bikeInfo.errorMessage}
        </FormFeedback>
      )}
      <LinearIndeterminate show={bikeInfo.isFetching} />

      <Form
        validate={validate}
        initialValues={{...bikeInfo}}
        onSubmit={onSubmit}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <Box onSubmit={handleSubmit} component="form" noValidate>
            {/* this is form feedback */}

            {/* this is basic info part of form */}
            <Paper padding elevation={3} sx={{marginTop: 2}}>
              <Typography padding={1} variant="h5">
                Basic Motorcycle Info
              </Typography>
              <Collapse in={!editBasicInfo}>
                <Box padding={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Owner</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack direction="row" spacing={2}>
                        <Typography>
                          {bikeInfo.owner || "No owner on file"}
                        </Typography>
                        <Button color="primary" variant="contained">
                          View owner details
                        </Button>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="body2">Model</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography>{bikeInfo.model}</Typography>
                    </Grid>
                    <Box
                      my={2}
                      sx={{backgroundColor: "#eeeeef", width: "100%"}}
                      p={2}>
                      <Grid item xs={12} my={2}>
                        <Stack
                          sx={{justifyContent: "space-between"}}
                          direction="row"
                          spacing={2}>
                          <Stack spacing={1}>
                            <Typography variant="body2">Color</Typography>
                            <Typography>{bikeInfo.color || ""}</Typography>
                          </Stack>
                          <Stack spacing={1}>
                            <Typography variant="body2">Mileage</Typography>
                            <Typography>{bikeInfo.mileage || ""}</Typography>
                          </Stack>
                          <Stack spacing={1}>
                            <Typography variant="body2">
                              EstimatedValue
                            </Typography>
                            <Typography>
                              {bikeInfo.estimatedValue || ""}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6} my={1}>
                        <Typography variant="body2">Description</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography>{bikeInfo.description}</Typography>
                      </Grid>
                    </Box>
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
                      label="Model"
                      margin="normal"
                      name="model"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      fullWidth
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Mileage"
                      margin="normal"
                      name="mileage"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      fullWidth
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Estimated Value"
                      margin="normal"
                      name="estimatedValue"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      fullWidth
                      component={RFTextField}
                      disabled={submitting || sent}
                      label="Description"
                      margin="normal"
                      name="description"
                      rows={5}
                      size="small"
                    />
                  </Grid>
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
                  onClick={(e) => setEditBasicInfo(true)}
                />
              </Collapse>
            </Paper>
          </Box>
        )}
      />
    </>
  );
};

export default SelectedMotorcycle;
