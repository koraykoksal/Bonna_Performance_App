import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import { useSelector } from "react-redux"
import PerformanceResult_Table_BY from '../components/tables/PerformanceResult_Table_BY'
import PerformanceResultView_HR from '../components/modals/PerformanceResultView_HR'
import DeleteModal from '../components/delete/DeleteModal'
import PerformanceUpdate from '../components/modals/PerformanceUpdate'
import { personelChanceData } from '../helper/personelScoreData'
import { reportPageBgStyle } from '../styles/globalStyle'


const ManagerReports = () => {


  const { get_All_PerformanceData, getBonnaPersonels,put_performanceData } = usePerformanceCall()
  const { all_performanceData, bonnaPersonels } = useSelector((state) => state.performance)
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

  const [open_editPage, setOpen_editPage] = useState(false)
  const HandleOpen_editPage = () => setOpen_editPage(true);
  const handleClose_editPage = () => {
    setOpen_editPage(false)

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

      return { ...item, final_degerlendirmeAciklamasi: aciklama, lokasyon, birim };
    });

    // Gerekiyorsa bu sonucu başka bir state'e atayabilirsiniz.
    setGuncellenmisPerformanceData(guncellenmisData);

  }, [all_performanceData, bonnaPersonels])



  //! inputlara veri girişi olduğu zaman otomatik işlem yap
  const handleChange = (e) => {

    if (info.type == "my1") {

      setInfo(prevInfo => {

        const newInfo = { ...prevInfo, [e.target.name]: e.target.value }

        //ilk 6 soru operasyonel yetkinlik için hesaplanır
        const operayonelYetkinlikPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4) + Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6)

        //son 4 soru davranışsal yetkinlik için hesaplanır
        const davranissalYetkinlikPuani = Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8) + Number(newInfo.yoneticiQ9) + Number(newInfo.yoneticiQ10)


        const yoneticiPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4) + Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6) + Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8) + Number(newInfo.yoneticiQ9) + Number(newInfo.yoneticiQ10)

        newInfo.yoneticiOyp = operayonelYetkinlikPuani;
        newInfo.yoneticiDyp = davranissalYetkinlikPuani;

        newInfo.yoneticiTpp = newInfo.yoneticiOyp + newInfo.yoneticiDyp

        newInfo.yoneticiDegerlendirmeSonucu = Number(Number(yoneticiPuani) * Number(newInfo.yoneticiDegerlendirmeYuzdesi)).toFixed(2)

        newInfo.yoneticiYyp = ""
        newInfo.yypCalisan = ""

        newInfo.yoneticiSonuc = (yoneticiPuani >= 0 && yoneticiPuani <= 45 && "Beklentileri Karşılamıyor") ||
          (yoneticiPuani > 45 && yoneticiPuani <= 60 && "Beklentilerin Altında") ||
          (yoneticiPuani > 60 && yoneticiPuani <= 80 && "Beklenen Performans") ||
          (yoneticiPuani > 80 && yoneticiPuani <= 90 && "Beklentilerin Üzerinde") ||
          (yoneticiPuani > 90 && yoneticiPuani <= 100 && "Üstün Performans")

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

        newInfo.final_degerlendirmeAciklamasi = (newInfo.final_degerlendirmeSonucu >= 0 && newInfo.final_degerlendirmeSonucu <= 45 && "Beklentileri Karşılamıyor 😫") ||
          (newInfo.final_degerlendirmeSonucu > 45 && newInfo.final_degerlendirmeSonucu <= 60 && "Beklentilerin Altında 🙁") ||
          (newInfo.final_degerlendirmeSonucu > 60 && newInfo.final_degerlendirmeSonucu <= 80 && "Beklenen Performans 😐") ||
          (newInfo.final_degerlendirmeSonucu > 80 && newInfo.final_degerlendirmeSonucu <= 90 && "Beklentilerin Üzerinde 😬") ||
          (newInfo.final_degerlendirmeSonucu > 90 && newInfo.final_degerlendirmeSonucu <= 100 && "Üstün Performans 😎")

        newInfo.zamOrani_performans = (Number(toplamDegerlendirmeSonucu >= 81 && true))
        newInfo.zamOrani_yonetici_ve_performans = Number(toplamDegerlendirmeSonucu >= 91) && Number(toplamDegerlendirmeSonucu <= 100) && true

        return newInfo

      })
    }

  }



  //! MEVCUT VERİLERİN DEĞİŞTİRİLMESİ İÇİN MANUEL OLARAK TETİKLENEN FONKSİYON BLOĞUDUR
  // const handleCalistir = (e) => {

  //   let updates = []; // Güncellenen kayıtları saklamak için bir dizi.

  //   personelChanceData.forEach((newPerson) => {
  //     // Sicil numarasına göre mevcut performans verisini bul.
  //     let index = all_performanceData.findIndex(performance => performance.sicilNo == newPerson["Sicil No"]);

  //     // Eğer eşleşme varsa, final_degerlendirmeSonucu'nu güncelle.
  //     if (index !== -1) {
  //       let updatedRecord = { ...all_performanceData[index] }; // Güncellenecek kaydın bir kopyasını al.
  //       updatedRecord.final_degerlendirmeSonucu = newPerson.newScore.toString(); // Güncelleme yap.


  //       //! update tetikle
  //       // put_performanceData('manager-evaluation', updatedRecord)

  //       updates.push(updatedRecord); // Güncellenen kaydı updates dizisine ekle.
  //     }
  //   });

  //   // Yalnızca güncellenen kayıtları içeren diziyi state'e ata.
  //   setUpdatedRecords(updates);

  

  // }

  

  return (
    <div style={reportPageBgStyle}>



      <Typography variant='h6' align='center' pt={10} letterSpacing={5} fontWeight={700} color={'red'}>Yönetici Değerlendirme Sonuçları</Typography>

      {/* //! MEVCUT VERİLERİN DEĞİŞTİRİLMESİ İÇİN MANUEL OLARAK TETİKLENEN BUTTON */}
      {/* <Button onClick={handleCalistir}>Çalıştır</Button> */}

      <PerformanceResult_Table_BY guncellenmisPerformanceData={guncellenmisPerformanceData} handleOpen={handleOpen} setInfo={setInfo} info={info} HandleOpen_delete={HandleOpen_delete} HandleOpen_editPage={HandleOpen_editPage} />


      <PerformanceResultView_HR handleClose={handleClose} info={info} open={open} />

      <DeleteModal Open_delete={Open_delete} HandleClose_delete={HandleClose_delete} info={info} setInfo={setInfo} />

      <PerformanceUpdate info={info} open_editPage={open_editPage} handleClose_editPage={handleClose_editPage} handleChange={handleChange} />

    </div>
  )
}

export default ManagerReports