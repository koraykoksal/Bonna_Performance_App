import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import PerformanceUpdate from '../components/modals/PerformanceUpdate';
import PerformanceResult_Table from '../components/tables/PerformanceResult_Table';
import { Typography, Grid } from "@mui/material"

const MyReport = () => {


  const { get_performanceData } = usePerformanceCall()
  const { userInfo, userManagerInfo } = useSelector((state) => state.auth)

  const currentDate = new Date();

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)

  }

  const evulationInfo = () => {

    const thisYear = new Date().getFullYear()
    const nextYear = new Date().getFullYear() + 1
    let performanceResult = ""

    const currentDate = new Date();
    const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
    const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

    if (currentDate > startLimit || currentDate < endLimit) {
      performanceResult = 'Yıl Sonu Performans Değerlendirme'
    }
    else {
      performanceResult = '6 Aylık Performans Değerlendirme'
    }

    return performanceResult

  }


  const [info, setInfo] = useState({
    personel: userInfo.PERSONEL,
    sicilNo: userInfo.SICILNO,
    tcNo: userInfo.TC,
    iseGirisTarih: userInfo.GIRISTARIHI,
    dogumTarih: userInfo.DOGUMTARIHI,
    birim: userInfo.BIRIM,
    bolum: userInfo.BOLUM,
    ustBirim: userInfo.USTBIRIM,
    yonetici: userManagerInfo.PERSONEL,
    gorev: userInfo.GOREV,
    currentSallary: userInfo.MAAS,
    degerlendirmeYili: new Date().getFullYear(),
    degerlendirmeDonemiAciklama: evulationInfo(),
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
    yypCalisan: 0,
    tppCalisan: 0,
    calisanAciklama: "",
    degerlendirmeSonucu: 0,
    calisanDegerlendirmeYuzdesi: 0.25,
    createdDate: formatDate(currentDate),
    okudumAnladım: true,
    personelSonuc: "",
    type:"",
  })


  function formatDate(date) {
    let day = date.getDate(); // Günü alır
    let month = date.getMonth() + 1; // Ayı alır (0'dan başladığı için 1 eklenir)
    let year = date.getFullYear(); // Yılı alır
    let hours = date.getHours(); // Saati alır
    let minutes = date.getMinutes(); // Dakikayı alır

    // Gün, ay, saat veya dakika tek basamaklıysa, başına '0' ekler
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }



  const handleChange = (e) => {

    setInfo(prevInfo => {

      const newInfo = { ...prevInfo, [e.target.name]: e.target.value }

      const operayonelYetkinlikPuani = Number(newInfo.q1Calisan) + Number(newInfo.q2Calisan) + Number(newInfo.q3Calisan) + Number(newInfo.q4Calisan)

      const davranissalYetkinlikPuani = Number(newInfo.q5Calisan) + Number(newInfo.q6Calisan) + Number(newInfo.q7Calisan) + Number(newInfo.q8Calisan)

      const yonetselYetkinlikPuani = Number(newInfo.q9Calisan) + Number(newInfo.q10Calisan)

      const calisanPuani = Number(newInfo.q1Calisan) + Number(newInfo.q2Calisan) + Number(newInfo.q3Calisan) + Number(newInfo.q4Calisan) + Number(newInfo.q5Calisan) + Number(newInfo.q6Calisan) + Number(newInfo.q7Calisan) + Number(newInfo.q8Calisan) + Number(newInfo.q9Calisan) + Number(newInfo.q10Calisan)

      newInfo.oypCalisan = operayonelYetkinlikPuani;
      newInfo.dypCalisan = davranissalYetkinlikPuani;
      newInfo.yypCalisan = yonetselYetkinlikPuani;
      newInfo.tppCalisan = newInfo.oypCalisan + newInfo.dypCalisan + newInfo.yypCalisan
      newInfo.degerlendirmeSonucu = Number(Number(calisanPuani) * Number(newInfo.calisanDegerlendirmeYuzdesi)).toFixed(2)

      newInfo.personelSonuc = (calisanPuani >= 0 && calisanPuani <= 45 && "Beklentileri Karşılamıyor") ||
        (calisanPuani >= 46 && calisanPuani <= 60 && "Beklentilerin Altında") ||
        (calisanPuani >= 61 && calisanPuani <= 80 && "Beklenen Performans") ||
        (calisanPuani >= 81 && calisanPuani <= 90 && "Beklentilerin Üzerinde") ||
        (calisanPuani >= 91 && calisanPuani <= 100 && "Üstün Performans")

      return newInfo

    })



  }


  useEffect(() => {
    get_performanceData('my-performance', userInfo.TC)
  }, [])





  return (
    <div>

      <Typography variant='h6' align='center' mt={12} letterSpacing={10} color={'red'} fontWeight={700}>Sonuçlar</Typography>

      {/* rapor sonuçlaırını gösteren COMPONENT */}
      <PerformanceResult_Table setInfo={setInfo} handleOpen={handleOpen} />

      {/* güncelleme yapılacağı zaman çalışacak MODAL */}
      <PerformanceUpdate open={open} handleClose={handleClose} info={info} handleChange={handleChange} />

    </div>
  )
}

export default MyReport