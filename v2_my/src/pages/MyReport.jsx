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
    personel:"",
    sicilNo:"",
    tcNo:"",
    iseGirisTarih:"",
    dogumTarih:"",
    birim:"",
    bolum:"",
    ustBirim:"",
    yonetici:"",
    gorev:"",
    currentSallary:"",
    degerlendirmeYili:"",
    degerlendirmeDonemiAciklama:"",
    q1Calisan: 0,
    q2Calisan: 0,
    q3Calisan: 0,
    q4Calisan: 0,
    q5Calisan: 0,
    q6Calisan: 0,
    q7Calisan: 0,
    q8Calisan: 0,
    q9Calisan: 0,
    q10Calisan: 0,
    oypCalisan: 0,
    dypCalisan: 0,
    yypCalisan:0,
    tppCalisan: 0,
    calisanAciklama: "",
    degerlendirmeSonucu: 0,
    calisanDegerlendirmeYuzdesi: 0.35,
    datetime:new Date()
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