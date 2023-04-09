import { Box, Button, styled } from "@mui/material";


export const Container = styled(Box)(({theme})=>({
    backgroundColor: theme.palette.background.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column'
}))

export const BoxCentered = styled(Box)(({theme})=>({
    textAlign:"center",
    backgroundColor: "white",
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: "20%",
    padding: "100px 50px",
    borderRadius: 16,
    boxShadow: "0px 5px 15px 0px rgba(0,0,0,0.1)"
}))

export const PrimaryButton = styled(Button)(({theme})=>({
    backgroundColor: theme.palette.primary.main
}))

export const SecondaryButton = styled(Button)(({theme})=>({
    backgroundColor: theme.palette.secondary.main
}))

export const ErrorButton = styled(Button)(({theme})=>({
    backgroundColor: theme.palette.error.main
}))