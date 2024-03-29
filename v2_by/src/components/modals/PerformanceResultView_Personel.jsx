import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material"
import bonnaLogo from "../../assets/img/logobonna_b.png"
import { my1_questions, my2_questions } from "../../helper/data"
import { FaWindowClose } from "react-icons/fa";
import { personelViewModalStyle } from '../../styles/globalStyle';






const PerformanceResultView_Personel = ({ open, handleClose, info }) => {


    return (

        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={personelViewModalStyle}>

                <FaWindowClose size={25} color='red' onClick={handleClose} cursor={'pointer'}/>

                    <img src={bonnaLogo} style={{ width: '125px', margin: 'auto' }} />


                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 10, mt: 5 }}>


                        <Box display={'flex'} flexDirection={'column'} gap={3}>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Personel : {info?.personel}</Typography>

                            <Box display={'flex'} justifyContent={'center'} gap={1}>
                                <Box>
                                    {
                                        my2_questions.map((item) => (
                                            <Typography key={item.id} variant='subtitle2' align='left'>{item.id}-{item?.ask}</Typography>
                                        ))
                                    }
                                </Box>

                                <Box>
                                    <Typography variant='subtitle2' align='center'>{info?.q1Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q2Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q3Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q4Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q5Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q6Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q7Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q8Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q9Calisan} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.q10Calisan} puan</Typography>
                                </Box>
                            </Box>

                            <Typography variant='subtitle2' align='center' fontWeight={700}>Toplam Puan: {info?.tppCalisan} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Operasyonel Yetklinlik Puan: {info?.oypCalisan} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Davranışsal Yetklinlik Puan: {info?.dypCalisan} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetsel Yetklinlik Puan: {info?.yypCalisan} puan</Typography>
                            
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Sonuç: {info?.personelSonuc} </Typography>

                            <Typography variant='subtitle1' align='center' fontSize={15} fontFamily={'Arial'}>
                            <span style={{fontWeight:700}}>Personel Açıklama :</span> {info?.calisanAciklama} 
                                </Typography>

                        </Box>


                    </Box>




                </Box>


            </Modal>

        </div>
    )
}

export default PerformanceResultView_Personel