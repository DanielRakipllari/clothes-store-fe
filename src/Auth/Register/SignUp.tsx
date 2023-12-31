import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { singUpRequest } from "../auth.models";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextFieldComponent from "../../Components/HelperComponents/TextFieldComponent";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp(props: registerFormProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Set the background color with transparency
            padding: "20px", // Add padding for spacing
            borderRadius: "8px", // Add border-radius for rounded corners
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add a box shadow
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Formik
              initialValues={props.model}
              onSubmit={props.onSubmit}
              validationSchema={Yup.object({
                userName: Yup.string().required("This field is required!"),
                email: Yup.string().required("This field is required!").email('Invalid email address!'),
                password: Yup.string().required("This field is required!"),
                repeatPassword: Yup.string().required("This field is required!"),
                phoneNumber : Yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits!').required("This field is required!")
              })}
            >
              {(formikProps) => (
                <Form>
                  <Grid item xs={12} sm={6}>
                    <TextFieldComponent
                      field="userName"
                      displayField="Username"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextFieldComponent field="email" displayField="Email" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextFieldComponent field="phoneNumber" displayField="Phone Number" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldComponent
                      field="password"
                      displayField="Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldComponent
                      field="repeatPassword"
                      displayField="Repeat Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={formikProps.isSubmitting}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

interface registerFormProps {
  model: singUpRequest;
  onSubmit(values: singUpRequest, actions: FormikHelpers<singUpRequest>): void;
}
