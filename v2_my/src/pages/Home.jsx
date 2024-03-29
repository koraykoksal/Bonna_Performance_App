import React from 'react'
import useBlogCall from '../hooks/usePerformanceCall'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import { my1Titles, my2Titles } from '../helper/data';
import My1 from '../components/My1';
import My2 from '../components/My2';
import { Avatar, Box, Container, Grid, Paper } from '@mui/material';

export const Home = () => {

  const thisYear = new Date().getFullYear()
  const nextYear = new Date().getFullYear() + 1
  const thisMonth = new Date().getMonth()+1


  const { currentUser_Category, currentUser, currentUserTitle,userInfo,userManagerInfo } = useSelector((state) => state.auth)
  const [my1Status, setmy1Status] = useState(null)
  const [my2Status, setmy2Status] = useState(null)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  }

  

  const evulationInfo = () => {

    let performanceResult = ""
    const currentDate = new Date();
    const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
    const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

    if (currentDate > startLimit || currentDate <= endLimit) {
      performanceResult = 'Yıl Sonu Performans Değerlendirme'
    }
    else {
      performanceResult = '6 Aylık Performans Değerlendirme'
    }

    // if (thisMonth > 11 || thisMonth < 12) {
    //   performanceResult = 'Yıl Sonu Performans Değerlendirme'
    // }
    // else {
    //   performanceResult = '6 Aylık Performans Değerlendirme'
    // }

    return performanceResult

  }


  useEffect(() => {

    const my1data = my1Titles.find((item) => currentUserTitle == item.title)

    if (my1data) {
      setmy1Status(true)
    }
    else {

      setmy1Status(false)

      const my2data = my2Titles.find((item) => currentUserTitle == item.title)

      if (my2data) {
        setmy2Status(true)
      }
      else {
        setmy2Status(false)
      }

    }

  }, [currentUser])

 console.log(userInfo)


  return (

    <div>

      <Container style={{paddingTop:'50px',paddingBottom:'50px'}}>

        <Box sx={{display:'flex',mt:5,flexDirection:'column',gap:3}}>

          <Typography align='center' variant='h5' color='#000000' fontWeight={700}>
           {evulationInfo()} Dönemi
          </Typography>

          <Box sx={{display:'flex',justifyContent:'center',py:3}}>
            
            <Grid>
              <Paper sx={{display:'flex',flexDirection:'column',p:3,border:'1px solid red',borderRadius:'5px'}}>
              
              <Typography sx={{textTransform:'none'}}>Tc No : {userInfo.TCKIMLIKNO}</Typography>
              <Typography sx={{textTransform:'none'}}>Personel : {userInfo.NAME +" "+userInfo.SURNAME}</Typography>
              <Typography sx={{textTransform:'none'}}>Görev : {userInfo.GOREVACIKLAMA}</Typography>
              <Typography sx={{textTransform:'none'}}>Lokasyon : {userInfo.LOKASYON}</Typography>
              <Typography sx={{textTransform:'none'}}>Sicil No : {userInfo.PERSID}</Typography>
              <Typography sx={{textTransform:'none'}}>Üst Birim / Birim / Bölüm : {userInfo.USTBIRIMACIKLAMA} / {userInfo.BIRIMACIKLAMA} / {userInfo.DEPARTMANACIKLAMA}</Typography>
              <Typography sx={{textTransform:'none'}}>Yönetici : {userInfo.YONETICI}</Typography>

              </Paper>
            </Grid>
            
          </Box>

        </Box>

        {
          my1Status && <My1 />
        }

        {
          my2Status && <My2 />
        }

      </Container>

    </div>


  )
}
