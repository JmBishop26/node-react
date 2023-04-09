import React, { useState } from 'react'
import { BoxCentered, Container, PrimaryButton } from "../assets/Components";
import {TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useFormik} from 'formik';
import * as Yup from 'yup';

function Signup() {

  const MySwal = withReactContent(Swal)
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirm: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      username: Yup.string()
        .min(5, 'Must be at least 5 characters')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number')
        .required('Password is required'),
      confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number')
        .required('Required'),
    }),
    onSubmit: (values) => {
      Axios.post("/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
        confirm: values.confirm
      }).then((response)=>{
        MySwal.fire({
          icon: "success",
          title: "Registration Successful",
          text: response.data,
          confirmButtonText: "OK",
        }).then(() => {
          // redirect to the login page after successful registration
          window.location.href = "/signin";
        });
      }).catch((error)=>{
        MySwal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.response.data,
          confirmButtonText: "OK",
        });
      });
    },
  });
  

  return (
    <Container>
        <BoxCentered>
            <Typography variant="h3" component="h3" sx={{mb: 3, fontSize:"25", fontWeight: "700"}}>Sign Up</Typography>
            <TextField
            label="Email"
            type="email"
            sx={{ mb: 1 }}
            {...formik.getFieldProps('email')}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          />
          <TextField
            label="Username"
            sx={{ mb: 1 }}
            {...formik.getFieldProps('username')}
            error={formik.touched.username && formik.errors.username ? true : false}
            helperText={formik.touched.username && formik.errors.username ? formik.errors.username : ''}
          />
          <TextField
            label="Password"
            type="password"
            sx={{ mb: 1 }}
            {...formik.getFieldProps('password')}
            error={formik.touched.password && formik.errors.password ? true : false}
            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
          />
          <TextField
            label="Confirm Password"
            type="password"
            sx={{ mb: 1 }}
            {...formik.getFieldProps('confirm')}
            error={formik.touched.confirm && formik.errors.confirm ? true : false}
            helperText={formik.touched.confirm && formik.errors.confirm ? formik.errors.confirm : ''}
          />
            <PrimaryButton variant="contained" sx={{mb: 1, mt: 0.5}} onClick={formik.handleSubmit}>
                <Typography>Sign Up</Typography>
            </PrimaryButton>
            <Typography sx={{mt: 0.5}}>Already have an account? <Link to="/signin">Sign In</Link></Typography>
        </BoxCentered>
    </Container>
  )
}

export default Signup