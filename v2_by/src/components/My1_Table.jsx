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
import { FormControlLabel, FormGroup, TextField } from '@mui/material';
import { rows } from "../helper/data"
import { Box, Button, Grid, Container } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import ReadUnderstood from './modals/ReadUnderstood';
import { useSelector } from "react-redux"

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




const My1_Table = ({ personelData }) => {


    const [okudumAnladim, setokudumAnladim] = useState(false)
    const { userInfo } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }

    const createdDate = new Date()


    const evulationInfo = () => {

        let performanceResult = ""
        const thisYear = new Date().getFullYear()
        const nextYear = new Date().getFullYear() + 1

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


    function formatDate(date) {
        let day = date.getDate(); // Günü alır
        let month = date.getMonth() + 1; // Ayı alır (0'dan başladığı için 1 eklenir)
        let year = date.getFullYear(); // Yılı alır
        let hours = date.getHours(); // Saati alır
        let minutes = date.getMinutes(); // Dakikayı alır

        // Gün, ay, saat veya dakika tek basamaklıysa, başına '0' ekler
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }



    const handleChange = (e) => {

        setInfo(prevInfo => {

            const newInfo = { ...prevInfo, [e.target.name]: e.target.value }

            //ilk 6 soru operasyonel yetkinlik için hesaplanır
            const operayonelYetkinlikPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4) + Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6)

            //son 4 soru davranışsal yetkinlik için hesaplanır
            const davranissalYetkinlikPuani = Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8) + Number(newInfo.yoneticiQ9) + Number(newInfo.yoneticiQ10)


            const yoneticiPuani = Number(newInfo.yoneticiQ1) + Number(newInfo.yoneticiQ2) + Number(newInfo.yoneticiQ3) + Number(newInfo.yoneticiQ4) + Number(newInfo.yoneticiQ5) + Number(newInfo.yoneticiQ6) + Number(newInfo.yoneticiQ7) + Number(newInfo.yoneticiQ8) + Number(newInfo.yoneticiQ9) + Number(newInfo.yoneticiQ10)

            newInfo.yoneticiOyp = operayonelYetkinlikPuani;
            newInfo.yoneticiDyp = davranissalYetkinlikPuani;

            newInfo.yoneticiTpp = newInfo.yoneticiOyp + newInfo.yoneticiDyp

            newInfo.yoneticiDegerlendirmeSonucu = Number(Number(yoneticiPuani) * Number(newInfo.yoneticiDegerlendirmeYuzdesi)).toFixed(2)

            newInfo.yoneticiSonuc = (yoneticiPuani >= 0 && yoneticiPuani <= 45 && "Beklentileri Karşılamıyor") ||
                (yoneticiPuani >= 46 && yoneticiPuani <= 60 && "Beklentilerin Altında") ||
                (yoneticiPuani >= 61 && yoneticiPuani <= 80 && "Beklenen Performans") ||
                (yoneticiPuani >= 81 && yoneticiPuani <= 90 && "Beklentilerin Üzerinde") ||
                (yoneticiPuani >= 91 && yoneticiPuani <= 100 && "Üstün Performans")

            const toplamDegerlendirmeSonucu = Number(newInfo.degerlendirmeSonucu) + Number(newInfo.yoneticiDegerlendirmeSonucu)

            newInfo.final_degerlendirmeSonucu = Number(toplamDegerlendirmeSonucu).toFixed(2)

            newInfo.zamOrani_performans = (Number(toplamDegerlendirmeSonucu >= 81 && true))
            newInfo.zamOrani_yonetici_ve_performans = Number(toplamDegerlendirmeSonucu >= 91) && Number(toplamDegerlendirmeSonucu <= 100) && true
            
            return newInfo

        })

    }


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


    const [info, setInfo] = useState({

        //çalışan değerlendirme sonuçları
        personel: personelData?.personel,
        sicilNo: personelData?.sicilNo,
        tcNo: personelData?.tcNo,
        iseGirisTarih: personelData?.iseGirisTarih,
        dogumTarih: personelData?.dogumTarih,
        birim: personelData?.birim,
        bolum: personelData?.bolum,
        ustBirim: personelData?.ustBirim,
        yonetici: userInfo?.NAME + " " + userInfo?.SURNAME,
        gorev: personelData?.gorev,
        currentSallary: personelData?.currentSallary,
        degerlendirmeYili: personelData?.degerlendirmeYili,
        degerlendirmeDonemiAciklama: personelData?.degerlendirmeDonemiAciklama,
        q1Calisan: personelData?.q1Calisan,
        q2Calisan: personelData?.q2Calisan,
        q3Calisan: personelData?.q3Calisan,
        q4Calisan: personelData?.q4Calisan,
        q5Calisan: personelData?.q5Calisan,
        q6Calisan: personelData?.q6Calisan,
        q7Calisan: personelData?.q7Calisan,
        q8Calisan: personelData?.q8Calisan,
        q9Calisan: personelData?.q9Calisan,
        q10Calisan: personelData?.q10Calisan,
        oypCalisan: personelData?.oypCalisan,
        dypCalisan: personelData?.dypCalisan,
        tppCalisan: personelData?.tppCalisan,
        calisanAciklama: personelData?.calisanAciklama,
        degerlendirmeSonucu: personelData?.degerlendirmeSonucu,
        calisanDegerlendirmeYuzdesi: personelData?.calisanDegerlendirmeYuzdesi,
        createdDate: personelData?.createdDate,
        okudumAnladım: personelData?.okudumAnladım,
        personelSonuc: personelData?.personelSonuc,

        //yönetici değerlendirme sonuçları
        yoneticiQ1: "",
        yoneticiQ2: "",
        yoneticiQ3: "",
        yoneticiQ4: "",
        yoneticiQ5: "",
        yoneticiQ6: "",
        yoneticiQ7: "",
        yoneticiQ8: "",
        yoneticiQ9: "",
        yoneticiQ10: "",
        yoneticiAciklama: "",
        yoneticiDegerlendirmeSonucu: "",
        yoneticiDegerlendirmeYuzdesi: 0.65,
        yoneticiCreatedDate: formatDate(createdDate),
        yoneticiOkudumAnladım: true,
        yoneticiSonuc: "",
        yoneticiDegerlendirmeYili: new Date().getFullYear(),
        yoneticiDegerlendirmeDonemiAciklama: evulationInfo(),
        yoneticiOyp: "",
        yoneticiDyp: "",
        yoneticiTpp: "",

        zamOrani_performans:false,
        zamOrani_yonetici_ve_performans:false,
        final_degerlendirmeSonucu:""

    })


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
            konu: 'Makine, Alet ve aparatları tanıyor ve kullanabiliyor.',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input value={personelData?.q4Calisan} disabled name='q4Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
            ,
            yonetici: <input required name='yoneticiQ4' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 5,
            konu: 'Kalite standartlarını uygulayabilir. Hatalı parçaları tanıyabilir ve seçebilir. ',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input value={personelData?.q5Calisan} disabled name='q5Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
            ,
            yonetici: <input required name='yoneticiQ5' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 6,
            konu: 'İstenilen standart ve sürede tüm operasyonu tamamen bağımsız olarak yapabilir.',
            yetkinlik: 'Operasyonel Yetkinlik',
            referans: '10',

            calisan: <input value={personelData?.q6Calisan} disabled name='q6Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
            ,
            yonetici: <input required name='yoneticiQ6' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 7,
            konu: 'İşe devamlılığı iyidir.',
            yetkinlik: 'Davranışsal Yetkinlik',
            referans: '10',

            calisan: <input value={personelData?.q7Calisan} disabled name='q7Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
            ,
            yonetici: <input required name='yoneticiQ7' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 8,
            konu: 'İş yeri disiplin kurallarına uygun davranır.',
            yetkinlik: 'Davranışsal Yetkinlik',
            referans: '10',

            calisan: <input value={personelData?.q8Calisan} disabled name='q8Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
            ,
            yonetici: <input required name='yoneticiQ8' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 9,
            konu: 'Ekip çalışmasına uygun davranır, iletişimi iyidir. ',
            yetkinlik: 'Davranışsal Yetkinlik',
            referans: '10',

            calisan: <input value={personelData?.q9Calisan} disabled name='q9Calisan' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} />
            ,
            yonetici: <input required name='yoneticiQ9' type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />
            ,
        },
        {
            id: 10,
            konu: 'Farkındalığı yüksektir ve katma değer sağlayacak önerilerde bulanabilir. ',
            yetkinlik: 'Davranışsal Yetkinlik',
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
            referans: '60',
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
            konu: "Toplam Performans Puanı",
            referans: '40',
            yetkinlik: "",
            calisan: <Typography>{personelData?.tppCalisan}</Typography>,
            yonetici: <Typography>{info.yoneticiTpp}</Typography>,
        }
    ]





    const handleSubmit = (e) => {

        e.preventDefault()
    }


    console.log(info)


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
                        inputProps={{ maxlength: 100 }}
                        value={personelData?.calisanAciklama}
             
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

export default My1_Table