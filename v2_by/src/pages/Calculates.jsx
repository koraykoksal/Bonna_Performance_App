import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import usePerformanceCall from '../hooks/usePerformanceCall'
import useAuthCall from '../hooks/useAuthCall'
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import AllResults_Table from '../components/tables/AllResults_Table'
import AllReults_GraphicData from '../components/tables/AllReults_GraphicData'
import { toastWarnNotify } from '../helper/ToastNotify'

const Calculates = () => {

  const { twiserLogin } = useAuthCall()
  const { get_raiseData, get_All_PerformanceData, get_beyazYaka_performanceData, getBonnaPersonels } = usePerformanceCall()
  const { all_performanceData, byOkrPerformance, raiseData, bonnaPersonels } = useSelector((state) => state.performance)
  const { twiserAccesToken } = useSelector((state) => state.auth)
  const [zamData, setZamData] = useState([])

  const currentYear = new Date().getFullYear()

  const [myGuncellenmisPerformanceData, setMyGuncellenmisPerformanceData] = useState([]);
  const [byGuncellenmisPerformanceData, setByGuncellenmisPerformanceData] = useState([]);

  const [myCalculatedData, setMyCalculatedData] = useState([])
  const [byCalculatedData, setByCalculatedData] = useState([])

  const [combinedData, setCombinedData] = useState([])

  //! performans dönemini açıklamasını göster
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


  //! zam oranı ve yönetici performans değerlendirme sonuçlarını çek
  // zam oranları bilgisini çek
  // mavi yaka performans sonuçlarını çek
  // bonna personel verisini çek
  useEffect(() => {
    get_raiseData('raise-data') // zam oranları bilgisini çek
    get_All_PerformanceData('manager-evaluation') // mavi yaka performans sonuçlarını çek
    getBonnaPersonels() // bonna personel verisini çek

    if (!twiserAccesToken) {
      twiserLogin()
    }
  }, [])


  //! current year zam oranı
  useEffect(() => {

    const data = Object.values(raiseData);
    const lastData = data.find(item => item.raiseYear === currentYear);

    setZamData(lastData)

  }, [raiseData])


  //! beyaz yaka okr sonuçlarını al
  // beyaz yaka okr sonuçlarını çek
  useEffect(() => {
    if (twiserAccesToken) {
      get_beyazYaka_performanceData(); // beyaz yaka okr sonuçlarını çek
    }
  }, [twiserAccesToken]);



  //! Performans değerlendirmesi açıklamasını belirleyen fonksiyon
  const getPerformanceDescription = (score) => {
    if (score > 0 && score <= 40) return "Beklentiyi Karşılamıyor 😩";
    if (score > 40 && score <= 60) return "Beklentilerin Altında 🥺";
    if (score > 60 && score <= 80) return "Beklenen Performans 😑";
    if (score > 80 && score <= 90) return "Beklentilerin Üzerinde 😀";
    if (score > 90 && score <= 100) return "Üstün Performans 🥳";
    return "";
  };



  //! ortak hesaplama fonksiyonu
  const calculateSalary = (sonuc, mevcutUcret, zamData, yakaTipi) => {
    let scale = ""
    let standartRaise = ""
    let performanceRaise = ""
    let totalRaise = ""
    let nextSallary = ""
    let fark = ""

    if (sonuc > 0 && sonuc <= 40) scale = "1", standartRaise = zamData.s1_myZam, performanceRaise = zamData.s1_perZam, totalRaise = Number(zamData.s1_myZam) + Number(zamData.s1_perZam), fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2), nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
    else if (sonuc > 40 && sonuc <= 60) scale = "2", standartRaise = zamData.s2_myZam, performanceRaise = zamData.s2_perZam, totalRaise = Number(zamData.s2_myZam) + Number(zamData.s2_perZam), fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2), nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
    else if (sonuc > 60 && sonuc <= 80) scale = "3", standartRaise = zamData.s3_myZam, performanceRaise = zamData.s3_perZam, totalRaise = Number(zamData.s3_myZam) + Number(zamData.s3_perZam), fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2), nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
    else if (sonuc > 80 && sonuc <= 90) scale = "4", standartRaise = zamData.s4_myZam, performanceRaise = zamData.s4_perZam, totalRaise = Number(zamData.s4_myZam) + Number(zamData.s4_perZam), fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2), nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
    else if (sonuc > 90 && sonuc <= 100) scale = "5", standartRaise = zamData.s5_myZam, performanceRaise = zamData.s5_perZam, totalRaise = Number(zamData.s5_myZam) + Number(zamData.s5_perZam), fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2), nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)


    return { scale, standartRaise, performanceRaise, totalRaise, addedSalary: fark, nextSallary, yakaTipi };
  };


  //myGüncellenmiş Data
  //! yönetici değerlendirme datası current yıla eşit ve değerlendirme aciklaması eşit olan (all_performanceData) final_degerlendirme sonucunu kontrol et ve güncelle
  useEffect(() => {

    const donemAciklamasi = evulationInfo()

    const myGuncellenmisData = all_performanceData
      .filter(element => element.degerlendirmeYili === currentYear && element.degerlendirmeDonemiAciklama === donemAciklamasi)
      .map(item => {

        const sonuc = parseFloat(item.final_degerlendirmeSonucu);
        const aciklama = getPerformanceDescription(sonuc);

        const personel = bonnaPersonels.find(person => person.TCKIMLIKNO == item.tcNo)

        const lokasyon = personel ? personel.LOKASYON : "Bilinmiyor";

        return {
          ...item,
          final_degerlendirmeAciklamasi: aciklama,
          lokasyon
        };
      });

    setMyGuncellenmisPerformanceData(myGuncellenmisData);

  }, [all_performanceData])



  //byGüncellenmiş Data
  //! beyaz yaka değerlendirmesi için beyaz yaka okr sonuçlarını işle
  useEffect(() => {

    const byGuncellenmisData = byOkrPerformance.map(item => {

      const managerScore = parseFloat(item.ManagerScore);
      const aciklama = getPerformanceDescription(managerScore);

      const personel = bonnaPersonels.find(person => person.PERSID == item.UserEmployeeNo) || {}

      const name = personel && personel.NAME ? personel.NAME : "Bilinmiyor";
      const surname = personel && personel.SURNAME ? personel.SURNAME : "Bilinmiyor";
      const nameSurname = `${name} ${surname}`;
      const lokasyon = personel && personel.LOKASYON ? personel.LOKASYON : "Bilinmiyor";
      const maas = personel && personel.MAAS ? personel.MAAS : "0";
      const sicilNo = personel && personel.PERSID ? personel.PERSID : "Bilinmiyor";
      const ustBirim = personel && personel.USTBIRIMACIKLAMA ? personel.USTBIRIMACIKLAMA : "Bilinmiyor";
      const birim = personel && personel.BIRIMACIKLAMA ? personel.BIRIMACIKLAMA : "Bilinmiyor";
      const bolum = personel && personel.DEPARTMANACIKLAMA ? personel.DEPARTMANACIKLAMA : "Bilinmiyor";
      const gorev = personel && personel.GOREVACIKLAMA ? personel.GOREVACIKLAMA : "Bilinmiyor";
      const yonetici = personel && personel.YONETICI ? personel.YONETICI : "Bilinmiyor";
      const iseGirisTarih = personel && personel.GIRISTARIHI ? personel.GIRISTARIHI : "Bilinmiyor";


      return {
        ...item, final_degerlendirmeAciklamasi: aciklama,
        personel: nameSurname,
        lokasyon,
        maas,
        sicilNo,
        ustBirim,
        birim,
        bolum,
        gorev,
        yonetici,
        iseGirisTarih
      };

    });

    setByGuncellenmisPerformanceData(byGuncellenmisData);

  }, [byOkrPerformance])




  //! zam oranları ve skala bilgisini hesapla
  const handleCalculate = (e) => {
    e.preventDefault()

    // Mavi yaka çalışanları için hesaplama
    const myData = myGuncellenmisPerformanceData.map(item => {
      const result = calculateSalary(
        parseFloat(item.final_degerlendirmeSonucu),
        parseFloat(item.currentSallary),
        zamData,
        "Mavi"
      );

      return { ...item, ...result };
    });

    // Beyaz yaka çalışanları için hesaplama
    const byData = byGuncellenmisPerformanceData.map(item => {
      const result = calculateSalary(
        parseFloat(item.ManagerScore),
        parseFloat(item.maas),
        zamData,
        "Beyaz"
      );

      return { ...item, ...result };
    });

    setMyCalculatedData(myData);
    setByCalculatedData(byData);


    // const myData = myGuncellenmisPerformanceData.map(item => {
    //   const sonuc = parseFloat(item.final_degerlendirmeSonucu);
    //   const mevcutUcret = parseFloat(item.currentSallary)
    //   let scale = ""
    //   let standartRaise = ""
    //   let performanceRaise = ""
    //   let totalRaise = ""
    //   let nextSallary = ""
    //   let fark = ""
    //   let yakaTipi = "Mavi"

    //   if (sonuc > 0 && sonuc <= 40) scale = "1", standartRaise = zamData.s1_myZam, performanceRaise = zamData.s1_perZam, totalRaise = Number(zamData.s1_myZam) + Number(zamData.s1_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)
    //   else if (sonuc > 40 && sonuc <= 60) scale = "2", standartRaise = zamData.s2_myZam, performanceRaise = zamData.s2_perZam, totalRaise = Number(zamData.s2_myZam) + Number(zamData.s2_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)
    //   else if (sonuc > 60 && sonuc <= 80) scale = "3", standartRaise = zamData.s3_myZam, performanceRaise = zamData.s3_perZam, totalRaise = Number(zamData.s3_myZam) + Number(zamData.s3_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)
    //   else if (sonuc > 80 && sonuc <= 90) scale = "4", standartRaise = zamData.s4_myZam, performanceRaise = zamData.s4_perZam, totalRaise = Number(zamData.s4_myZam) + Number(zamData.s4_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)
    //   else if (sonuc > 90 && sonuc <= 100) scale = "5", standartRaise = zamData.s5_myZam, performanceRaise = zamData.s5_perZam, totalRaise = Number(zamData.s5_myZam) + Number(zamData.s5_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)

    //   // return { ...item, skala: scale, standartZam: standartRaise, performansZam: performanceRaise, toplamZam: totalRaise, eklenenUcret: fark, yeniUcret: nextSallary, grup: yakaTipi }
    //   return { ...item, scale, standartRaise, performanceRaise, totalRaise, addedSalary:fark, nextSallary, yakaTipi }
    // })

    // const byData = byGuncellenmisPerformanceData.map(item => {
    //   const sonuc = parseFloat(item.ManagerScore);
    //   const mevcutUcret = parseFloat(item.maas)
    //   let scale = ""
    //   let standartRaise = ""
    //   let performanceRaise = ""
    //   let totalRaise = ""
    //   let nextSallary = ""
    //   let fark = ""
    //   let yakaTipi = "Beyaz"

    //   if (sonuc > 0 && sonuc <= 40) scale = "1", standartRaise = zamData.s1_myZam, performanceRaise = zamData.s1_perZam, totalRaise = Number(zamData.s1_myZam) + Number(zamData.s1_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)
    //   else if (sonuc > 40 && sonuc <= 60) scale = "2", standartRaise = zamData.s2_myZam, performanceRaise = zamData.s2_perZam, totalRaise = Number(zamData.s2_myZam) + Number(zamData.s2_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)
    //   else if (sonuc > 60 && sonuc <= 80) scale = "3", standartRaise = zamData.s3_myZam, performanceRaise = zamData.s3_perZam, totalRaise = Number(zamData.s3_myZam) + Number(zamData.s3_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)
    //   else if (sonuc > 80 && sonuc <= 90) scale = "4", standartRaise = zamData.s4_myZam, performanceRaise = zamData.s4_perZam, totalRaise = Number(zamData.s4_myZam) + Number(zamData.s4_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)
    //   else if (sonuc > 90 && sonuc <= 100) scale = "5", standartRaise = zamData.s5_myZam, performanceRaise = zamData.s5_perZam, totalRaise = Number(zamData.s5_myZam) + Number(zamData.s5_perZam), fark = (Number(mevcutUcret) * Number(totalRaise)) / 100, nextSallary = Number(mevcutUcret) + Number(fark)

    //   // return { ...item, skala: scale, standartZam: standartRaise, performansZam: performanceRaise, toplamZam: totalRaise, eklenenUcret: fark, yeniUcret: nextSallary, grup: yakaTipi }
    //   return { ...item, scale, standartRaise, performanceRaise, totalRaise, addedSalary:fark, nextSallary, yakaTipi  }
    // })

    // setMyCalculatedData(myData)
    // setByCalculatedData(byData)

  }



  //! by ve my array datasını birleştir
  useEffect(() => {

    const myArrayData1 = myCalculatedData.map((item, index) => ({ id: index, sicilNo: item.sicilNo, iseGirisTarih: item.iseGirisTarih, lokasyon: item.lokasyon, personel: item.personel, ustBirim: item.ustBirim, birim: item.birim, bolum: item.bolum, gorev: item.gorev, yonetici: item.yonetici, grup: item.yakaTipi, skala: item.scale, final_degerlendirmeSonucu: item.final_degerlendirmeSonucu, final_degerlendirmeAciklamasi: item.final_degerlendirmeAciklamasi, standartZam: item.standartRaise, performansZam: item.performanceRaise, toplamZam: item.totalRaise, currentSallary: item.currentSallary, eklenenUcret: item.addedSalary, yeniUcret: item.nextSallary }))

    const byArrayData1 = byCalculatedData.map((item, index) => ({ id: index, sicilNo: item.sicilNo, iseGirisTarih: item.iseGirisTarih, lokasyon: item.lokasyon, personel: item.personel, ustBirim: item.ustBirim, birim: item.birim, bolum: item.bolum, gorev: item.gorev, yonetici: item.yonetici, grup: item.yakaTipi, skala: item.scale, final_degerlendirmeSonucu: item.ManagerScore, final_degerlendirmeAciklamasi: item.final_degerlendirmeAciklamasi, standartZam: item.standartRaise, performansZam: item.performanceRaise, toplamZam: item.totalRaise, currentSallary: item.maas, eklenenUcret: item.addedSalary, yeniUcret: item.nextSallary }))

    //! burada her bir dataya benzersir bir id değeri atanmalıdır yoksa dataGrid elementinde ay data iki kere görünecektir
    const combinedArray = [...myArrayData1, ...byArrayData1].map((item, index) => ({
      ...item,
      id: index // Her bir öğeye benzersiz bir id atama
    }));

    setCombinedData(combinedArray)

  }, [myCalculatedData, byCalculatedData])



  //! hesaplama işlemini yap
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!myCalculatedData.length > 0) {
      toastWarnNotify('Hesaplanmış veri seti yok !')
    }
  }



  // const res = byGuncellenmisPerformanceData.filter(item=>item.ustBirim == 'Bilinmiyor').map(data=>{
  //   return{
  //     personel:data.UserFullName,
  //     UserEmployeeNo : data.UserEmployeeNo,
  //     sicilNo:data.sicilNo,

  //   }

  // })




  return (
    <div>

      <Box display={'flex'} flexDirection={'column'} gap={3}>

        <Typography variant='h6' align='center' mt={12} mb={5} letterSpacing={5} fontWeight={700} color={'red'}>Tüm Değerlendirme ve Hesaplama Sonuçları</Typography>


        <Typography variant='subtitle' align='center' color={'black'}>Tüm hesaplamalar güncel zam oranı bilgilerine göre yapılacaktır.</Typography>



        {
          myGuncellenmisPerformanceData.length > 0 && byGuncellenmisPerformanceData.length > 0 ?
            (
              <Container sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 3 }}>
                <Button variant='contained' onClick={handleCalculate}>Hesaplama Yap</Button>
                <Button variant='outlined' onClick={handleSubmit}>Kaydet</Button>
              </Container>
            )
            :
            (
              ""
            )
        }

      </Box>

      <AllResults_Table combinedData={combinedData} />

      <AllReults_GraphicData myCalculatedData={myCalculatedData} byCalculatedData={byCalculatedData} />

    </div>
  )
}

export default Calculates