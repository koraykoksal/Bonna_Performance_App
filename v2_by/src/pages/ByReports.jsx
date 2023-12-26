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
import usePerformanceCall from '../hooks/usePerformanceCall';
import PerformanceResult_Table_BY_OKR from '../components/tables/PerformanceResult_Table_BY_OKR';
import { useState } from 'react';

const ByReports = () => {

    const { twiserAccesToken } = useSelector((state) => state.auth)
    const { byOkrPerformance } = useSelector((state) => state.performance)
    const { twiserLogin } = useAuthCall()
    const { get_beyazYaka_performanceData } = usePerformanceCall()
    // İlk state, verilerinizi saklamak için
    const [myData, setMyData] = useState([]);

    // İkinci state, yeni state'inizi saklamak için
    const [newState, setNewState] = useState([]);




    // sayfa render olduğu zaman twiser sistemine login ol
    useEffect(() => {
        twiserLogin()
    }, [])

    // twiser sistemine login olduktan sonra performans verilerini çek
    useEffect(() => {
        get_beyazYaka_performanceData()
    }, [twiserAccesToken])


  


    return (

        <div>

            <Typography variant='h6' align='center' mt={12} letterSpacing={5} fontWeight={700} color={'red'}>Beyaz Yaka OKR Sonuçlar</Typography>

            <PerformanceResult_Table_BY_OKR byOkrPerformance={byOkrPerformance} />

        </div>
    )
}

export default ByReports