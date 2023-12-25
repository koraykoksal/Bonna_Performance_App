import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Outlet, useNavigate } from 'react-router-dom';
import { NotFound } from './NotFound';
import { useEffect } from 'react';
import useAuthCall from '../hooks/useAuthCall';
import { Button } from '@mui/material';


const AdminReport = () => {

    const { currentUser, userInfo } = useSelector((state) => state.auth)
    const {twiserLogin} = useAuthCall()
    const navigate = useNavigate()

    


    return (

        <>

            {
                userInfo.ADMIN == '1' ? (

                    <Box py={15}>
                        <Typography>Admin page</Typography>


                        <Button onClick={()=>twiserLogin()}>
                            Click Me
                        </Button>

                    </Box>
                )
                :
                (
                    <NotFound/>
                )
            }


        </>
    )
}

export default AdminReport