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
import PerformanceResultView_OKR from '../components/modals/PerformanceResultView_OKR';



const ByReports = () => {

    const { twiserAccesToken } = useSelector((state) => state.auth)
    const { byOkrPerformance } = useSelector((state) => state.performance)
    const { twiserLogin } = useAuthCall()
    const { get_beyazYaka_performanceData } = usePerformanceCall()


    // viewer modal handle state bilgisi
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)

    }

   


    // sayfa render olduğu zaman twiser sistemine login ol
    useEffect(() => {
        if (!twiserAccesToken) {
            twiserLogin()
        }
    }, [])

    // twiser sistemine login olduktan sonra performans verilerini çek
    useEffect(() => {
        get_beyazYaka_performanceData()
    }, [twiserAccesToken])



    //! girilen dataların verilerini tut
    const [info, setInfo] = useState({

        CompanyName: "",
        CompetencePeriodList: "",
        CompetencePeriods: "",
        CompetencePeriodsAvg: "",
        CompetenceWeight: "",
        Department: "",
        DimensionName: "",
        ExternalNote: "",
        ExternalNoteName: "",
        ExternalNoteWeight: "",
        FinalScore: "",
        FinalScoreScale: "",
        IncludeModules: "",
        ManagerComment: "",
        ManagerScore: "",
        ManagerScoreIsSend: "",
        ManagerScoreScale: "",
        ObjectivePeriodList: "",
        ObjectivePeriods: "",
        ObjectivePeriodsAvg: "",
        ObjectiveWeight: "",
        ParentEmail: "",
        ParentFullName: "",
        PerformancePeriodName: "",
        SystemNote: "",
        SystemNoteScale: "",
        UserEmail: "",
        UserEmployeeNo: "",
        UserFullName: "",
        UserPosition: ""




    })


    return (

        <div>

            <Typography variant='h6' align='center' mt={12} letterSpacing={5} fontWeight={700} color={'red'}>Beyaz Yaka OKR Sonuçlar</Typography>

            <PerformanceResult_Table_BY_OKR byOkrPerformance={byOkrPerformance} setInfo={setInfo} handleOpen={handleOpen} />

            <PerformanceResultView_OKR info={info} open={open} handleClose={handleClose} />

            <DeleteModal Open_delete={Open_delete} HandleClose_delete={HandleClose_delete} info={info} setInfo={setInfo} />

        </div>
    )
}

export default ByReports