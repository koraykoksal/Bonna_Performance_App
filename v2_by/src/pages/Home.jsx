import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Container } from '@mui/material';
import usePerformanceCall from '../hooks/usePerformanceCall';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { my1Titles, my2Titles } from '../helper/data';
import My1 from '../components/My1';
import My2 from '../components/My2';
import UnSelectedPersonels from '../components/modals/UnSelectedPersonels';
import { homePageBgStyle } from '../styles/globalStyle';


export const Home = () => {

  const { get_personel_performanceData, get_All_PerformanceData, unselectedPersonel } = usePerformanceCall()
  const { managerPersonels } = useSelector((state) => state.auth)
  const { personelPerformanceData, all_performanceData } = useSelector((state) => state.performance)
  const [personelData, setPersonelData] = useState([])
  const [my1Status, setmy1Status] = useState(null)
  const [my2Status, setmy2Status] = useState(null)
  const [data, setData] = useState([])


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  }


  const [info, setInfo] = useState({
    choice_personel_tcno: ""
  })

  //!* performans dönem bilgisini çalıştır
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


  //!* handle change işlemi sonrası info içerisinde TC NO bilgisinde değişiklik olduğunda hook çalıştır
  useEffect(() => {
    if (info.choice_personel_tcno) {
      get_personel_performanceData('my-performance', info)
    }
  }, [info])


  //!* personel performans datasını çıkar ve son kayıt bilgisini getir
  useEffect(() => {

    //personelin birden fazla performans kaydı olduğunu düşünürsek yönetici değerlendirmesi öncesinde personelin son yapılan performans kaydını getirmek gerekir

    const dizi = Object.keys(personelPerformanceData).map(key => { return { id: key, ...personelPerformanceData[key] } })
    const lastKey = dizi.sort()[dizi.length - 1]

    setPersonelData(lastKey)

  }, [personelPerformanceData])


  //!* gelen performans datasına göre my status bilgisini çıkar
  useEffect(() => {
    const my1data = my1Titles.find((item) => personelData?.gorev == item.title)

    if (my1data) {
      setmy1Status(true)
    }
    else {

      setmy1Status(false)

      const my2data = my2Titles.find((item) => personelData?.gorev == item.title)

      if (my2data) {
        setmy2Status(true)
      }
      else {
        setmy2Status(false)
      }

    }

  }, [personelData])



  return (

    <div style={homePageBgStyle}>

      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 10, gap: 5 }}>

        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>

          <Typography variant='h5' p={2} color='#000000' align='center' fontWeight={700}>
            {evulationInfo()} Dönemi
          </Typography>

          <Typography variant='subtitle2' align='center' color='#000000' >
            Yönetici performans değerlendirmesi yapılacak kişileri 'Personel' seçeneğine tıklayarak seçebilirsiniz.
            <br />
            Seçilen personelin değerlendirme tablosu hemen aşağıda görünecektir.
            <br /><br />
            <span style={{ color: 'blue' }}>Personel kendi performans değerlendirmesini tamamlamış ise sonuçlar tabloda otomatik olarak görünecektir.
            </span>
            <br />
            <span style={{ color: 'red' }}>Performans değerlendirmesini yapmayan personellerin isimleri listede görünmeyecektir.</span>
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

            <Box>
              <Button variant='outlined' sx={{ textTransform: 'none' }} onClick={handleOpen}>Değerlendirilmeyen Personelleri Listele</Button>
            </Box>

            <Box>
              <FormControl sx={{ width: '350px', margin: 'auto' }}>
                <InputLabel id="choice_personel_tcno">Personel</InputLabel>
                <Select
                  labelId="choice_personel_tcno"
                  id="choice_personel_tcno"
                  name='choice_personel_tcno'
                  label="choice_personel_tcno"
                  value={info.choice_personel_tcno}
                  onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })}
                >
                  {
                    managerPersonels.map((item, index) => (
                      <MenuItem value={item.tc} key={index}>{item.personel}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>

            </Box>



          </Box>

        </Container>

        <Box>


          {
            my1Status && <My1 personelData={personelData} />
          }

          {
            my2Status && <My2 personelData={personelData} />
          }

        </Box>


          {/* değerlendirilmeyen personelleri listeleyen modal */}
          <UnSelectedPersonels open={open} handleClose={handleClose}/>

      </Box>

    </div>


  )
}
