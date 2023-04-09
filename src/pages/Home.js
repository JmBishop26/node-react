import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BoxCentered, Container, ErrorButton, SecondaryButton } from '../assets/Components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [data, setData] = useState([]);

    const MySwal = withReactContent(Swal);

    const [loginStatus, setLoginStatus] = useState("");
    Axios.defaults.withCredentials = true;
    const navTo = useNavigate();

    useEffect(()=>{
        Axios.get("/signin").then((response)=>{
            if(response.data.loggedIn  === true){
                setLoginStatus(response.data.user.username);
            }
            else{
                navTo('/signin')
            }
    })

    }, [navTo])

    useEffect(() => {
        fetch('/home')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data: ', error));
      }, []);

      const logout = () =>{
        MySwal.fire({
            icon: "question",
            title: "Do you really want to logout?",
            confirmButtonText: "Yes",
            showCancelButton: true
        }).then((response)=>{
            if(response.isConfirmed){
                Axios.get('/logout').then(() => {
                    setLoginStatus('');
                    navTo('/signin'); // Redirect to the login page after logout
                  })
                  .catch(err => console.log(err));       
            }
            else if(response.isDismissed){}
        })
      }

      const deleteProduct = (id) => {
        Axios.delete(`/dltProd/${id}`)
          .then((response) => {
            MySwal.fire({
                icon: "success",
                title: "Product Deleted",
                text: response.data,
                confirmButtonText: 'Confirm',
            }).then((res)=>{
                if(res.isConfirmed){
                    window.location.reload();
                }
            })
          })
          .catch((error)=> {
            MySwal.fire({
                icon: "error",
                title: "Product Not Deleted",
                text: error.response.data,
                confirmButtonText: 'Confirm',
            }).then((res)=>{
                if(res.isConfirmed){
                    window.location.reload();
                }
            })
          });
      }
      
      const dltProds = (id) =>{
            MySwal.fire({
                icon:"question",
                title: "Product Deletion",
                text: "Do you really want to delete this product?",
                confirmButtonText:"Delete",
                showCancelButton: true,
                cancelButtonText: "Not now"
            }).then((response)=>{
                if(response.isConfirmed){
                    deleteProduct(id);
                }
                else if(response.isDismissed){

                }
            })
      }


  return (
    <Container>
        <BoxCentered sx={{width:'30%'}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4} sx={{textAlign:'center'}}>ALL PRODUCTS</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{textAlign:'center'}}>ID</TableCell>
                            <TableCell sx={{textAlign:'center'}}>Name</TableCell>
                            <TableCell sx={{textAlign:'center'}}>Price</TableCell>
                            <TableCell sx={{textAlign:'center'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map(row => (
                        <TableRow key={row.id}>
                            <TableCell sx={{textAlign:'center'}}>{row.id}</TableCell>
                            <TableCell sx={{textAlign:'center'}}>{row.name}</TableCell>
                            <TableCell sx={{textAlign:'center'}}>{row.price}</TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                <SecondaryButton variant='contained' sx={{display:'inline', mr: 1}}>Edit</SecondaryButton>
                                <ErrorButton variant='contained'  onClick={() => dltProds(row.id)}>Delete</ErrorButton>
                            </TableCell>
                        </TableRow>
                    ))}
                        <TableRow>
                            <TableCell colSpan={3} sx={{textAlign:'center'}}>Logged in as: {loginStatus}</TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                <ErrorButton variant='contained' onClick={logout}>Logout</ErrorButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </BoxCentered>
    </Container>
  )
}

export default Home