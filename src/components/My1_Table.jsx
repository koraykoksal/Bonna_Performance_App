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
import { TextField } from '@mui/material';

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



    const rows = [
        "Konular",
        "Yetkinlik",
        "Referans",
        "Çalışan",
        "Yönetici",
        "Ortak",
    ]



    const topics = [
        {
            konu: 'Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir.',
            yetkimlik: 'Operasyonel Yetkinlik',
            referans: '10',
            // calisan: <TextField
            //     sx={{ width: 80 }}
            //     max='10'
            //     size='small'
            //     label="calisan"
            //     name="calisan"
            //     id="calisan"
            //     type="text"
            //     variant="outlined"
            //     // value={info.calisan}
            //     onChange={handleChange}
            // />
            calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
            ,
            // yonetici: <TextField
            //     sx={{ width: 80 }}
            //     size='small'
            //     label="yonetici"
            //     name="yonetici"
            //     id="yonetici"
            //     type="text"
            //     variant="outlined"
            //     // value={info.yonetici}
            //     onChange={handleChange}
            // />,
            yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
            // ortak: <TextField
            //     sx={{ width: 80 }}
            //     size='small'
            //     label="ortak"
            //     name="ortak"
            //     id="ortak"
            //     type="text"
            //     variant="outlined"
            //     // value={info.ortak}
            //     onChange={handleChange}
            // />
            ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
        },

    ];



    return (


        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '800px', overflow: 'auto' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>

                {/* LOKASYON */}
                <FormControl fullWidth>
                    <InputLabel id="lokasyon">Lokasyon</InputLabel>
                    <Select
                        labelId="lokasyon"
                        id="lokasyon"
                        name='lokasyon'
                        label="lokasyon"
                        value={info.lokasyon}
                        onChange={handleChange}
                    >
                        <MenuItem value="Çayırova">Çayırova</MenuItem>
                        <MenuItem value="Pazaryeri">Pazaryeri</MenuItem>
                    </Select>
                </FormControl>


                {/* PERSONEL */}
                <FormControl fullWidth>
                    <InputLabel id="lokasyon">Personel</InputLabel>
                    <Select
                        labelId="lokasyon"
                        id="lokasyon"
                        name='lokasyon'
                        label="lokasyon"
                        value={info.lokasyon}
                        onChange={handleChange}
                    >
                        <MenuItem value="Çayırova">Çayırova</MenuItem>
                        <MenuItem value="Pazaryeri">Pazaryeri</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', }}>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    rows.map((item, index) => (
                                        <StyledTableCell key={index} align="center">{item}</StyledTableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                topics.map((item, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="center">{item.konu}</StyledTableCell>
                                        <StyledTableCell align="center">{item.yetkimlik}</StyledTableCell>
                                        <StyledTableCell align="center">{item.referans}</StyledTableCell>
                                        <StyledTableCell align="center">{item.calisan}</StyledTableCell>
                                        <StyledTableCell align="center">{item.yonetici}</StyledTableCell>
                                        <StyledTableCell align="center">{item.ortak}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                            {/* {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Box>

        </Box>





    )
}

export default My1_Table