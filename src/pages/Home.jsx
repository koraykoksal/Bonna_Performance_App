import React from 'react'
import useBlogCall from '../hooks/useBlogCall'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import NewRecord from '../components/NewRecord';



export const Home = () => {

  const thisYear = new Date().getFullYear()
  const nextYear = new Date().getFullYear() + 1


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  }

  let performanceResult = ""

  const evulationInfo = () => {

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

        <Box sx={{display:'flex',flexDirection:'column',gap:3}}>

        <Typography variant='h5' p={2} color='#000000' fontWeight={700}>
          Bonna {evulationInfo()} Dönemi
        </Typography>


        <Button onClick={handleOpen} variant='contained'>+ Yeni</Button>

        </Box>
        

        <NewRecord open={open} handleClose={handleClose}/>

      </Grid>

    </>


  )
}
