import React from 'react'
import Modal from '@mui/material/Modal';
import { Typography, Grid, TextField, Button } from "@mui/material"
import { IoIosCloseCircle } from "react-icons/io";
import usePerformanceCall from '../../hooks/usePerformanceCall';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container } from "@mui/material"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    height: '450px',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,

};



const UnSelectedPersonels = ({ open, handleClose }) => {

    const { get_All_PerformanceData, unselectedPersonel } = usePerformanceCall()
    const { managerPersonels } = useSelector((state) => state.auth)
    const { all_performanceData } = useSelector((state) => state.performance)
    const [managerpersonelData, setManagerPersonelData] = useState([])
    const [data, setData] = useState([])
    const [nonMatchingPersonnel, setNonMatchingPersonnel] = useState([]);


    const now = new Date().getFullYear()


    //! performans dönemini açıklamasını göster
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


    //! tüm performans verilerini db den getir
    useEffect(() => {
        get_All_PerformanceData('manager-evaluation')
    }, [])



    //! değerlendirmnesi yapılmayan personelleri getir
    useEffect(() => {

        let dizi = [];

        Object.values(all_performanceData).forEach(item => {
            if (typeof item === 'object' && item !== null) {
                const result = Object.keys(item).map(key => ({ id: key, ...item[key] }));

                //! Eşleşen tüm öğeleri toplayan reduce fonksiyonu
                const eslesenler = result.reduce((acc, obj2) => {
                    const eslesen = managerpersonelData.find(obj1 => obj2.tcNo === obj1.tc);
                    if (eslesen) {
                        acc.push({ ...eslesen, eslesen: obj2 });
                        dizi.push(obj2); // Diziye eşleşen her öğeyi ekleyin
                    }
                    return acc;
                }, []);

                setData(dizi);
            }
        });


    }, [all_performanceData])



    //!* manager login işlemi sonrası kendisine bağlı çalışanlar slice içindeki state e aktarılır
    //!* yöneticiye bağlı çalışanların listesini array olarak çıkar
    useEffect(() => {

        if (Array.isArray(managerPersonels.PERSONEL)) {

            let multiSonuc = managerPersonels.PERSONEL.map((personel, index) => ({
                personel,
                tc: managerPersonels.TC[index]
            }))

            setManagerPersonelData(multiSonuc)

        }
        else {

            let singleSonuc = []
            const dizi = [managerPersonels]

            for (let i = 0; i < dizi.length; i++) {
                singleSonuc.push({
                    personel: dizi[0].PERSONEL,
                    tc: dizi[0].TC
                })
            }
            setManagerPersonelData(singleSonuc)
        }
    }, [managerPersonels])



    useEffect(() => {

        
        const degerlendirmeDonemAciklamasi = evulationInfo()

        const newNonMatchingPersonnel = managerpersonelData.filter(personel =>
            !data.some(record => (record.tcNo == personel.tc) && (record.degerlendirmeYili === now && record.degerlendirmeDonemiAciklama === degerlendirmeDonemAciklamasi))
        );

        setNonMatchingPersonnel(newNonMatchingPersonnel);


    }, [managerpersonelData, data])





    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <IoIosCloseCircle size={25} color='black' cursor={'pointer'} onClick={handleClose} />


                    <Container>

                        <Typography align='center' fontWeight={500} color={'red'} p={1}>{now} Değerlendirmesi Yapılmayan Personeller</Typography>

                        <TableContainer component={Paper} sx={{ maxWidth: 300, margin: 'auto' }}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center' style={{ fontWeight: 700, backgroundColor: '#000000', color: '#ffffff' }}>Ad Soyad</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {nonMatchingPersonnel.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{row.personel}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>



                </Box>


            </Modal>

        </div>
    )
}

export default UnSelectedPersonels