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


const ByReports = () => {

    const { currentUser, userInfo ,twiserAccesToken} = useSelector((state) => state.auth)
    const { twiserLogin } = useAuthCall()
    const navigate = useNavigate()

    useEffect(() => {
        twiserLogin()
    }, [])
    

    console.log(twiserAccesToken)

    return (

        <div>

            <Typography variant='h6' align='center' mt={12} letterSpacing={5} fontWeight={700} color={'red'}>Beyaz Yaka OKR Sonuçlar</Typography>

        </div>
    )
}

export default ByReports