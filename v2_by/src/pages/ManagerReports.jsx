import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import PerformanceResult_Table_BY from '../components/tables/PerformanceResult_Table_BY'
import PerformanceResultView_HR from '../components/modals/PerformanceResultView_HR'
import PdfViewer from '../components/PdfViewer'


const ManagerReports = () => {


 // viewer modal handle state bilgisi
 const [open, setOpen] = useState(false)
 const handleOpen = () => setOpen(true);
 const handleClose = () => {
   setOpen(false)

 }



  const { get_All_PerformanceData } = usePerformanceCall()
  const { all_performanceData } = useSelector((state) => state.performance)
  const [data, setData] = useState([])


  useEffect(() => {
    get_All_PerformanceData('manager-evaluation')
  }, [])


  // yöenticiye bağlı çalışanların bilgisini çek
  // performans değerlendirmesi yapılan çalışanları çek ve tc no bilgileri ile eşleşenleri göster
  useEffect(() => {

    let dizi = []

    Object.values(all_performanceData).forEach(item => {

      if (typeof item == 'object' && item != null) {

        const result = Object.keys(item).map(key => { return { id: key, ...item[key] } })

        result.filter(obj1 => obj1.type == 'my1' || obj1.type == 'my2').map(item => {
          dizi.push(item)
          return { ...item, item }
        })

      }

    })

    setData(dizi)

  }, [all_performanceData])


   //! girilen dataların verilerini tut
   const [info, setInfo] = useState({

    id: "",
    type: "",
    //çalışan değerlendirme sonuçları
    personel: "",
    sicilNo: "",
    tcNo: "",
    iseGirisTarih: "",
    dogumTarih: "",
    birim: "",
    bolum: "",
    ustBirim: "",
    yonetici: "",
    gorev: "",
    currentSallary: "",
    degerlendirmeYili: "",
    degerlendirmeDonemiAciklama: "",
    q1Calisan: "",
    q2Calisan: "",
    q3Calisan: "",
    q4Calisan: "",
    q5Calisan: "",
    q6Calisan: "",
    q7Calisan: "",
    q8Calisan: "",
    q9Calisan: "",
    q10Calisan: "",
    oypCalisan: "",
    dypCalisan: "",
    yypCalisan: "",
    tppCalisan: "",
    calisanAciklama: "",
    degerlendirmeSonucu: "",
    calisanDegerlendirmeYuzdesi: "",
    createdDate: "",
    okudumAnladım: "",
    personelSonuc: "",

    //yönetici değerlendirme sonuçları
    yoneticiQ1: "",
    yoneticiQ2: "",
    yoneticiQ3: "",
    yoneticiQ4: "",
    yoneticiQ5: "",
    yoneticiQ6: "",
    yoneticiQ7: "",
    yoneticiQ8: "",
    yoneticiQ9: "",
    yoneticiQ10: "",
    yoneticiAciklama: "",
    yoneticiDegerlendirmeSonucu: "",
    yoneticiDegerlendirmeYuzdesi: "",
    yoneticiCreatedDate: "",
    yoneticiOkudumAnladım: true,
    yoneticiSonuc: "",
    yoneticiDegerlendirmeYili: "",
    yoneticiDegerlendirmeDonemiAciklama: "",
    yoneticiOyp: "",
    yoneticiDyp: "",
    yoneticiYyp: "",
    yoneticiTpp: "",

    zamOrani_performans: "",
    zamOrani_yonetici_ve_performans: "",
    final_degerlendirmeSonucu: ""

  })


  
  return (
    <div>
      <Typography variant='h6' align='center' mt={12} letterSpacing={5} fontWeight={700} color={'red'}>Yönetici Değerlendirme Sonuçları</Typography>

      <PerformanceResult_Table_BY data={data} handleOpen={handleOpen} setInfo={setInfo} info={info}/>


      <PerformanceResultView_HR handleClose={handleClose} info={info} open={open}/>

      {/* <PdfViewer handleClose={handleClose} info={info} open={open}/> */}


    </div>
  )
}

export default ManagerReports