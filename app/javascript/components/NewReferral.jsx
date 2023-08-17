import axios from 'axios';
import React, { Component } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './shared/Navbar';
const defaultTheme = createTheme();

class NewReferral extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            name: "",
            showAlert: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { name, email } = this.state

        axios
            .post(
                "/api/v1/referrals/create",
                {
                    referral: {
                        name: name,
                        email: email,
                    }
                }
            )
            .then(response => {
<<<<<<< HEAD
                console.log(response);
                window.location.href = "http://localhost:3000/referrals"
            })
            .catch(error => {
                debugger
=======
                // As routing was handled in rails, react Native hook will not work.
                // navigate("/referrls")
                window.location.href = "http://localhost:3000/referrals"
            })
            .catch(error => {
>>>>>>> new_changes
                this.setState({
                    showAlert: true
                });
            })
        event.preventDefault();
    }

    render() {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Navbar></Navbar>
                {this.state.showAlert && (
                    <Snackbar open={this.state.showAlert} autoHideDuration={6000} onClose={() => this.setState({showAlert: false})} 
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}>
                        <MuiAlert
                            onClose={() => this.setState({showAlert: false})}
                            severity="error"
                            sx={{ width: '100%' }}
                        >
                            Email already exists / Email format was wrong
                        </MuiAlert>
                    </Snackbar>
                )}
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        <Typography component="h1" variant="h5">
                            Referral Details
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        type="name"
                                        id="name"
                                        autoComplete="new-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Refer
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

export default NewReferral;



