import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function UserUpdate() {

    // Now we are in the file******************** come from the user.js
    // 1.5 Copy the all file from UserCreate.js to this file
    // 1.6 now we will Use (Useparams from react) and create ****const { id } = useParams(); ****
    // 1.7 and now change the api(api in line DETAIL callmeapi **method: Put** line: 62 ) to users + id (fecth) and inside if result we will use use effect function for replace new value  ***in fecth if => result
    // 1.8 and now add id: id, in **var raw = JSON.stringify** and in last one in UseEffect **line: 25
    // 1.9 add method value after onchage for get the old value and DONE!***************



    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const { id } = useParams();

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://www.mecallapi.com/api/users/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'ok') {
                    setFname(result['user']['fname'])
                    setLname(result['user']['lname'])
                    setUsername(result['user']['username'])
                    setEmail(result['user']['email'])
                    setAvatar(result['user']['avatar'])
                }
            })
            .catch(error => console.log('error', error));
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id,
            "fname": fname,
            "lname": lname,
            "username": username,
            "email": email,
            "avatar": avatar
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.mecallapi.com/api/users/update", requestOptions)
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
                    Update User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="fname" label="First Name" variant="outlined"
                                fullWidth required
                                onChange={(e) => setFname(e.target.value)}
                                value={ fname }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="lname" label="Last Name" variant="outlined"
                                fullWidth required
                                onChange={(e) => setLname(e.target.value)}
                                value={ lname }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="username" label="Username" variant="outlined"
                                fullWidth required
                                onChange={(e) => setUsername(e.target.value)}
                                value={ username }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="email" label="Email" variant="outlined"
                                fullWidth required
                                onChange={(e) => setEmail(e.target.value)}
                                value={ email }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="avatar" label="Avartar" variant="outlined"
                                fullWidth required
                                onChange={(e) => setAvatar(e.target.value)}
                                value={ avatar }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant='contained' fullWidth >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}
