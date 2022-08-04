import * as React from "react";
import {Field, Form, FormSpy} from "react-final-form";
import Box from "@mui/material/Box";
import Link from "../components/elements/Link";
import Typography from "../components/elements/Typography";
import AppFooter from "../components/AppFooter";
import AppBar from "../components/AppBar";
import AppForm from "../components/AppForm";
import {email, required} from "../utils/emailValidation";
import RFTextField from "../components/form/RFTextField";
import FormButton from "../components/form/FormButton";
import FormFeedback from "../components/form/FormFeedback";
import {useRouter} from "../node_modules/next/router";
import axios from "axios";
import { FORM_ERROR } from 'final-form';
import { useDispatch } from 'react-redux';
import { showNotification } from "../store/notification/notification";
import { setUserInfo } from "../store/user-info/user-info";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export default function SignIn() {
  const [sent, setSent] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const validate = (values: {[index: string]: string}) => {
    const errors = required(["email", "password"], values);
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
      const response = await axios.post("/api/sign-in/", {values}, config);
      console.log(response)
      if (response.status === 200) {

        dispatch(setUserInfo(response.data.user));
        setTimeout(() => {
          dispatch(
            showNotification(
              "Authentication successful."
            )
          );
        }, 1000);
        router.push("/admin");
      } else {
        return {[FORM_ERROR]: "Something went wrong"};
      }
    } catch (error) {
      const errData = error.response?.data;

      if (errData?.message) {
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
    <>
      <AppBar />
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/sign-up">Sign Up here</Link>
          </Typography>
        </>
 
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
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large" 
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
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
                size="large"
                color="secondary"
                fullWidth>
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </>
  );
}
