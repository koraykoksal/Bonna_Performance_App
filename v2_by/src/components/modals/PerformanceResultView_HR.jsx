import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material"
import bonnaLogo from "../../assets/img/logobonna_b.png"
import { my1_questions, my2_questions } from "../../helper/data"
import { FaWindowClose } from "react-icons/fa";
import { personelViewModalStyle } from '../../styles/globalStyle';





const PerformanceResultView_HR = ({ open, handleClose, info }) => {

    console.log(info)

    return (
        <div id='modalContent'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={personelViewModalStyle}>

                    <FaWindowClose size={25} color='red' onClick={handleClose} cursor={'pointer'} />


                    <img src={bonnaLogo} style={{ width: '125px', margin: 'auto' }} />

                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} py={3}>

                        <Typography align='center' fontWeight={700}>{info?.degerlendirmeYili} - {info?.degerlendirmeDonemiAciklama}</Typography>
                        <Typography variant='subtitle2' align='center'>{info?.sicilNo} - {info?.tcNo} - {info?.personel} - {info?.gorev} - ({info?.type})</Typography>


                    </Box>

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

                            <Typography variant='subtitle1' align='center' fontSize={14} fontFamily={'Arial'}>
                                <span style={{ fontWeight: 700 }}>Personel Açıklama :</span> {info?.calisanAciklama}
                            </Typography>
                        </Box>




                        <Box display={'flex'} flexDirection={'column'} gap={3}>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetici : {info?.yonetici}</Typography>

                            <Box display={'flex'} justifyContent={'center'} gap={1}>
                                <Box>
                                    {
                                        my2_questions.map((item) => (
                                            <Typography key={item.id} variant='subtitle2' align='left'>{item.id}-{item?.ask}</Typography>
                                        ))
                                    }
                                </Box>
                                <Box>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ1} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ2} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ3} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ4} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ5} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ6} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ7} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ8} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ9} puan</Typography>
                                    <Typography variant='subtitle2' align='center'>{info?.yoneticiQ10} puan</Typography>
                                </Box>
                            </Box>

                            <Typography variant='subtitle2' align='center' fontWeight={700}>Toplam Puan: {info?.yoneticiTpp} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Operasyonel Yetklinlik Puan: {info?.yoneticiOyp} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Davranışsal Yetklinlik Puan: {info?.yoneticiDyp} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetsel Yetklinlik Puan: {info?.yoneticiYyp} puan</Typography>

                            <Typography variant='subtitle1' align='center' fontSize={14} fontFamily={'Arial'}>
                                <span style={{ fontWeight: 600 }}>Yönetici Açıklama :</span> {info?.yoneticiAciklama}
                            </Typography>

                        </Box>



                    </Box>



                    <Box mt={5} display={'flex'} flexDirection={'column'} gap={3}>
                        <Typography variant='subtitle2' align='center' fontWeight={700}>Değerlendirme Puanı: {info?.final_degerlendirmeSonucu} </Typography>
                        <Typography variant='subtitle2' align='center' fontWeight={700}>Değerlendirme Sonuç: {info?.final_degerlendirmeAciklamasi} </Typography>

                    </Box>

                    <Box mt={5}>
                        <Typography variant='subtitle1' fontSize={15} fontFamily={'Arial'}>
                            <span style={{ fontWeight: 700 }}>Aydınlatma Metni :</span> İşbu form, Kişisel Verileri Koruma Kanunu kapsamında belirli, açık ve meşru olarak Performans Değerlendirme Süreçlerinin Yürütülmesi amacıyla bağlantılı, sınırlı ve ölçülü olma ilkeleri gözetilerek oluşturulmuştur. Yukarıda doldurduğum bilgilerin doğruluğunu ve gizliliğini kabul ediyorum.
                        </Typography>

                    </Box>


                    <Box display={'flex'} justifyContent={'space-around'} mt={5}>
                        <Typography variant='subtitle2'>Çalışan İmza:</Typography>
                        <Typography variant='subtitle2'>Yönetici İmza:</Typography>
                    </Box>

                </Box>



            </Modal>

        </div>
    )
}

export default PerformanceResultView_HR