import React from 'react'
import { BoxCentered, Container, PrimaryButton } from "../assets/Components";
import { TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useFormik} from 'formik';
import * as Yup from 'yup';
function Signin() {

  const MySwal = withReactContent(Swal)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('This field is required'),
      password: Yup.string()
        .required('This field is required')
    }),
    onSubmit: (values) => {
      Axios.post("/signin", {
        username: values.username,
        password: values.password,
      }).then((response)=>{
        MySwal.fire({
          icon: "success",
          title: "Logged In  Successful",
          text: response.data,
          confirmButtonText: "OK",
        }).then(() => {
          // redirect to the login page after successful registration
          window.location.href = "/";
        });
      }).catch((error)=>{
        MySwal.fire({
          icon: "error",
          title: "Log In Failed",
          text: error.response.data,
          confirmButtonText: "OK",
        });
      });
    },
  });
  
  return (
    <Container>
        <BoxCentered>
            <Typography variant="h3" component="h3" sx={{mb: 3, fontSize:"25", fontWeight: "700"}}>Sign In</Typography>
            <TextField id="outlined-basic" label="Username" sx={{mb: 1}}
              {...formik.getFieldProps('username')}
              error={formik.touched.username && formik.errors.username ? true : false}
              helperText={formik.touched.username && formik.errors.username ? formik.errors.username : ''}
            />
            <TextField id="outlined-basic" label="Password" type="password" sx={{mb: 1}}
                        {...formik.getFieldProps('password')}
                        error={formik.touched.password && formik.errors.password ? true : false}
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
            />
            <Link to="/forgotpassword" sx={{mb: 1, mt: 0.5}}>Forgot Password?</Link>
            <PrimaryButton variant="contained" sx={{mb: 1, mt: 0.5}} onClick={formik.handleSubmit}>
                <Typography>Sign In</Typography>
            </PrimaryButton>
            <Typography sx={{mt: 0.5}}>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
        </BoxCentered>
    </Container>
  )
}

export default Signin