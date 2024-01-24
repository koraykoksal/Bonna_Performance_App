import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import usePerformanceCall from '../hooks/usePerformanceCall'
import useAuthCall from '../hooks/useAuthCall'
import { Box, Typography, Container, Grid, Button } from "@mui/material"
import AllResults_Table from '../components/tables/AllResults_Table'

const AllResults = () => {

  const { twiserLogin } = useAuthCall()
  const { get_raiseData, get_All_PerformanceData, get_beyazYaka_performanceData } = usePerformanceCall()
  const { all_performanceData, byOkrPerformance, raiseData } = useSelector((state) => state.performance)
  const { twiserAccesToken } = useSelector((state) => state.auth)
  const currentYear = new Date().getFullYear()
  const [zamData, setZamData] = useState([])
  const [guncellenmisPerformanceData, setGuncellenmisPerformanceData] = useState([]);

  const [myCalculatedData, setMyCalculatedData] = useState([])

  //* zam oranı ve yönetici performans değerlendirme sonuçlarını çek
  useEffect(() => {
    get_raiseData('raise-data')
    get_All_PerformanceData('manager-evaluation')

    if (!twiserAccesToken) {
      twiserLogin()
    }
  }, [])


  //* beyaz yaka okr sonuçlarını al
  useEffect(() => {
    get_beyazYaka_performanceData()
  }, [twiserAccesToken])


  //* zam oranı bilgisininde son kayıt edilen (current yıl değeri) zam oranı bilgisini çek
  useEffect(() => {

    if (!raiseData || raiseData.length === 0) {
      console.log("raiseData boş veya tanımlı değil.");
      return;
    }

    const data = Object.values(raiseData);
    const lastData = data.find(item => item.raiseYear === currentYear);

    if (!lastData) {
      console.log(`raiseYear değeri ${currentYear} olan bir veri bulunamadı.`);
      return;
    }

    setZamData(lastData);

  }, [raiseData])


  //! yönetici değerlendirme datası (all_performanceData) final_degerlendirme sonucunu kontrol et ve güncelle
  useEffect(() => {

    const guncellenmisData = all_performanceData.map(item => {
      const sonuc = parseFloat(item.final_degerlendirmeSonucu);

      let aciklama = "";
      if (sonuc > 0 && sonuc <= 40) aciklama = "Beklentiyi Karşılamıyor 😩";
      else if (sonuc > 40 && sonuc <= 60) aciklama = "Beklentilerin Altında 🥺";
      else if (sonuc > 60 && sonuc <= 80) aciklama = "Beklenen Performans 😑";
      else if (sonuc > 80 && sonuc <= 90) aciklama = "Beklentilerin Üzerinde 😀";
      else if (sonuc > 90 && sonuc <= 100) aciklama = "Üstün Performans 🥳";

      return { ...item, final_degerlendirmeAciklamasi: aciklama };
    });

    // Gerekiyorsa bu sonucu başka bir state'e atayabilirsiniz.
    setGuncellenmisPerformanceData(guncellenmisData);

  }, [all_performanceData])


  //! zam oranları ve skala bilgisini hesapla
  const handleCalculate = (e) => {
    e.preventDefault()

    const myData = guncellenmisPerformanceData.map(item=>{
      const sonuc = parseFloat(item.final_degerlendirmeSonucu);
      const mevcutUcret = parseFloat(item.currentSallary)
      let scale=""
      let standartRaise=""
      let performanceRaise=""
      let totalRaise=""
      let nextSallary=""
      let fark=""

      if (sonuc > 0 && sonuc <= 40) scale = "1" , standartRaise=zamData.s1_myZam , performanceRaise=zamData.s1_perZam, totalRaise=Number(zamData.s1_myZam) + Number(zamData.s1_perZam), fark=(Number(mevcutUcret)*Number(totalRaise)) / 100, nextSallary=Number(mevcutUcret) + Number(fark)
      else if (sonuc > 40 && sonuc <= 60) scale = "2" , standartRaise=zamData.s2_myZam , performanceRaise=zamData.s2_perZam, totalRaise=Number(zamData.s2_myZam) + Number(zamData.s2_perZam), fark=(Number(mevcutUcret)*Number(totalRaise)) / 100, nextSallary=Number(mevcutUcret) + Number(fark)
      else if (sonuc > 60 && sonuc <= 80) scale = "3" , standartRaise=zamData.s3_myZam , performanceRaise=zamData.s3_perZam, totalRaise=Number(zamData.s3_myZam) + Number(zamData.s3_perZam), fark=(Number(mevcutUcret)*Number(totalRaise)) / 100, nextSallary=Number(mevcutUcret) + Number(fark)
      else if (sonuc > 80 && sonuc <= 90) scale = "4" , standartRaise=zamData.s4_myZam , performanceRaise=zamData.s4_perZam, totalRaise=Number(zamData.s4_myZam) + Number(zamData.s4_perZam), fark=(Number(mevcutUcret)*Number(totalRaise)) / 100, nextSallary=Number(mevcutUcret) + Number(fark)
      else if (sonuc > 90 && sonuc <= 100) scale = "5" , standartRaise=zamData.s5_myZam , performanceRaise=zamData.s5_perZam,totalRaise=Number(zamData.s5_myZam) + Number(zamData.s5_perZam), fark=(Number(mevcutUcret)*Number(totalRaise)) / 100, nextSallary=Number(mevcutUcret) + Number(fark)

      return {...item, skala:scale,standartZam:standartRaise,performansZam:performanceRaise,toplamZam:totalRaise,eklenenUcret:fark,yeniUcret:nextSallary}
    })

    setMyCalculatedData(myData)
  }


  return (
    <div>



      <Box display={'flex'} flexDirection={'column'} gap={3}>

        <Typography variant='h6' align='center' mt={12} mb={5} letterSpacing={5} fontWeight={700} color={'red'}>Tüm Değerlendirme ve Hesaplama Sonuçları</Typography>


        <Typography variant='subtitle' align='center' color={'black'}>Tüm hesaplamalar güncel zam oranı bilgilerine göre yapılacaktır.</Typography>

        <Container sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 3 }}>
          <Button variant='contained' onClick={handleCalculate}>Hesaplama Yap</Button>
          <Button variant='outlined'>Kaydet</Button>
        </Container>


        <AllResults_Table myCalculatedData={myCalculatedData}/>

      </Box>




    </div>
  )
}

export default AllResults