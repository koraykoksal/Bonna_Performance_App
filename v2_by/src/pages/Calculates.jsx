import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import usePerformanceCall from '../hooks/usePerformanceCall'
import useAuthCall from '../hooks/useAuthCall'
import { Box, Typography, Container, Grid, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import AllResults_Table from '../components/tables/AllResults_Table'
import AllReults_GraphicData from '../components/tables/AllReults_GraphicData'
import { toastWarnNotify } from '../helper/ToastNotify'
import { bonnaYears } from '../helper/data'
import CircularProgress from '@mui/material/CircularProgress';
import { element } from 'prop-types'


const Calculates = () => {

  const { twiserLogin } = useAuthCall()
  const {
    get_experienceData,
    get_raiseData,
    get_All_PerformanceData,
    get_beyazYaka_performanceData,
    getBonnaPersonels
  } = usePerformanceCall()

  const { all_performanceData, byOkrPerformance, raiseData, bonnaPersonels, experienceData } = useSelector((state) => state.performance)
  const { twiserAccesToken } = useSelector((state) => state.auth)
  const [zamData, setZamData] = useState([])
  const [kidemData, setKidemData] = useState([])

  const [status, setStatus] = useState(true)

  const currentYear = new Date().getFullYear()

  const [myGuncellenmisPerformanceData, setMyGuncellenmisPerformanceData] = useState([]);
  const [byGuncellenmisPerformanceData, setByGuncellenmisPerformanceData] = useState([]);

  const [myCalculatedData, setMyCalculatedData] = useState([])
  const [byCalculatedData, setByCalculatedData] = useState([])

  const [combinedData, setCombinedData] = useState([])

  const [info, setInfo] = useState({
    year: ""
  })


  //! zam oranı ve yönetici performans değerlendirme sonuçlarını çek
  // zam oranları bilgisini çek
  // mavi yaka performans sonuçlarını çek
  // bonna personel verisini çek
  // kıdem oranları bilgisini çek

  useEffect(() => {
    //? BONNA PERSONEL BİLGİSİ ŞUANDA 2023 YILI VERİSİNE GÖRE GELİYOR (HOOKS TARAFINDA KONTROL ET)
    getBonnaPersonels(info.year ? info.year : currentYear) // bonna personel verisini çek
    get_raiseData('raise-data') // zam oranları bilgisini çek
    get_experienceData('experience-data') // kıdem oranları bilgisini çek
    get_All_PerformanceData('manager-evaluation') // mavi yaka performans sonuçlarını çek
  }, [])


  //! zam oranlarını ve kıdem oranlarını array formatına çevir
  useEffect(() => {

    const sallaryData = Object.values(raiseData);
    const kidemOrani = Object.values(experienceData)

    const lastSallaryData = sallaryData.find(item => item.raiseYear === currentYear);
    const lastKidemOrani = kidemOrani.find(item => item.raiseYear === currentYear)

    setZamData(lastSallaryData)
    setKidemData(lastKidemOrani)

  }, [raiseData, experienceData])


  //! beyaz yaka okr sonuçlarını al
  // beyaz yaka okr sonuçlarını çek
  useEffect(() => {
    if (twiserAccesToken) {
      get_beyazYaka_performanceData(); // beyaz yaka okr sonuçlarını çek
    }
  }, [twiserAccesToken]);



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
  const calculateSalary = (sonuc, mevcutUcret, zamData, yakaTipi, kidem) => {

    let scale = ""
    let standartRaise = ""
    let performanceRaise = ""
    let totalRaise = ""
    let nextSallary = ""
    let fark = ""
    let kidemOrani = kidem

    if (yakaTipi == "Mavi") {

      if (sonuc >= 0 && sonuc <= 40) {

        scale = "1"
        standartRaise = zamData.s1_myZam
        performanceRaise = zamData.s1_perZam
        totalRaise = Number(zamData.s1_myZam) + Number(zamData.s1_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)

      }
      else if (sonuc > 40 && sonuc <= 60) {
        scale = "2"
        standartRaise = zamData.s2_myZam
        performanceRaise = zamData.s2_perZam
        totalRaise = Number(zamData.s2_myZam) + Number(zamData.s2_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }

      else if (sonuc > 60 && sonuc <= 80) {
        scale = "3"
        standartRaise = zamData.s3_myZam
        performanceRaise = zamData.s3_perZam
        totalRaise = Number(zamData.s3_myZam) + Number(zamData.s3_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }

      else if (sonuc > 80 && sonuc <= 90) {
        scale = "4"
        standartRaise = zamData.s4_myZam
        performanceRaise = zamData.s4_perZam
        totalRaise = Number(zamData.s4_myZam) + Number(zamData.s4_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }

      else if (sonuc > 90 && sonuc <= 100) {
        scale = "5"
        standartRaise = zamData.s5_myZam
        performanceRaise = zamData.s5_perZam
        totalRaise = Number(zamData.s5_myZam) + Number(zamData.s5_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }



    }
    else {
      if (sonuc >= 0 && sonuc <= 40) {
        scale = "1"
        standartRaise = zamData.s1_byZam
        performanceRaise = zamData.s1_perZam
        totalRaise = Number(zamData.s1_byZam) + Number(zamData.s1_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }

      else if (sonuc > 40 && sonuc <= 60) {
        scale = "2"
        standartRaise = zamData.s2_byZam
        performanceRaise = zamData.s2_perZam
        totalRaise = Number(zamData.s2_byZam) + Number(zamData.s2_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }

      else if (sonuc > 60 && sonuc <= 80) {
        scale = "3"
        standartRaise = zamData.s3_byZam
        performanceRaise = zamData.s3_perZam
        totalRaise = Number(zamData.s3_byZam) + Number(zamData.s3_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }

      else if (sonuc > 80 && sonuc <= 90) {
        scale = "4"
        standartRaise = zamData.s4_byZam
        performanceRaise = zamData.s4_perZam
        totalRaise = Number(zamData.s4_byZam) + Number(zamData.s4_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }

      else if (sonuc > 90 && sonuc <= 100) {
        scale = "5"
        standartRaise = zamData.s5_byZam
        performanceRaise = zamData.s5_perZam
        totalRaise = Number(zamData.s5_byZam) + Number(zamData.s5_perZam) + Number(kidemOrani)
        fark = ((Number(mevcutUcret) * Number(totalRaise)) / 100).toFixed(2)
        nextSallary = (Number(mevcutUcret) + Number(fark)).toFixed(2)
      }
    }

    return { scale, standartRaise, performanceRaise, totalRaise, addedSalary: fark, nextSallary, yakaTipi, kidemOrani };
  };

  //! kidem oranlarını getir
  const calculateKidem = (data) => {

    if (data >= 0 && data <= 2) {
      return kidemData?.ky_sifiriki
    }
    else if (data > 2 && data <= 5) {
      return kidemData?.ky_ikibes
    }
    else if (data > 5 && data <= 10) {
      return kidemData?.ky_beson
    }
    else if (data > 10) {
      return kidemData?.ky_onplus
    }

  }



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

        // personelin işe giriş yılını bul
        const girisYili = personel?.GIRISTARIHI.substring(6, 10);
        // current yıl bilgisinden personelin giriş tarihini çıkar kıdem oranını bul
        const kidemYili = Number(currentYear) - Number(girisYili) || 0

        const kidemOrani = calculateKidem(kidemYili)


        return {
          ...item,
          final_degerlendirmeAciklamasi: aciklama,
          lokasyon,
          kidemOrani
        };
      });

    setMyGuncellenmisPerformanceData(myGuncellenmisData);

  }, [all_performanceData, bonnaPersonels])




  useEffect(() => {
    const byGuncellenmisData = byOkrPerformance.reduce((acc, item) => {
      const managerScore = parseFloat(item.ManagerScore);
      const aciklama = getPerformanceDescription(managerScore);

      const personel = bonnaPersonels.find(person => person.PERSID === item.UserEmployeeNo);

      // Eğer personel bulunursa, işleme devam et
      if (personel) {
        const {
          NAME = "Bilinmiyor",
          SURNAME = "Bilinmiyor",
          LOKASYON = "Bilinmiyor",
          MAAS = "0",
          PERSID = "Bilinmiyor",
          USTBIRIMACIKLAMA = "Bilinmiyor",
          BIRIMACIKLAMA = "Bilinmiyor",
          DEPARTMANACIKLAMA = "Bilinmiyor",
          GOREVACIKLAMA = "Bilinmiyor",
          YONETICI = "Bilinmiyor",
          GIRISTARIHI = "Bilinmiyor",
        } = personel;

        const nameSurname = `${NAME} ${SURNAME}`;
        const birim = BIRIMACIKLAMA.replace(/&amp;/g, '&');

        const girisYili = GIRISTARIHI.substring(6, 10);
        const kidemYili = Number(currentYear) - Number(girisYili) || 0;
        const kidemOrani = calculateKidem(kidemYili);

        // Bulunan personel için nesneyi accumulator'a ekle
        acc.push({
          ...item,
          final_degerlendirmeAciklamasi: aciklama,
          personel: nameSurname,
          lokasyon: LOKASYON,
          maas: MAAS,
          sicilNo: PERSID,
          ustBirim: USTBIRIMACIKLAMA,
          birim,
          bolum: DEPARTMANACIKLAMA,
          gorev: GOREVACIKLAMA,
          yonetici: YONETICI,
          iseGirisTarih: GIRISTARIHI,
          kidemOrani
        });
      }

      return acc;
    }, []);

    setByGuncellenmisPerformanceData(byGuncellenmisData);
  }, [byOkrPerformance, bonnaPersonels]);



  //byGüncellenmiş Data
  //! beyaz yaka değerlendirmesi için beyaz yaka okr sonuçlarını işle
  // useEffect(() => {

  //   const byGuncellenmisData = byOkrPerformance.map(item => {

  //     const managerScore = parseFloat(item.ManagerScore);
  //     const aciklama = getPerformanceDescription(managerScore);

  //     const personel = bonnaPersonels.find(person => person.PERSID == item.UserEmployeeNo) || {}

  //     const {
  //       NAME = "Bilinmiyor",
  //       SURNAME = "Bilinmiyor",
  //       LOKASYON = "Bilinmiyor",
  //       MAAS = "0",
  //       PERSID = "Bilinmiyor",
  //       USTBIRIMACIKLAMA = "Bilinmiyor",
  //       BIRIMACIKLAMA = "Bilinmiyor",
  //       DEPARTMANACIKLAMA = "Bilinmiyor",
  //       GOREVACIKLAMA = "Bilinmiyor",
  //       YONETICI = "Bilinmiyor",
  //       GIRISTARIHI = "Bilinmiyor",
  //     } = personel;


  //     const nameSurname = `${NAME} ${SURNAME}`;
  //     const birim = BIRIMACIKLAMA.replace(/&amp;/g, '&');

  //     // İşe giriş tarihi ve kıdem yılı hesaplamaları
  //     const girisYili = GIRISTARIHI.substring(6, 10);
  //     const kidemYili = Number(currentYear) - Number(girisYili) || 0;
  //     const kidemOrani = calculateKidem(kidemYili);


  //     return {
  //       ...item,
  //       final_degerlendirmeAciklamasi: aciklama,
  //       personel: nameSurname,
  //       lokasyon: LOKASYON,
  //       maas: MAAS,
  //       sicilNo: PERSID,
  //       ustBirim: USTBIRIMACIKLAMA,
  //       birim,
  //       bolum: DEPARTMANACIKLAMA,
  //       gorev: GOREVACIKLAMA,
  //       yonetici: YONETICI,
  //       iseGirisTarih: GIRISTARIHI,
  //       kidemOrani
  //     };

  //   });



  //   setByGuncellenmisPerformanceData(byGuncellenmisData);

  // }, [byOkrPerformance, bonnaPersonels])





  //! by ve my array datasını birleştir
  useEffect(() => {

    const myArrayData1 = myCalculatedData.map((item, index) => ({ id: index, sicilNo: item.sicilNo, iseGirisTarih: item.iseGirisTarih, lokasyon: item.lokasyon, personel: item.personel, ustBirim: item.ustBirim, birim: item.birim, bolum: item.bolum, gorev: item.gorev, yonetici: item.yonetici, grup: item.yakaTipi, skala: item.scale, final_degerlendirmeSonucu: item.final_degerlendirmeSonucu, final_degerlendirmeAciklamasi: item.final_degerlendirmeAciklamasi, standartZam: item.standartRaise, performansZam: item.performanceRaise, toplamZam: item.totalRaise, currentSallary: item.currentSallary, eklenenUcret: item.addedSalary, yeniUcret: item.nextSallary, kidemOrani: item.kidemOrani }))

    const byArrayData1 = byCalculatedData.map((item, index) => ({ id: index, sicilNo: item.sicilNo, iseGirisTarih: item.iseGirisTarih, lokasyon: item.lokasyon, personel: item.personel, ustBirim: item.ustBirim, birim: item.birim, bolum: item.bolum, gorev: item.gorev, yonetici: item.yonetici, grup: item.yakaTipi, skala: item.scale, final_degerlendirmeSonucu: item.ManagerScore, final_degerlendirmeAciklamasi: item.final_degerlendirmeAciklamasi, standartZam: item.standartRaise, performansZam: item.performanceRaise, toplamZam: item.totalRaise, currentSallary: item.maas, eklenenUcret: item.addedSalary, yeniUcret: item.nextSallary, kidemOrani: item.kidemOrani }))

    //! burada her bir dataya benzersir bir id değeri atanmalıdır yoksa dataGrid elementinde ay data iki kere görünecektir
    const combinedArray = [...myArrayData1, ...byArrayData1].map((item, index) => ({
      ...item,
      id: index // Her bir öğeye benzersiz bir id atama
    }));

    setCombinedData(combinedArray)

  }, [myCalculatedData, byCalculatedData])




  //! zam oranları ve skala bilgisini hesapla
  const handleCalculate = (e) => {

    e.preventDefault()


    //? select den gelen veriye göre personel bilgisini çek
    // getBonnaPersonels(info.year ? info.year : currentYear)


    // Beyaz yaka çalışanları için hesaplama
    const byData = byGuncellenmisPerformanceData.map(item => {

      const kidem = item?.kidemOrani

      const result = calculateSalary(
        parseFloat(item.ManagerScore),
        parseFloat(item.maas),
        zamData,
        "Beyaz",
        kidem
      );

      return { ...item, ...result };
    });

    // Mavi yaka çalışanları için hesaplama
    const myData = myGuncellenmisPerformanceData.map(item => {

      const kidem = item?.kidemOrani

      const result = calculateSalary(
        parseFloat(item.final_degerlendirmeSonucu),
        parseFloat(item.currentSallary),
        zamData,
        "Mavi",
        kidem
      );

      return { ...item, ...result };
    });

    setMyCalculatedData(myData);
    setByCalculatedData(byData);

  }



  //! hesaplama işlemini yap
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!myCalculatedData.length > 0) {
      toastWarnNotify('Hesaplanmış veri seti yok !')
    }
  }


  const byGuncellenmisData = byOkrPerformance.map(item => {

    const personel = bonnaPersonels.find(person => person.PERSID !== item.UserEmployeeNo)


    // console.log(personel)

    // const {
    //   NAME = "Bilinmiyor",
    //   SURNAME = "Bilinmiyor",
    //   LOKASYON = "Bilinmiyor",
    //   MAAS = "0",
    //   PERSID = "Bilinmiyor",
    //   USTBIRIMACIKLAMA = "Bilinmiyor",
    //   BIRIMACIKLAMA = "Bilinmiyor",
    //   DEPARTMANACIKLAMA = "Bilinmiyor",
    //   GOREVACIKLAMA = "Bilinmiyor",
    //   YONETICI = "Bilinmiyor",
    //   GIRISTARIHI = "Bilinmiyor",
    // } = personel;


  })


  const personelOKR = byOkrPerformance.find(person => person.UserEmployeeNo == "3204")
  const personel = bonnaPersonels.find(person => person.NAME == "ADEM" && person.SURNAME == "VAROL")

  // console.log(personelOKR)



  return (
    <div>

      <Box display={'flex'} flexDirection={'column'} gap={3}>

        <Typography variant='h6' align='center' mt={12} mb={5} letterSpacing={5} fontWeight={700} color={'red'}>Tüm Değerlendirme ve Hesaplama Sonuçları</Typography>

        {/* <Typography variant='subtitle' align='center' color={'black'}>Hesaplama yapmak için ücret yılını seçiniz.</Typography> */}

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }} component={'form'} onSubmit={handleCalculate}>

          {/* <FormControl style={{ width: '150px' }}>
            <InputLabel id="year">Year</InputLabel>
            <Select
              required
              id='year'
              name='year'
              labelId='year'
              label='year'
              value={info.year}
              onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
            >
              {
                bonnaYears.map((item, index) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))
              }
            </Select>
          </FormControl> */}

          {
            myGuncellenmisPerformanceData.length > 0 && byGuncellenmisPerformanceData.length > 0 ?
              (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                  <Button variant='contained' type='submit'>Hesaplama Yap</Button>
                  {/* <Button variant='outlined' onClick={handleSubmit}>Kaydet</Button> */}
                </Box>
              )
              :
              (
                ""
              )
          }



        </Box>




      </Box>

      <AllResults_Table combinedData={combinedData} />

      <AllReults_GraphicData myCalculatedData={myCalculatedData} byCalculatedData={byCalculatedData} />

    </div>
  )
}

export default Calculates