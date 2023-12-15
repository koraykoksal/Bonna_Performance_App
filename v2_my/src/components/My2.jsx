import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import My2_Table from './My2_Table';
import moment from "moment"
import { useSelector } from 'react-redux';



const My2 = () => {

 
  const { currentUser_Category, currentUser, currentUserTitle,userInfo,userManagerInfo } = useSelector((state) => state.auth)

  const thisYear = new Date().getFullYear()
  const nextYear = new Date().getFullYear() + 1
  let performanceResult = ""

  const evulationInfo = () => {

    const currentDate = new Date();
    const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
    const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

    if (currentDate > startLimit && currentDate < endLimit) {
      performanceResult = 'Yıl Sonu Performans Değerlendirme'
    }
    else {
      performanceResult = '6 Aylık Performans Değerlendirme'
    }

    return performanceResult

  }


  const [info, setInfo] = useState({

    personel:userInfo.PERSONEL,
    sicilNo:userInfo.SICILNO,
    tcNo:userInfo.TC,
    iseGirisTarih:userInfo.GIRISTARIHI,
    dogumTarih:userInfo.DOGUMTARIHI,
    birim:userInfo.BIRIM,
    bolum:userInfo.BOLUM,
    ustBirim:userInfo.USTBIRIM,
    yonetici:userManagerInfo.PERSONEL,
    gorev:userInfo.GOREV,
    currentSallary:userInfo.MAAS,
    degerlendirmeYili:new Date().getFullYear(),
    degerlendirmeDonemiAciklama:evulationInfo(),
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
    datetime:new Date(),
    okudumAnladım:true


  })

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

      return newInfo

    })



  }

  return (

    <div>

      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>

        <My2_Table info={info} setInfo={setInfo} handleChange={handleChange} />

      </Box>


    </div>
  )
}

export default My2