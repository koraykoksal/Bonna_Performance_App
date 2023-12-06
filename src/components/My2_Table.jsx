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
import { rows } from '../helper/my2';


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




const topics = [
  {
    id: 1,
    konu: 'Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir.',
    yetkimlik: 'Operasyonel Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 2,
    konu: 'Operasyon için İşgüvenliği  kurallarını uygular.',
    yetkimlik: 'Operasyonel Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 3,
    konu: 'İş takibi ve Raporlama yapabilir.',
    yetkimlik: 'Operasyonel Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 4,
    konu: 'Kalite standartlarını uygulayabilir. Hatalı parçaları tanıyabilir ve seçebilir. ',
    yetkimlik: 'Operasyonel Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 5,
    konu: 'İşe devamlılığı iyidir.',
    yetkimlik: 'Davranışsal Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 6,
    konu: 'İş yeri disiplin kurallarına uygun davranır.',
    yetkimlik: 'Davranışsal Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 7,
    konu: 'Ekip çalışmasına uygun davranır, iletişimi iyidir. ',
    yetkimlik: 'Davranışsal Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 8,
    konu: 'Farkındalığı yüksektir ve katma değer sağlayacak önerilerde bulanabilir. ',
    yetkimlik: 'Davranışsal Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 9,
    konu: 'Ekip yönetebilir ve ekibini yönlendirebilir.',
    yetkimlik: 'Yönetsel Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },
  {
    id: 10,
    konu: 'Operasyon ile ilgili diğer çalışanlara teorik ve uygulamalı olarak eğitim verebilir.',
    yetkimlik: 'Yönetsel Yetkinlik',
    referans: '10',

    calisan: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />
    ,

    yonetici: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,

    ortak: <input type="number" min="1" max="10" placeholder='0' style={{ height: 35, width: 55, borderRadius: 3, backgroundColor: 'transparent', border: '1px solid #000000', fontSize: 18 }} />,
  },


];


const My2_Table = ({ info, handleChange }) => {



  return (


    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '500px', overflow: 'auto' }}>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>

        {/* LOKASYON */}
        <FormControl
          sx={{ width: '300px' }}
        >
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
        <FormControl
          sx={{ width: '300px' }}
        >
          <InputLabel id="personel">Personel</InputLabel>
          <Select
            labelId="personel"
            id="personel"
            name='personel'
            label="personel"
            value={info.personel}
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
                    <StyledTableCell align="center">{item.yetkimlik}</StyledTableCell>
                    <StyledTableCell align="center">{item.referans}</StyledTableCell>
                    <StyledTableCell align="center">{item.calisan}</StyledTableCell>
                    <StyledTableCell align="center">{item.yonetici}</StyledTableCell>
                    <StyledTableCell align="center">{item.ortak}</StyledTableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>


      </Box>

    </Box>





  )

}

export default My2_Table