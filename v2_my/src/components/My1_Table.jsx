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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { rows, rows2 } from "../helper/my1"
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ReadUnderstood from './modals/ReadUnderstood';


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




const My1_Table = ({ info, handleChange }) => {

    const [okudumAnladim, setokudumAnladim] = useState(false)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }


    const topics = [
        {
            id: 1,
            konu: 'Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir.',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input name='q1Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 2,
            konu: 'Operasyon için İşgüvenliği  kurallarını uygular.',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input name='q2Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 3,
            konu: 'İş takibi ve Raporlama yapabilir.',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input name='q3Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 4,
            konu: 'Makine, Alet ve aparatları tanıyor ve kullanabiliyor.',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input name='q4Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 5,
            konu: 'Kalite standartlarını uygulayabilir. Hatalı parçaları tanıyabilir ve seçebilir. ',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input name='q5Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 6,
            konu: 'İstenilen standart ve sürede tüm operasyonu tamamen bağımsız olarak yapabilir.',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input name='q6Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 7,
            konu: 'İşe devamlılığı iyidir.',
            yetkinlik: 'Davranışsal Yetkinlik',
            referans: '10',

            calisan: <input name='q7Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 8,
            konu: 'İş yeri disiplin kurallarına uygun davranır.',
            yetkinlik: 'Davranışsal Yetkinlik',
            referans: '10',

            calisan: <input name='q8Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 9,
            konu: 'Ekip çalışmasına uygun davranır, iletişimi iyidir. ',
            yetkinlik: 'Davranışsal Yetkinlik',
            referans: '10',

            calisan: <input name='q9Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 10,
            konu: 'Farkındalığı yüksektir ve katma değer sağlayacak önerilerde bulanabilir. ',
            yetkinlik: 'Davranışsal Yetkinlik',
            referans: '10',

            calisan: <input name='q10Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
    ];

    const topics2 = [
        {
            konu: "Operasyonel Yetkinlik Puanı",
            referans: '60',
            yetkinlik: "",
            calisan: <Typography>{info?.oypCalisan}</Typography>,
        },
        {
            konu: "Davranışsal Yetkinlik Puanı",
            referans: '40',
            yetkinlik: "",
            calisan: <Typography>{info?.dypCalisan}</Typography>,
        },
        {
            konu: "Toplam Performans Puanı",
            referans: '40',
            yetkinlik: "",
            calisan: <Typography>{info?.tppCalisan}</Typography>,
        }
    ]

    const topics3 = [
        {
            konu: "Beklentileri Karşılamıyor",
            skala: "0-45",
            yd: <Typography>{info.yd}</Typography>,
            pd: <Typography>{info.pd}</Typography>,
            od: <Typography>{info.od}</Typography>
        },
        {
            konu: "Beklentilerin Altında",
            skala: "45-60",
            yd: <Typography>{info.yd}</Typography>,
            pd: <Typography>{info.pd}</Typography>,
            od: <Typography>{info.od}</Typography>
        },
        {
            konu: "Ortalama Beklenti",
            skala: "61-80",
            yd: <Typography>{info.yd}</Typography>,
            pd: <Typography>{info.pd}</Typography>,
            od: <Typography>{info.od}</Typography>
        },
        {
            konu: "Beklentileri Karşılıyor",
            skala: "81-90",
            yd: <Typography>{info.yd}</Typography>,
            pd: <Typography>{info.pd}</Typography>,
            od: <Typography>{info.od}</Typography>
        },
        {
            konu: "Üstün Performans",
            skala: "91-100",
            yd: <Typography>{info.yd}</Typography>,
            pd: <Typography>{info.pd}</Typography>,
            od: <Typography>{info.od}</Typography>
        }
    ]

    const handleOkudumAnladim=(e)=>{

        if(!okudumAnladim){
            handleOpen()
            setokudumAnladim(true)
        }
        else{
            setokudumAnladim(false)
            setOpen(false)
        }
        
    }

    return (


        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '500px', overflow: 'auto', p: 3 }}>


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
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                        <TableBody sx={{ backgroundColor: '#9BB8CD' }}>
                            {
                                topics2.map((item, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="center">{item.konu}</StyledTableCell>
                                        <StyledTableCell align="center">{item.yetkinlik}</StyledTableCell>
                                        <StyledTableCell align="center">{item.referans}</StyledTableCell>
                                        <StyledTableCell align="center">{item.calisan}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


            {/* YONETİCİ VE ÇALIŞAN AÇIKLAMA ALANI */}
            <Container sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 3 }}>

                {/* CALISAN ACIKLAMA */}
                <TextField
                    fullWidth
                    label='Çalışan Açıklama'
                    name='calisanAciklama'
                    id='calisanAciklama'
                    type='text'
                    variant='outlined'
                    inputProps={{ maxlength: 100 }}
                    value={info.calisanAciklama}
                    onChange={handleChange}
                />

            </Container>


            {/* ONAY VE KAYIT */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                <FormGroup style={{ padding: 10 }}>
                    <FormControlLabel required control={<Checkbox onClick={handleOkudumAnladim}/>} label="Okudum, Anladım, Onaylıyorum."  />
                </FormGroup>

                <Box>
                    <Button fullWidth variant='contained'>Kaydet</Button>
                </Box>
            </Box>

            <ReadUnderstood open={open} handleClose={handleClose}/>

        </Box>





    )
}

export default My1_Table