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


  const { userInfo, userManagerInfo } = useSelector((state) => state.auth)

  const currentDate = new Date();

  const evulationInfo = () => {

    let performanceResult = ""
    const thisYear = new Date().getFullYear()
    const nextYear = new Date().getFullYear() + 1

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


  const [info, setInfo] = useState({

    type:"my2",
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
    degerlendirmeSonucu: 0,
    calisanDegerlendirmeYuzdesi: 0.35,
    createdDate: formatDate(currentDate),
    okudumAnladım: true,
    personelSonuc: ""

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

      newInfo.personelSonuc = (calisanPuani >= 0 && calisanPuani <= 45 && "Beklentileri Karşılamıyor") ||
        (calisanPuani >= 46 && calisanPuani <= 60 && "Beklentilerin Altında") ||
        (calisanPuani >= 61 && calisanPuani <= 80 && "Beklenen Performans") ||
        (calisanPuani >= 81 && calisanPuani <= 90 && "Beklentilerin Üzerinde") ||
        (calisanPuani >= 91 && calisanPuani <= 100 && "Üstün Performans")

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