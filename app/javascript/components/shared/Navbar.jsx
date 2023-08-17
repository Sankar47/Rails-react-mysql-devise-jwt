import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';


export default function Navbar() {
    const logout = (event) => {
        axios
            .delete(
                "/signout",
                {
                    headers: {
                        "authorization": localStorage.getItem("token")
                    }
                }
            )
            .then(response => {
<<<<<<< HEAD
                console.log(response);
                localStorage.removeItem("token")
=======
                localStorage.removeItem("token")
                // As routing was handled in rails, react Native hook will not work.
                // navigate("/")
>>>>>>> new_changes
                window.location.href = "http://localhost:3000"
            })
            .catch(error => {
                console.log("login err is:", error);
            })
        event.preventDefault()
    }
  return (        
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" size="large" href="/">
                            DirectShifts Task
                        </Button>
                    </Typography>
                    <Button 
                        color="inherit"
                        onClick={logout}>
                            Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
  );
}