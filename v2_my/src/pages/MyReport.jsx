import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import PerformanceUpdate from '../components/modals/PerformanceUpdate';
import PerformanceResult_Table from '../components/tables/PerformanceResult_Table';


const MyReport = () => {


  const { post_new_performanceData, get_performanceData } = usePerformanceCall()
  const { currentUser_Category, currentUser, currentUserTitle, userInfo, userManagerInfo } = useSelector((state) => state.auth)

  const [info, setInfo] = useState({
    personel:""
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    
  }


  useEffect(() => {
    get_performanceData('my-performance', userInfo.TC)
  }, [])



  return (
    <div>

    {/* rapor sonuçlaırını gösteren COMPONENT */}
    <PerformanceResult_Table setInfo={setInfo} handleOpen={handleOpen}/>  

    {/* güncelleme yapılacağı zaman çalışacak MODAL */}
    <PerformanceUpdate open={open} handleClose={handleClose} info={info}/>    

    </div>
  )
}

export default MyReport