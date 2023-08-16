import axios from 'axios';
import React, { Component, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            login_errors: "",
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
        const { email, password } = this.state
        
        axios
        .post(
            "/signin",
            {
                user: {
                    email: email,
                    password: password
                }
            }
            )
            .then(response => {
                localStorage.setItem('token', response.headers.get("Authorization"))
                if(response.status === 200) {
                    // As routing was handled in rails, react Native hook will not work.
                    // navigate("/referrls")
                    window.location.href = "http://localhost:3000/referrals"
                }
            })
            .catch(error => {
                console.log("login err is:", error);
                this.setState({
                    showAlert: true
                });
            })
        event.preventDefault();
    }

    render() {
        return (
            <ThemeProvider theme={defaultTheme}>
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
                        Unauthorized Access: Invalid Username / Password.
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                onChange={this.handleChange}
                                value={this.state.email}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={this.handleChange}
                                value={this.state.password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/registration" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

export default Login;