import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material"
import bonnaLogo from "../../assets/img/logoB.png"
import { my1_questions, my2_questions } from "../../helper/data"



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};




const PerformanceResultView = ({ open, handleClose, info }) => {



    //! performans dönemi bilgisini çalıştır
    const evulationInfo = () => {

        let performanceResult = ""
        const thisYear = new Date().getFullYear()
        const nextYear = new Date().getFullYear() + 1

        const currentDate = new Date();
        const startLimit = new Date(thisYear, 11); // 2023 yılının Ekim ayı için (aylar 0'dan başlar)
        const endLimit = new Date(nextYear, 1); // 2024 yılının Şubat ayı için

        if (currentDate > startLimit && currentDate < endLimit) {
            performanceResult = 'Yıl Sonu Performans Değerlendirme'
        }
        else {
            performanceResult = '6 Aylık Performans Değerlendirme'
        }

        return performanceResult

    }


    console.log(info)



    return (


        <div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <img src={bonnaLogo} style={{ width: '50px', margin: 'auto' }} />

                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} py={3}>

                        <Typography align='center' fontWeight={700}>{info?.degerlendirmeYili} - {info?.degerlendirmeDonemiAciklama}</Typography>
                        <Typography variant='subtitle2' align='center'>{info?.sicilNo} - {info?.tcNo} - {info?.personel} - {info?.gorev} - ({info?.type})</Typography>


                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 10, mt: 5 }}>

                        {/* <Box display={'flex'} flexDirection={'column'} gap={3}>

                            <Typography variant='subtitle2' align='center' fontWeight={700}>Personel : {info?.personel}</Typography>

                      
                            <Typography variant='subtitle2' align='center'>Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir: {info?.q1Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Operasyon için İşgüvenliği kurallarını uygular: {info?.q2Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 3: {info?.q3Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 4: {info?.q4Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 5: {info?.q5Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 6: {info?.q6Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 7: {info?.q7Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 8: {info?.q8Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 9: {info?.q9Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 10: {info?.q10Calisan} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Toplam Puan: {info?.tppCalisan} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Operasyonel Yetklinlik Puan: {info?.oypCalisan} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Davranışsal Yetklinlik Puan: {info?.dypCalisan} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetsel Yetklinlik Puan: {info?.yypCalisan} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Değerlendirmeye Etkisi: {info?.calisanDegerlendirmeYuzdesi * 100}% </Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Sonuç: {info?.personelSonuc} </Typography>

                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={3}>

                            <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetici : {info?.yonetici}</Typography>

                            <Typography variant='subtitle2' align='center'>Bölüm talimatlarını ve çalışma parametrelerini uygulayabilir: {info?.yoneticiQ1} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 2: {info?.yoneticiQ2} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 3: {info?.yoneticiQ3} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 4: {info?.yoneticiQ4} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 5: {info?.yoneticiQ5} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 6: {info?.yoneticiQ6} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 7: {info?.yoneticiQ7} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 8: {info?.yoneticiQ8} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 9: {info?.yoneticiQ9} puan</Typography>
                            <Typography variant='subtitle2' align='center'>Soru 10: {info?.yoneticiQ10} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Toplam Puan: {info?.yoneticiTpp} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Operasyonel Yetklinlik Puan: {info?.yoneticiOyp} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Davranışsal Yetklinlik Puan: {info?.yoneticiDyp} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetsel Yetklinlik Puan: {info?.yoneticiYyp} puan</Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Değerlendirmeye Etkisi: {info?.yoneticiDegerlendirmeYuzdesi * 100}% </Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Sonuç: {info?.yoneticiSonuc} </Typography>

                        </Box> */}

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
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Değerlendirmeye Etkisi: {info?.calisanDegerlendirmeYuzdesi * 100}% </Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Sonuç: {info?.personelSonuc} </Typography>

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
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Değerlendirmeye Etkisi: {info?.yoneticiDegerlendirmeYuzdesi * 100}% </Typography>
                            <Typography variant='subtitle2' align='center' fontWeight={700}>Sonuç: {info?.yoneticiSonuc} </Typography>

                        </Box>



                    </Box>



                    <Box mt={5}>
                        <Typography variant='subtitle2' align='center' fontWeight={700}>Değerlendirme Sonu: {info?.final_degerlendirmeSonucu} </Typography>

                    </Box>

                    <Box mt={5}>
                        <Typography variant='subtitle2'>Aydınlatma Metni : İşbu form, Kişisel Verileri Koruma Kanunu kapsamında belirli, açık ve meşru olarak Performans Değerlendirme Süreçlerinin Yürütülmesi amacıyla bağlantılı, sınırlı ve ölçülü olma ilkeleri gözetilerek oluşturulmuştur. Yukarıda doldurduğum bilgilerin doğruluğunu ve gizliliğini kabul ediyorum.</Typography>
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

export default PerformanceResultView