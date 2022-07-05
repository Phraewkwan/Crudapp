import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function UserCreate() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    // 1.1 first of all you should do the UI 
    // 1.2 create useState function for your form (create a user) and set function onChange for reach the value ***line: 68 for set the value on useState
    // 1.3 now it is time to create a function in form(onsubmit **put the fuction**(name whatever you want)) line: 64
    // 1.4 create a funciton => name hanleSubmit
    // 1.5 And now Copy the Code and change to JavaScript fecth to the fuction that you have created in this case it is  on the form line: 62
    // 1.6 Call Api(Callmeapi) in the line of the website is CreateUser 
    // 1.7 then copy the link and put it on the postman and create a request and choose the method *** POST *** and then click on the body and copy =>
    // the body from api and paste it then choose raw file and text to json (on postman)
    // Dont forget to set alert(result['message']) on line: 49 and link to Users.js page(main page)
                
               
   

    const handleSubmit = (event) => {
        event.preventDefault(); // for not reload when click Submit
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fname": fname,
            "lname": lname,
            "username": username,
            "email": email,
            "avatar": avatar
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.mecallapi.com/api/users/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(result['message'])
                if (result['status'] === 'ok') {
                    window.location.href = '/'
                }
            }
            )
            .catch(error => console.log('error', error));
    }

    return (

        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Create User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="fname" label="First Name" variant="outlined"
                                fullWidth required
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="lname" label="Last Name" variant="outlined"
                                fullWidth required
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="username" label="Username" variant="outlined"
                                fullWidth required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="email" label="Email" variant="outlined"
                                fullWidth required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="avatar" label="Avartar" variant="outlined"
                                fullWidth required
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant='contained' fullWidth >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}
