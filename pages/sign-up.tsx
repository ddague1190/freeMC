import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "../components/elements/Link";
import {Field, Form, FormSpy} from "react-final-form";
import Typography from "../components/elements/Typography";
import AppFooter from "../components/AppFooter";
import AppBar from "../components/AppBar";
import AppForm from "../components/AppForm";
import {email, required} from "../utils/emailValidation";
import RFTextField from "../components/form/RFTextField";
import FormButton from "../components/form/FormButton";
import FormFeedback from "../components/form/FormFeedback";
import axios from "axios";
import { FORM_ERROR } from 'final-form'
import { useRouter } from "../node_modules/next/router";
import { useDispatch } from 'react-redux';
import { showNotification } from "../store/notification/notification";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};  

export default function SignUp() {
  const dispatch = useDispatch();
  const [sent, setSent] = React.useState(false);
  const router = useRouter();
  const validate = (values: {[index: string]: string}) => {
    const errors = required(
      ["firstName", "lastName", "email", "password", "password2"],
      values
    );
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setSent(true);
    try {
      const response = await axios.post("/api/sign-up/", {values}, config);
      
      if (response.status === 201 ) {
        setTimeout(()=>{
          dispatch(showNotification('Please login using your newly created credentials.'))
        }, 1000)
        router.push('/sign-in');
        
      } else {
        return {[FORM_ERROR]: 'Something went wrong'}
      }

    } catch (error) {
      const errData = error.response?.data;

      if (errData.message) {
        let err = {};
        errData.message.forEach((el) => {
          err = {...err, ...el};
        });

        setSent(false);
        return err;
      }
    }
  };

  return (
    <React.Fragment>
      <AppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center" underline="always">
            <Link href="/sign-in/">Already have an account?</Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{submitting: true}}
          validate={validate}>
          {({handleSubmit: handleSubmit2, submitting}) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{mt: 6}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password2"
                autoComplete="new-password2"
                label="Confirm Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{submitError: true}}>
                {({submitError}) =>
                  submitError ? (
                    <FormFeedback error sx={{mt: 2}}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{mt: 3, mb: 2}}
                disabled={submitting || sent}
                color="secondary"
                fullWidth>
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}
