import React from 'react'
import useBlogCall from '../hooks/usePerformanceCall'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import NewRecord from '../components/NewRecord';
import { my1Titles, my2Titles } from '../helper/data';
import My1 from '../components/My1';
import My2 from '../components/My2';


export const Home = () => {

  const thisYear = new Date().getFullYear()
  const nextYear = new Date().getFullYear() + 1

  const { currentUser_Category, currentUser, currentUserTitle } = useSelector((state) => state.auth)
  const [my1Status, setmy1Status] = useState(null)
  const [my2Status, setmy2Status] = useState(null)
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


  console.log("my1 Status: ",my1Status)
  console.log("my2 Status: ",my2Status)

  return (

    <>

      <Grid container justifyContent={"center"} spacing={2} mt={10} mb={10}>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <Typography variant='h5' p={2} color='#000000' fontWeight={700}>
            Bonna {evulationInfo()} Dönemi
          </Typography>


          {/* <Button onClick={handleOpen} variant='contained'>+ Yeni</Button> */}

        </Box>

        {
          my1Status && <My1/>
        }

        {
          my2Status && <My2/>
        }

        {/* <NewRecord open={open} handleClose={handleClose} /> */}

      </Grid>

    </>


  )
}
