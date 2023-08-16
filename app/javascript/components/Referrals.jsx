import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from './shared/Navbar';
import EnhancedTable from './shared/TableData';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const Referrals = () => {
    const navigate = useNavigate();
    const [referrals, setReferrals] = useState([]);
  
    useEffect(() => {
          axios
              .get(
                  "/api/v1/referrals/index",
                  {
                    headers: {
                        "authorization": localStorage.getItem("token")
                    }
                  },
              )
              .then(response => {
                setReferrals(response.data.referrals);
              })
              .catch(() => navigate("/"));
    }, []);
    
    const allReferrals =  (
        <Box sx={{ mt: 2 }}>
            <EnhancedTable referrals={referrals}></EnhancedTable>
        </Box>
    );
    const noReferral = (
      <>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableBody>
            <TableRow
              hover
              tabIndex={-1}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
              >
                <h2>No Referrals Yet</h2>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
  
    return (
        <>
          <Navbar></Navbar>
          <Container>
              <Box sx={{ mt: 2 }}>
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="contained" color="success" href="/referrals/new">
                    <PersonAddOutlinedIcon fontSize="small" sx={{ mr: 1 }}/>Refer a Friend
                  </Button>
                </Stack>
              </Box>
              {referrals.length > 0 ? allReferrals : noReferral}
          </Container>
        </>
    );
  };
  
export default Referrals;