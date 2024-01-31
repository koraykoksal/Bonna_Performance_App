import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid, TextField, Button } from "@mui/material"
import usePerformanceCall from '../../hooks/usePerformanceCall';
import { raiseRows } from '../../helper/data';
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



const Settings_Modal = ({ open, handleClose, info, setInfo, handleChange,handleSubmit }) => {


    const raiseScale = [
        {
            scale: 1,
            performancePoint: '0-45',
            performanceStatus: "Beklentileri Karşılamıyor",
            byZam: <input required name='s1_byZam' value={info.s1_byZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange} />,
            myZam: <input required name='s1_myZam' value={info.s1_myZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            perZam: <input required name='s1_perZam' value={info.s1_perZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>
            ,
        },
        {
            scale: 2,
            performancePoint: '45.01-60',
            performanceStatus: "Beklentilerin Altında",
            byZam: <input required name='s2_byZam' value={info.s2_byZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            myZam: <input required name='s2_myZam' value={info.s2_myZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            perZam: <input required name='s2_perZam' value={info.s2_perZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>
            ,
        },
        {
            scale: 3,
            performancePoint: '60.01-80',
            performanceStatus: "Beklenen Performans",
            byZam: <input required name='s3_byZam' value={info.s3_byZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            myZam: <input required name='s3_myZam' value={info.s3_myZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            perZam: <input required name='s3_perZam' value={info.s3_perZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>
            ,
        },
        {
            scale: 4,
            performancePoint: '80.01-90',
            performanceStatus: "Beklentilerin Üzerinde",
            byZam: <input required name='s4_byZam' value={info.s4_byZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            myZam: <input required name='s4_myZam' value={info.s4_myZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            perZam: <input required name='s4_perZam' value={info.s4_perZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>
            ,
        },
        {
            scale: 5,
            performancePoint: '90.01-100',
            performanceStatus: "Üstün Performans",
            byZam: <input required name='s5_byZam' value={info.s5_byZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            myZam: <input required name='s5_myZam' value={info.s5_myZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>,
            perZam: <input required name='s5_perZam' value={info.s5_perZam} type="number" min={0} placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, color: "white", backgroundColor: 'darkred', border: '1px solid #000000', fontSize: 18 }} onChange={handleChange}/>
            ,
        },


    ];


    return (
        <div>

            <Modal
                open={open}
                onClose={() => {
                    handleClose()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <FaWindowClose size={25} color='red' cursor={'pointer'} onClick={handleClose} />

                    <Box display={'flex'} flexDirection={'column'} gap={1} component={'form'} onSubmit={handleSubmit}>

                        <Box p={1}>
                            <Typography variant='h6' color={'red'} fontWeight={700} align='center'>{info?.id ? 'Zam Oranları Güncelle' : 'Zam Oranları Giriş'}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', }}>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow sx={{ position: 'sticky', top: 0 }}>
                                            {
                                                raiseRows.map((item, index) => (
                                                    <StyledTableCell key={index} align="center">{item.title}</StyledTableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            raiseScale.map((item, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="center">{item.scale}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.performancePoint}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.byZam}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.myZam}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.perZam}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.performanceStatus}</StyledTableCell>
                                                </StyledTableRow>
                                            ))
                                        }
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Box>

                        <Box p={3}>
                            <Button variant='contained' sx={{ letterSpacing: 5 }} type='submit' fullWidth>{info?.id ? "Güncelle" : "Kaydet"}</Button>
                        </Box>

                    </Box>


                </Box>


            </Modal>

        </div>
    )
}

export default Settings_Modal