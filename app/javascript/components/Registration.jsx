import axios from 'axios';
import React, { Component } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme();

class Registration extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registration_errors: ""
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
        const { email, password, password_confirmation } = this.state

        axios
            .post(
                "/signup",
                {
                    user: {
                        email: email,
                        password: password,
                        password_confirmation: password_confirmation
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
                console.log("reg err is:", error);
            })
        event.preventDefault();
    }

    render() {
        return (
            <ThemeProvider theme={defaultTheme}>
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
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
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
                                <Grid item xs={12}>
                                    <TextField
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={this.state.password_confirmation}
                                        onChange={this.handleChange}
                                        required
                                        fullWidth
                                        name="password_confirmation"
                                        label="Password Confirmation"
                                        type="password"
                                        id="password_confirmation"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        Already have an account? Sign in
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

export default Registration;



