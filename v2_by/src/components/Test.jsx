import React from 'react'
import { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container, Typography } from "@mui/material"
import { useSelector } from 'react-redux';

const Test = ({ managerpersonelData,data }) => {

    const now = new Date().getFullYear()
    const [nonMatchingPersonnel, setNonMatchingPersonnel] = useState([]);
    const { all_performanceData } = useSelector((state) => state.performance)
    const { unSelectedData } = useSelector((state) => state.performance)
 

    //!* performans dönem bilgisini çalıştır
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


    // useEffect(() => {

    //     const degerlendirmeDonemAciklamasi = evulationInfo()

    //     const newNonMatchingPersonnel = managerpersonelData.filter(personel =>
    //         !data.some(record => (record.tcNo == personel.tc) && (record.degerlendirmeYili === now && record.degerlendirmeDonemiAciklama === degerlendirmeDonemAciklamasi))
    //     );

    //     setNonMatchingPersonnel(newNonMatchingPersonnel);


    // }, [managerpersonelData,data ])








    return (
        <div>

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
                            {unSelectedData.map((row, index) => (
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


        </div>
    )
}

export default Test