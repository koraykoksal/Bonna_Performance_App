import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid, TextField, Button } from "@mui/material"
import usePerformanceCall from '../../hooks/usePerformanceCall';
import { experienceRows } from '../../helper/data';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaWindowClose } from "react-icons/fa";


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
    width: '850px',
    height: '650px',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,

};


const Experience_Modal = ({ handleChangeExperience, Open_experience, experienceInfo, HandleClose_experience, handleSubmit }) => {

    

    const raiseScale = [
        {
            kidemYili: '0-2',
            artisOrani: <input required  type="number" name='ky_sifiriki' value={experienceInfo.ky_sifiriki} min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChangeExperience} />,
            symbol:"%"
            
        },
        {
            kidemYili: '2-5',
            artisOrani: <input required  type="number" name='ky_ikibes' value={experienceInfo.ky_ikibes} min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChangeExperience} />,
            symbol:"%"
            
        },
        {
            kidemYili: '5-10',
            artisOrani: <input required  type="number" name='ky_beson' value={experienceInfo.ky_beson} min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChangeExperience} />,
            symbol:"%"
            
        },
        {
            kidemYili: '10+',
            artisOrani: <input required  type="number" name='ky_onplus' value={experienceInfo.ky_onplus} min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChangeExperience} />,
            symbol:"%"
            
        },
        


    ];


    return (
        <div>
            <Modal
                open={Open_experience}
                onClose={() => {
                    HandleClose_experience()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <FaWindowClose size={25} color='red' cursor={'pointer'} onClick={HandleClose_experience} />

                    <Box display={'flex'} flexDirection={'column'} gap={1} component={'form'} onSubmit={handleSubmit}>

                        <Box p={1}>
                            <Typography variant='h6' color={'red'} fontWeight={700} align='center'>{experienceInfo?.id ? 'Kıdem Oranları Güncelle' : 'Kıdem Oranları Giriş'}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', }}>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow sx={{ position: 'sticky', top: 0 }}>
                                            {
                                                experienceRows.map((item, index) => (
                                                    <StyledTableCell key={index} align="center">{item.title}</StyledTableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            raiseScale.map((item, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="center">{item.kidemYili}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.artisOrani}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.symbol}</StyledTableCell>
                                                </StyledTableRow>
                                            ))
                                        }
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Box>

                        <Box p={3}>
                            <Button variant='contained' sx={{ letterSpacing: 5 }} type='submit' fullWidth >{experienceInfo?.id ? "Güncelle" : "Kaydet"}</Button>
                        </Box>

                    </Box>


                </Box>


            </Modal>

        </div>
    )
}

export default Experience_Modal