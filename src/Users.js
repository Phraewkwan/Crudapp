import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

// Box //
import Box from '@mui/material/Box';

//Container //
import Container from '@mui/material/Container';

// Typography //
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Shadow for a Box //
import Paper from '@mui/material/Paper';

// Table //
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Profile Avartar //
import Avatar from '@mui/material/Avatar';

// Links //
import Link from '@mui/material/Link';

// Buttun Group //
import ButtonGroup from '@mui/material/ButtonGroup';


export default function Users() {
    // Call Api 1.1 //
    const [items, setItems] = useState([]);


    // Call Api 1.2 // at website react ajax ****************
    // useEffect(() => {
    //     fetch("https://www.mecallapi.com/api/users")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setItems(result);
    //             },
    //         )
    // }, []) 

    // 1.3****  after call api you will put items put on your code in function map in table for loop data from api in old place


    // How to Detete the Users ***************
    // 1.1 create a funtion OnClink on the button delete **DeleteUser*** 
    // 1.2 create a function delete before return but we will use callmeapi to delete the user that we create
    // 1.3 get and api and do the same way as I do in another js file 
    // 1.4 in this delete case is Delete mothod and copy code and paste in the function and then
    // 1.5 you need to go back to the main page(users.js) so how to that is set link back to the main page by the way we shold have to creact a function(UserGet() line: 106 inside fecth result)
    // 1.6 now we will create the function **UserGet** so now we will move inside UseEffect to UserGet
    // 1.7 and replace Userget() inside of UseEffect *** and it DONE!



    // How to Update information ************************
    // 1.1 create a funtion OnClink on the button Edit **UpdateUser*** 
    // 1.2 create a function **UpdateUser*** before return but we will use callmeapi to Update the user that we create
    // 1.3 inside the function we have ******* window.location = '/update/' + id *** for link to the id of the users 
    // 1.4 now we will create a nre file (UserUpdate) ======> go to UserUpdate.js




    useEffect(() => {
        UserGet()
    }, [])

    const UserGet = () => {
        fetch("https://www.mecallapi.com/api/users")
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
            )
    }

    const UserUpdate = id => {
        window.location = '/update/' + id
    }


    const UserDelete = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.mecallapi.com/api/users/delete", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(result['message'])
                if (result['status'] === 'ok') {
                    UserGet()
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }} >
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Users
                            </Typography>
                        </Box>
                        <Box>
                            <Link href="create">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Avatar</TableCell>
                                    <TableCell align="right">First Name</TableCell>
                                    <TableCell align="right">Last Name</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box display="flex" justifyContent="center">
                                                <Avatar alt={row.username} src={row.avatar} />
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">{row.fname}</TableCell>
                                        <TableCell align="right">{row.lname}</TableCell>
                                        <TableCell align="right">{row.username}</TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                <Button onClick={() => UserUpdate(row.id)}>Edit</Button>
                                                <Button onClick={() => UserDelete(row.id)}>Delete</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
