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




    useEffect(() => {
        
        const degerlendirmeDonemAciklamasi = evulationInfo()

        const newNonMatchingPersonnel = managerPersonels.filter(personel =>
            !all_performanceData.some(record => (record.tcNo == personel.tc) && (record.degerlendirmeYili === now && record.degerlendirmeDonemiAciklama === degerlendirmeDonemAciklamasi))
        );

        setNonMatchingPersonnel(newNonMatchingPersonnel);

    }, [all_performanceData])





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