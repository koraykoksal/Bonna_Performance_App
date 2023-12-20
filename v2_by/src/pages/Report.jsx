import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import PerformanceResult_Table from '../components/tables/PerformanceResult_Table'
import PerformanceUpdate from '../components/modals/PerformanceUpdate'
import PerformanceResultView from '../components/modals/PerformanceResultView'
import { Box, Typography } from "@mui/material"


const Report = () => {

  const { userInfo, managerPersonels } = useSelector((state) => state.auth)
  const { get_All_PerformanceData } = usePerformanceCall()
  const { all_performanceData } = useSelector((state) => state.performance)
  const [data, setData] = useState([])
  const [managerpersonelData, setManagerPersonelData] = useState([])


  const [open_editPage, setOpen_editPage] = useState(false)
  const handleOpen_editPage = () => setOpen_editPage(true);
  const handleClose_editPage = () => {
    setOpen_editPage(false)

  }

  const [open_viewPage, setOpen_viewPage] = useState(false)
  const handleOpen_viewPage = () => setOpen_viewPage(true);
  const handleClose_viewPage = () => {
    setOpen_viewPage(false)

  }



  useEffect(() => {
    get_All_PerformanceData('manager-evaluation')
  }, [])



  // yöenticiye bağlı çalışanların bilgisini çek
  // performans değerlendirmesi yapılan çalışanları çek ve tc no bilgileri ile eşleşenleri göster
  useEffect(() => {

    let dizi = []

    if (Array.isArray(managerPersonels.PERSONEL)) {


      let multiSonuc = []
      for (let i = 0; i < managerPersonels.PERSONEL.length; i++) {
        multiSonuc.push({
          personel: managerPersonels.PERSONEL[i],
          tc: managerPersonels.TC[i]
        })
      }

      setManagerPersonelData(multiSonuc)

    }
    else {

      let singleSonuc = []
      const dizi = [managerPersonels]

      for (let i = 0; i < dizi.length; i++) {
        singleSonuc.push({
          personel: dizi[0].PERSONEL,
          tc: dizi[0].TC
        })
      }
      setManagerPersonelData(singleSonuc)
    }

    Object.values(all_performanceData).forEach(item => {

      if (typeof item == 'object' && item != null) {

        const result = Object.keys(item).map(key => { return { id: key, ...item[key] } })

        const detayliEslesenler2 = managerpersonelData.filter(obj1 => result.some(obj2 => obj2.tcNo === obj1.tc))
          .map(obj1 => {
            const eslesen = result.find(obj2 => obj2.tcNo === obj1.tc);

            // eşleşen datası array içine gönder
            dizi.push(eslesen)

            return { ...obj1, eslesen };
          });

        setData(dizi)
      }

    })


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


  //! inputlara veri girişi olduğu zaman otomatik işlem yap
  const handleChange = (e) => {

    if (info?.type == 'my1') {
      setInfo(prevInfo => {

        const newInfo = { ...prevInfo, [e.target.name]: e.target.value }

        //ilk 6 soru operasyonel yetkinlik için hesaplanır
        const operayonelYetkinlikPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4) + Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6)

        //son 4 soru davranışsal yetkinlik için hesaplanır
        const davranissalYetkinlikPuani = Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8) + Number(newInfo.yoneticiQ9) + Number(newInfo.yoneticiQ10)


        const yoneticiPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4) + Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6) + Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8) + Number(newInfo.yoneticiQ9) + Number(newInfo.yoneticiQ10)

        newInfo.yoneticiOyp = operayonelYetkinlikPuani;
        newInfo.yoneticiDyp = davranissalYetkinlikPuani;

        //! type bilgisi my1 olduğu için 'newInfo.yoneticiYyp' ve 'newInfo.yypCalisan' bilgisi 0 atanır. Aksi durumda undifined olacaktır.
        newInfo.yoneticiYyp = 0;
        newInfo.yypCalisan = 0;

        newInfo.yoneticiTpp = newInfo.yoneticiOyp + newInfo.yoneticiDyp

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
    else {
      setInfo(prevInfo => {

        const newInfo = { ...prevInfo, [e.target.name]: e.target.value }

        //ilk 4 soru operasyonel yetkinlik için hesaplanır
        const operayonelYetkinlikPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4)

        // 5-8 arası sorular davranışsal yetkinlik için hesaplanır
        const davranissalYetkinlikPuani = Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6) + Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8)

        // son iki soru yönetsel yetkinlil için hesaplanır
        const yonetselYetkinlikPuani = Number(newInfo.yoneticiQ9) + Number(newInfo.yoneticiQ10)


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

  }


console.log(info)

  return (
    <div>

      <Typography variant='h6' align='center' mt={12} letterSpacing={10} color={'red'} fontWeight={700}>Sonuçlar</Typography>

      <PerformanceResult_Table all_performanceData={all_performanceData} handleOpen_editPage={handleOpen_editPage} handleOpen_viewPage={handleOpen_viewPage} data={data} setInfo={setInfo} />

      <PerformanceUpdate open_editPage={open_editPage} handleClose_editPage={handleClose_editPage} info={info} handleChange={handleChange} />

      <PerformanceResultView open_viewPage={open_viewPage} handleClose_viewPage={handleClose_viewPage} info={info} />

    </div>
  )
}

export default Report