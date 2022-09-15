import React from "react";
import {Form, Field, FormSpy, FieldRenderProps} from "react-final-form";
import RFTextField from "./RFTextField";
import ControlledHeightTextarea from "../elements/ControlledHeightTextArea";
import Box, {BoxProps} from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { extraFunctionForSubmitOnClick } from "../admin/content/NewBikeForm";

const BikeBasicDetails = ({bikeDetails, setBikeDetails}) => {
  const formRef: React.MutableRefObject<FormApi> = React.useRef(null);
  const onSubmit = (values) => {
    if (values.description) {

      setBikeDetails(values);
    }
  };


  return (
    <>
      <Form
        initialValues={bikeDetails}
        onSubmit={onSubmit}
        render={({handleSubmit, form, submitting, pristine, values}) => {
          formRef.current = form;
          extraFunctionForSubmitOnClick.current = formRef.current.submit

          return (
            <Box onSubmit={handleSubmit} component="form" noValidate>
              <Field
                sx={{marginTop: "15px"}}
                fullWidth
                name="mileage"
                label="Mileage"
                size="medium"
                required
                component={RFTextField}></Field>
              <Field
                sx={{marginTop: "15px"}}
                fullWidth
                name="color"
                label="Color"
                size="medium"
                required
                component={RFTextField}></Field>
              <Field
                sx={{marginTop: "15px"}}
                fullWidth
                name="estimatedValue"
                label="Estimated Value"
                size="medium"
                required
                component={RFTextField}></Field>
              <Field
                sx={{marginTop: "15px"}}
                name="description"
                label="Description"
                size="medium"
                multiline
                fullWidth
                rows={5}
                component={RFTextField}></Field>
            </Box>
          );
        }}
      />
    </>
  );
};

export default BikeBasicDetails;
