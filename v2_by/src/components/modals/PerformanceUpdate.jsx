import React from 'react'
import Modal from '@mui/material/Modal';
import { Box, Button, Container } from '@mui/material';
import { Typography, Grid } from "@mui/material"
import { my1_questions, my2_questions, rows } from "../../helper/data"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormControlLabel, FormGroup, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import usePerformanceCall from '../../hooks/usePerformanceCall';


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


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};


const PerformanceUpdate = ({ handleChange, handleClose_editPage, open_editPage, info }) => {

  const {put_performanceData,get_All_PerformanceData} = usePerformanceCall()

  const my1_topics = [
    {
      id: 1,
      konu: 'Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q1Calisan} disabled name='q1Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ1} required name='yoneticiQ1' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 2,
      konu: 'Operasyon için İşgüvenliği  kurallarını uygular.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q2Calisan} disabled name='q2Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ2} required name='yoneticiQ2' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 3,
      konu: 'İş takibi ve Raporlama yapabilir.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q3Calisan} disabled name='q3Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ3} required name='yoneticiQ3' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 4,
      konu: 'Makine, Alet ve aparatları tanıyor ve kullanabiliyor.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q4Calisan} disabled name='q4Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ4} required name='yoneticiQ4' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 5,
      konu: 'Kalite standartlarını uygulayabilir. Hatalı parçaları tanıyabilir ve seçebilir.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q5Calisan} disabled name='q5Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ5} required name='yoneticiQ5' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 6,
      konu: 'İstenilen standart ve sürede tüm operasyonu tamamen bağımsız olarak yapabilir.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q6Calisan} disabled name='q6Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ6} required name='yoneticiQ6' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 7,
      konu: 'İşe devamlılığı iyidir.',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q7Calisan} disabled name='q7Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ7} required name='yoneticiQ7' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 8,
      konu: 'İş yeri disiplin kurallarına uygun davranır.',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q8Calisan} disabled name='q8Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ8} required name='yoneticiQ8' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 9,
      konu: 'Ekip çalışmasına uygun davranır, iletişimi iyidir.',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q9Calisan} disabled name='q9Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ9} required name='yoneticiQ9' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 10,
      konu: 'Farkındalığı yüksektir ve katma değer sağlayacak önerilerde bulanabilir.',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q10Calisan} disabled name='q10Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ10} required name='yoneticiQ10' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
  ];

  const my1_topics_result = [
    {
      konu: "Operasyonel Yetkinlik Puanı",
      referans: '60',
      yetkinlik: "",
      calisan: <Typography>{info?.oypCalisan}</Typography>,
      yonetici: <Typography>{info?.yoneticiOyp}</Typography>,
    },
    {
      konu: "Davranışsal Yetkinlik Puanı",
      referans: '40',
      yetkinlik: "",
      calisan: <Typography>{info?.dypCalisan}</Typography>,
      yonetici: <Typography>{info?.yoneticiDyp}</Typography>,
    },
    {
      konu: "Toplam Performans Puanı",
      referans: '100',
      yetkinlik: "",
      calisan: <Typography>{info?.tppCalisan}</Typography>,
      yonetici: <Typography>{info?.yoneticiTpp}</Typography>,
    }
  ]


  const my2_topics = [
    {
      id: 1,
      konu: 'Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q1Calisan} disabled name='q1Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ1} required name='yoneticiQ1' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 2,
      konu: 'Operasyon için İşgüvenliği  kurallarını uygular.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q2Calisan} disabled name='q2Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ2} required name='yoneticiQ2' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 3,
      konu: 'İş takibi ve Raporlama yapabilir.',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q3Calisan} disabled name='q3Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ3} required name='yoneticiQ3' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 4,
      konu: 'Kalite standartlarını uygulayabilir. Hatalı parçaları tanıyabilir ve seçebilir. ',
      yetkinlik: 'Operasyonel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q4Calisan} disabled name='q4Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ4} required name='yoneticiQ4' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 5,
      konu: 'İşe devamlılığı iyidir.',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q5Calisan} disabled name='q5Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ5} required name='yoneticiQ5' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 6,
      konu: 'İş yeri disiplin kurallarına uygun davranır.',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q6Calisan} disabled name='q6Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ6} required name='yoneticiQ6' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 7,
      konu: 'Ekip çalışmasına uygun davranır, iletişimi iyidir. ',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q7Calisan} disabled name='q7Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ7} required name='yoneticiQ7' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 8,
      konu: 'Farkındalığı yüksektir ve katma değer sağlayacak önerilerde bulanabilir. ',
      yetkinlik: 'Davranışsal Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q8Calisan} disabled name='q8Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ8} required name='yoneticiQ8' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 9,
      konu: 'Ekip yönetebilir ve ekibini yönlendirebilir.',
      yetkinlik: 'Yönetsel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q9Calisan} disabled name='q9Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ9} required name='yoneticiQ9' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
    {
      id: 10,
      konu: 'Operasyon ile ilgili diğer çalışanlara teorik ve uygulamalı olarak eğitim verebilir.',
      yetkinlik: 'Yönetsel Yetkinlik',
      referans: '10',

      calisan: <input value={info?.q10Calisan} disabled name='q10Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
      ,
      yonetici: <input value={info?.yoneticiQ10} required name='yoneticiQ10' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
      ,
    },
  ];


  const my2_topics_result = [
    {
      konu: "Operasyonel Yetkinlik Puanı",
      referans: '40',
      yetkinlik: "",
      calisan: <Typography>{info?.oypCalisan}</Typography>,
      yonetici: <Typography>{info?.yoneticiOyp}</Typography>,
    },
    {
      konu: "Davranışsal Yetkinlik Puanı",
      referans: '40',
      yetkinlik: "",
      calisan: <Typography>{info?.dypCalisan}</Typography>,
      yonetici: <Typography>{info?.yoneticiDyp}</Typography>,
    },
    {
      konu: "Yönetsel Yetkinlik Puanı",
      referans: '20',
      yetkinlik: "",
      calisan: <Typography>{info?.dypCalisan}</Typography>,
      yonetici: <Typography>{info?.yoneticiDyp}</Typography>,
    },
    {
      konu: "Toplam Performans Puanı",
      referans: '100',
      yetkinlik: "",
      calisan: <Typography>{info?.tppCalisan}</Typography>,
      yonetici: <Typography>{info?.yoneticiTpp}</Typography>,
    }
  ]


  const handleSubmit = (e) => {
    e.preventDefault()
    put_performanceData('manager-evaluation',info)
    get_All_PerformanceData('manager-evaluation')
  }


  return (
    <div>

      <Modal
        open={open_editPage}
        onClose={handleClose_editPage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>

          {
            info.type == "my1" ?
              (
                <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 10 }} component='form' onSubmit={handleSubmit}>



                  <Typography align='center' fontWeight={700} color={'darkred'}>{info?.personel} - {info?.gorev}</Typography>

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
                            my1_topics.map((item, index) => (
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
                            my1_topics_result.map((item, index) => (
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
                      inputProps={{ maxlength: 100 }}
                      value={info?.calisanAciklama}

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
                      value={info?.yoneticiAciklama}
                    />

                  </Container>


                  {/* ONAY VE KAYIT */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                    <Button fullWidth variant='contained' type='submit' sx={{ letterSpacing: 10 }}>Güncelle</Button>
                  </Box>

                </Container>
              )
              :
              (
                <Box>



                </Box>
              )
          }


        </Box>


      </Modal>

    </div>
  )
}

export default PerformanceUpdate