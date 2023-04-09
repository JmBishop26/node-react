import React from 'react'
import { BoxCentered, Container, PrimaryButton } from "../assets/Components";
import { TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
function ForgotPassword() {
  return (
    <div>
      <Container>
          <BoxCentered>
              <Typography variant="h3" component="h3" sx={{mb: 3, fontSize:"20", fontWeight: "700"}}>Forgot Your Password?</Typography>
              <TextField id="outlined-basic" label="Email" type="email" sx={{mb: 1}}/>
              <PrimaryButton variant="contained" sx={{mb:1, mt: 1}}>
                  <Typography>Send Email</Typography>
              </PrimaryButton>
              <Link to="/signin"><Typography sx={{mt: 0.5}}>Go back to Sign In page</Typography></Link>
          </BoxCentered>
      </Container>
    </div>
  )
}

export default ForgotPassword