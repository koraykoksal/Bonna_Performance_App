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





const My2_Table = ({ personelData}) => {


  const [okudumAnladim, setokudumAnladim] = useState(false)



  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
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


  const handleSubmit = (e) => {

    e.preventDefault()
  }



  return (


    <div>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 10 }} component='form' onSubmit={handleSubmit}>

        {/* DEĞERLENDİRME */}
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', }}>

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
        </Box> */}


        {/* ÇALIŞAN AÇIKLAMA ALANI */}
        {/* <Container sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 3 }}>

          <TextField
            fullWidth
            label='Çalışan Açıklama'
            name='calisanAciklama'
            id='calisanAciklama'
            type='text'
            variant='outlined'
            value={info.calisanAciklama}
            onChange={handleChange}
          />

        </Container> */}


        {/* ONAY VE KAYIT */}
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <FormGroup style={{ padding: 10 }}>
            <FormControlLabel required control={<Checkbox onClick={handleOkudumAnladim} />} label="Okudum, Anladım, Onaylıyorum." />
          </FormGroup>

          <Box>
            <Button fullWidth variant='contained' type='submit' sx={{ letterSpacing: 10 }} >Kaydet</Button>
          </Box>
        </Box> */}

        <ReadUnderstood open={open} handleClose={handleClose} />

      </Container>

    </div>





  )

}

export default My2_Table