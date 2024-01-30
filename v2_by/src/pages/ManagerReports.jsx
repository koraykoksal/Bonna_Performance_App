import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import PerformanceResult_Table_BY from '../components/tables/PerformanceResult_Table_BY'
import PerformanceResultView_HR from '../components/modals/PerformanceResultView_HR'
import DeleteModal from '../components/delete/DeleteModal'

const ManagerReports = () => {


  const { get_All_PerformanceData, getBonnaPersonels } = usePerformanceCall()
  const { all_performanceData,bonnaPersonels } = useSelector((state) => state.performance)
  const [guncellenmisPerformanceData, setGuncellenmisPerformanceData] = useState([]);

  // viewer modal handle state bilgisi
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)

  }

  const [Open_delete, setOpen_delete] = useState(false)
  const HandleOpen_delete = () => setOpen_delete(true);
  const HandleClose_delete = () => {
    setOpen_delete(false)

  }


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


  useEffect(() => {
    getBonnaPersonels()
    get_All_PerformanceData('manager-evaluation')
  }, [])


  //! yönetici değerlendirme datasının final_degerlendirme sonucunu kontrol et ve güncelle
  useEffect(() => {

    const guncellenmisData = all_performanceData.map(item => {

      const sonuc = parseFloat(item.final_degerlendirmeSonucu);

      let aciklama = "";
      if (sonuc > 0 && sonuc <= 40) aciklama = "Beklentiyi Karşılamıyor 😩";
      else if (sonuc > 40 && sonuc <= 60) aciklama = "Beklentilerin Altında 🥺";
      else if (sonuc > 60 && sonuc <= 80) aciklama = "Beklenen Performans 😑";
      else if (sonuc > 80 && sonuc <= 90) aciklama = "Beklentilerin Üzerinde 😀";
      else if (sonuc > 90 && sonuc <= 100) aciklama = "Üstün Performans 🥳";

      const personel = bonnaPersonels?.find(person => person?.TCKIMLIKNO == item?.tcNo)

      const lokasyon = personel ? personel?.LOKASYON : "Bilinmiyor";
      const birim_ = personel && personel.BIRIMACIKLAMA ? personel.BIRIMACIKLAMA : "Bilinmiyor";
      const birim = birim_.replace(/&amp;/g, '&'); // hatalı gelen string değeri güncelle

      return { ...item, final_degerlendirmeAciklamasi: aciklama,lokasyon,birim };
    });

    // Gerekiyorsa bu sonucu başka bir state'e atayabilirsiniz.
    setGuncellenmisPerformanceData(guncellenmisData);

  }, [all_performanceData,bonnaPersonels])


  return (
    <div>
      <Typography variant='h6' align='center' mt={12} letterSpacing={5} fontWeight={700} color={'red'}>Yönetici Değerlendirme Sonuçları</Typography>

      <PerformanceResult_Table_BY guncellenmisPerformanceData={guncellenmisPerformanceData} handleOpen={handleOpen} setInfo={setInfo} info={info} HandleOpen_delete={HandleOpen_delete} />


      <PerformanceResultView_HR handleClose={handleClose} info={info} open={open} />

      <DeleteModal Open_delete={Open_delete} HandleClose_delete={HandleClose_delete} info={info} setInfo={setInfo} />

    </div>
  )
}

export default ManagerReports