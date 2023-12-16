import React from 'react'
import useBlogCall from '../hooks/usePerformanceCall'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import NewRecord from '../components/NewRecord';
import usePerformanceCall from '../hooks/usePerformanceCall';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const Home = () => {

  const { managersPersonels } = useSelector((state) => state.performance)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  }

  const [info, setInfo] = useState({
    choice_personelName:""
  })

  
  const handleChange=(e)=>{
    setInfo({...info,[e.target.name]:e.target.value})
  }

  const evulationInfo = () => {

    const thisYear = new Date().getFullYear()
    const nextYear = new Date().getFullYear() + 1
    let performanceResult = ""

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



  return (

    <>

      <Grid container justifyContent={"center"} spacing={2} mt={10} mb={10}>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <Typography variant='h5' p={2} color='#000000' align='center' fontWeight={700}>
            Bonna {evulationInfo()} Dönemi
          </Typography>

          <Typography variant='subtitle2' align='center' color='#000000' >
            Yönetici performans değerlendirmesi yapılacak kişileri 'Personel' seçeneğine tıklayarak seçebilirsiniz.
            <br/>
            Seçilen personelin değerlendirme tablosu hemen aşağıda görünecektir.
            <br/>
            <span style={{color:'red'}}>Personel kendi performans değerlendirmesini tamamlamış ise sonuçlar tabloda otomatik olarak görünecektir. 
            <br/>Performans değerlendirmesini yapmayan personellerin sonuçları tabloya yansımayacaktır.</span>
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="choice_personelName">Personel</InputLabel>
            <Select
              labelId="choice_personelName"
              id="choice_personelName"
              name='choice_personelName'
              label="choice_personelName"
              value={info.choice_personelName}
              onChange={handleChange}
            >
              <MenuItem value="RED">RED</MenuItem>
              <MenuItem value="KABUL">KABUL</MenuItem>
              <MenuItem value="ŞARTLI KABUL">ŞARTLI KABUL</MenuItem>
            </Select>
          </FormControl>


          {/* <Button onClick={handleOpen} variant='contained'>+ Yeni</Button> */}

        </Box>


        {/* <NewRecord open={open} handleClose={handleClose} /> */}

      </Grid>

    </>


  )
}
