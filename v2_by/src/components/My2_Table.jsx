import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { rows } from '../helper/data';
import { Box, Button, Grid, Container } from '@mui/material';
import { FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import ReadUnderstood from './modals/ReadUnderstood';
import { useSelector } from "react-redux"
import usePerformanceCall from '../hooks/usePerformanceCall';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





const My2_Table = ({ personelData, handleChange, info }) => {

  const [okudumAnladim, setokudumAnladim] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)
  const { post_manager_evaulationData, get_All_PerformanceData } = usePerformanceCall()

  const [data, setData] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
  }


  //!okudum anladım bilgisini kontrol et
  const handleOkudumAnladim = (e) => {

    if (!okudumAnladim) {
      handleOpen()
      setokudumAnladim(true)
    }
    else {
      setokudumAnladim(false)
      setOpen(false)
    }

  }


  const topics = [
    {
      id: 1,
      konu: 'Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q1Calisan} disabled name='q1Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ1' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 2,
      konu: 'Operasyon için İşgüvenliği  kurallarını uygular.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q2Calisan} disabled name='q2Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ2' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 3,
      konu: 'İş takibi ve Raporlama yapabilir.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q3Calisan} disabled name='q3Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ3' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 4,
      konu: 'Kalite standartlarını uygulayabilir. Hatalı parçaları tanıyabilir ve seçebilir. ',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q4Calisan} disabled name='q4Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ4' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 5,
      konu: 'İşe devamlılığı iyidir.',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q5Calisan} disabled name='q5Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ5' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 6,
      konu: 'İş yeri disiplin kurallarına uygun davranır.',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q6Calisan} disabled name='q6Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ6' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 7,
      konu: 'Ekip çalışmasına uygun davranır, iletişimi iyidir. ',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q7Calisan} disabled name='q7Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ7' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 8,
      konu: 'Farkındalığı yüksektir ve katma değer sağlayacak önerilerde bulanabilir. ',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q8Calisan} disabled name='q8Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ8' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 9,
      konu: 'Ekip yönetebilir ve ekibini yönlendirebilir.',
      yetkinlik: 'Yönetsel Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q9Calisan} disabled name='q9Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ9' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 10,
      konu: 'Operasyon ile ilgili diğer çalışanlara teorik ve uygulamalı olarak eğitim verebilir.',
      yetkinlik: 'Yönetsel Yetkinlik',
      referans: '10',

      calisan: <input value={personelData?.q10Calisan} disabled name='q10Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input required name='yoneticiQ10' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
  ];


  const topics_result = [
    {
      konu: "Operasyonel Yetkinlik Puanı",
      referans: '40',
      yetkinlik: "",
      calisan: <Typography>{personelData?.oypCalisan}</Typography>,
      yonetici: <Typography>{info.yoneticiOyp}</Typography>,
    },
    {
      konu: "Davranışsal Yetkinlik Puanı",
      referans: '40',
      yetkinlik: "",
      calisan: <Typography>{personelData?.dypCalisan}</Typography>,
      yonetici: <Typography>{info.yoneticiDyp}</Typography>,
    },
    {
      konu: "Yönetsel Yetkinlik Puanı",
      referans: '20',
      yetkinlik: "",
      calisan: <Typography>{personelData?.dypCalisan}</Typography>,
      yonetici: <Typography>{info.yoneticiDyp}</Typography>,
    },
    {
      konu: "Toplam Performans Puanı",
      referans: '100',
      yetkinlik: "",
      calisan: <Typography>{personelData?.tppCalisan}</Typography>,
      yonetici: <Typography>{info.yoneticiTpp}</Typography>,
    }
  ]


  const handleSubmit = (e) => {

    e.preventDefault()
    post_manager_evaulationData('manager-evaluation', info)    
  }



  return (


    <div>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 10 }} component='form' onSubmit={handleSubmit}>


        <Typography align='center' fontWeight={700} color={'darkred'}>{personelData?.personel} - {personelData?.gorev}</Typography>

        {/* DEĞERLENDİRME */}
        <Box sx={{ display: 'flex', justifyContent: 'center', }}>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow sx={{ position: 'sticky', top: 0 }}>
                  {
                    rows.map((item, index) => (
                      <StyledTableCell key={index} align="center">{item.title}</StyledTableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  topics.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{item.konu}</StyledTableCell>
                      <StyledTableCell align="center">{item.yetkinlik}</StyledTableCell>
                      <StyledTableCell align="center">{item.referans}</StyledTableCell>
                      <StyledTableCell align="center">{item.calisan}</StyledTableCell>
                      <StyledTableCell align="center">{item.yonetici}</StyledTableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
              <TableBody sx={{ backgroundColor: '#9BB8CD' }}>
                {
                  topics_result.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{item.konu}</StyledTableCell>
                      <StyledTableCell align="center">{item.yetkinlik}</StyledTableCell>
                      <StyledTableCell align="center">{item.referans}</StyledTableCell>
                      <StyledTableCell align="center">{item.calisan}</StyledTableCell>
                      <StyledTableCell align="center">{item.yonetici}</StyledTableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>


        {/* ÇALIŞAN AÇIKLAMA ALANI */}
        <Container sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 3 }}>

          <TextField
            disabled
            fullWidth
            label='Çalışan Açıklama'
            name='calisanAciklama'
            id='calisanAciklama'
            type='text'
            variant='outlined'
            value={info.calisanAciklama}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label='Yönetici Açıklama'
            name='yoneticiAciklama'
            id='yoneticiAciklama'
            type='text'
            variant='outlined'
            inputProps={{ maxlength: 100 }}
            onChange={handleChange}
          />

        </Container>


        {/* ONAY VE KAYIT */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <FormGroup style={{ padding: 10 }}>
            <FormControlLabel required control={<Checkbox onClick={handleOkudumAnladim} />} label="Okudum, Anladım, Onaylıyorum." />
          </FormGroup>

          <Box>
            <Button fullWidth variant='contained' type='submit' sx={{ letterSpacing: 10 }} >Kaydet</Button>
          </Box>
        </Box>

        <ReadUnderstood open={open} handleClose={handleClose} />

      </Container>

    </div>





  )

}

export default My2_Table