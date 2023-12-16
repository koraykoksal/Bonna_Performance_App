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

const AdminReport = () => {

    const { currentUser, userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    return (

        <>

            {
                userInfo.ADMIN == '1' ? (

                    <Box>
                        <Typography>Admin page</Typography>
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