import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import PerformanceResult_Table from '../components/tables/PerformanceResult_Table'
import PerformanceUpdate from '../components/modals/PerformanceUpdate'
import PerformanceResultView from '../components/modals/PerformanceResultView'



const Report = () => {

  const { userInfo, managerPersonels } = useSelector((state) => state.auth)
  const { get_All_PerformanceData } = usePerformanceCall()
  const { all_performanceData } = useSelector((state) => state.performance)
  const [data, setData] = useState([])
  const [managerpersonelData, setManagerPersonelData] = useState([])


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)

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

    id:"",
    type:"",
    //çalışan değerlendirme sonuçları
    personel: "",
    sicilNo: "",
    tcNo: "",
    iseGirisTarih: "",
    dogumTarih: "",
    birim:"",
    bolum:"",
    ustBirim:"",
    yonetici:"",
    gorev: "",
    currentSallary:"",
    degerlendirmeYili:"",
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
    calisanDegerlendirmeYuzdesi:"",
    createdDate: "",
    okudumAnladım:"",
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
    yoneticiCreatedDate:"",
    yoneticiOkudumAnladım: true,
    yoneticiSonuc: "",
    yoneticiDegerlendirmeYili:"",
    yoneticiDegerlendirmeDonemiAciklama:"",
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

      <PerformanceResult_Table all_performanceData={all_performanceData} handleOpen={handleOpen} data={data} setInfo={setInfo}/>

      <PerformanceUpdate open={open} handleClose={handleClose} info={info}/>

      <PerformanceResultView open={open} handleClose={handleClose} info={info}/>

    </div>
  )
}

export default Report