import React from 'react'
import useBlogCall from '../hooks/useBlogCall'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';



export const Home = () => {

  const thisYear = new Date().getFullYear()
  const nextYear = new Date().getFullYear()+1

  let performanceResult = ""
 
  const evulationInfo=()=>{

    const currentDate = new Date();
    const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
    const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

    if (currentDate > startLimit && currentDate < endLimit) {
      performanceResult ='Yıl Sonu Değerlendirme'
    }
    else{
      performanceResult ='6 Aylık Değerlendirme'
    }

    return performanceResult

  }
  

  

  return (
  
    <>
    
      <Grid container justifyContent={"center"} spacing={2} mt={10} mb={10}>
      
      <Typography variant='h5' p={2} color='#000000' fontWeight={700}>
          Bonna {evulationInfo()} Dönemi
        </Typography>

      </Grid>
    
    </>
      

  )
}
