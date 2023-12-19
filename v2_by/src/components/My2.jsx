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
import { useSelector } from "react-redux"


const My2 = ({ personelData }) => {

  const { userInfo } = useSelector((state) => state.auth)
  const createdDate = new Date()

  //! performans dönemi bilgisini çalıştır
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


  //! createddate bilgisini çıkar
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


  //! inputlara veri girişi olduğu zaman otomatik işlem yap
  const handleChange = (e) => {

    setInfo(prevInfo => {

      const newInfo = { ...prevInfo, [e.target.name]: e.target.value }

      //ilk 4 soru operasyonel yetkinlik için hesaplanır
      const operayonelYetkinlikPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4)

      // 5-8 arası sorular davranışsal yetkinlik için hesaplanır
      const davranissalYetkinlikPuani = Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6) + Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8)

      // son iki soru yönetsel yetkinlil için hesaplanır
      const yonetselYetkinlikPuani = Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6) + Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8)


      const yoneticiPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4) + Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6) + Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8) + Number(newInfo.yoneticiQ9) + Number(newInfo.yoneticiQ10)

      newInfo.yoneticiOyp = operayonelYetkinlikPuani;
      newInfo.yoneticiDyp = davranissalYetkinlikPuani;
      newInfo.yoneticiYyp = yonetselYetkinlikPuani;

      newInfo.yoneticiTpp = newInfo.yoneticiOyp + newInfo.yoneticiDyp + newInfo.yoneticiYyp

      newInfo.yoneticiDegerlendirmeSonucu = Number(Number(yoneticiPuani) * Number(newInfo.yoneticiDegerlendirmeYuzdesi)).toFixed(2)

      newInfo.yoneticiSonuc = (yoneticiPuani >= 0 && yoneticiPuani <= 45 && "Beklentileri Karşılamıyor") ||
        (yoneticiPuani >= 46 && yoneticiPuani <= 60 && "Beklentilerin Altında") ||
        (yoneticiPuani >= 61 && yoneticiPuani <= 80 && "Beklenen Performans") ||
        (yoneticiPuani >= 81 && yoneticiPuani <= 90 && "Beklentilerin Üzerinde") ||
        (yoneticiPuani >= 91 && yoneticiPuani <= 100 && "Üstün Performans")

      const toplamDegerlendirmeSonucu = Number(newInfo.degerlendirmeSonucu) + Number(newInfo.yoneticiDegerlendirmeSonucu)

      newInfo.final_degerlendirmeSonucu = Number(toplamDegerlendirmeSonucu).toFixed(2)

      newInfo.zamOrani_performans = (Number(toplamDegerlendirmeSonucu >= 81 && true))
      newInfo.zamOrani_yonetici_ve_performans = Number(toplamDegerlendirmeSonucu >= 91) && Number(toplamDegerlendirmeSonucu <= 100) && true

      return newInfo

    })

  }



  //! girilen dataların verilerini tut
  const [info, setInfo] = useState({

    //çalışan değerlendirme sonuçları
    personel: personelData?.personel,
    sicilNo: personelData?.sicilNo,
    tcNo: personelData?.tcNo,
    iseGirisTarih: personelData?.iseGirisTarih,
    dogumTarih: personelData?.dogumTarih,
    birim: personelData?.birim,
    bolum: personelData?.bolum,
    ustBirim: personelData?.ustBirim,
    yonetici: userInfo?.NAME + " " + userInfo?.SURNAME,
    gorev: personelData?.gorev,
    currentSallary: personelData?.currentSallary,
    degerlendirmeYili: personelData?.degerlendirmeYili,
    degerlendirmeDonemiAciklama: personelData?.degerlendirmeDonemiAciklama,
    q1Calisan: personelData?.q1Calisan,
    q2Calisan: personelData?.q2Calisan,
    q3Calisan: personelData?.q3Calisan,
    q4Calisan: personelData?.q4Calisan,
    q5Calisan: personelData?.q5Calisan,
    q6Calisan: personelData?.q6Calisan,
    q7Calisan: personelData?.q7Calisan,
    q8Calisan: personelData?.q8Calisan,
    q9Calisan: personelData?.q9Calisan,
    q10Calisan: personelData?.q10Calisan,
    oypCalisan: personelData?.oypCalisan,
    dypCalisan: personelData?.dypCalisan,
    yypCalisan: personelData?.yypCalisan,
    tppCalisan: personelData?.tppCalisan,
    calisanAciklama: personelData?.calisanAciklama,
    degerlendirmeSonucu: personelData?.degerlendirmeSonucu,
    calisanDegerlendirmeYuzdesi: personelData?.calisanDegerlendirmeYuzdesi,
    createdDate: personelData?.createdDate,
    okudumAnladım: personelData?.okudumAnladım,
    personelSonuc: personelData?.personelSonuc,

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
    yoneticiDegerlendirmeYuzdesi: 0.65,
    yoneticiCreatedDate: formatDate(createdDate),
    yoneticiOkudumAnladım: true,
    yoneticiSonuc: "",
    yoneticiDegerlendirmeYili: new Date().getFullYear(),
    yoneticiDegerlendirmeDonemiAciklama: evulationInfo(),
    yoneticiOyp: "",
    yoneticiDyp: "",
    yoneticiYyp: "",
    yoneticiTpp: "",

    zamOrani_performans: false,
    zamOrani_yonetici_ve_performans: false,
    final_degerlendirmeSonucu: ""

  })


  return (

    <div>

      <My2_Table  info={info} handleChange={handleChange} personelData={personelData} />


    </div>
  )
}

export default My2