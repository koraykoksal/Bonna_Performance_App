import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid, Container } from "@mui/material"
import bonnaLogo from "../../assets/img/logobonna_b.png"
import { FaWindowClose } from "react-icons/fa";
import { okrViewModalStyle } from '../../styles/globalStyle';



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
  p: 5,

};

const PerformanceResultView_OKR = ({ handleClose, open, info }) => {


  const scaleDescription = (score) => {

    if (score.FinalScore > 0 && score.FinalScore <= 45) return "1";
    if (score.FinalScore > 45 && score.FinalScore <= 60) return "2";
    if (score.FinalScore > 60 && score.FinalScore <= 80) return "3";
    if (score.FinalScore > 80 && score.FinalScore <= 90) return "4";
    if (score.FinalScore > 90 && score.FinalScore <= 100) return "5";
    return "";

  }


  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={okrViewModalStyle}>

          <FaWindowClose size={25} color='red' onClick={handleClose} cursor={'pointer'} />

          <img src={bonnaLogo} style={{ width: '125px', margin: 'auto' }} />


          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} py={3}>

            <Typography align='center' fontWeight={700}>{info?.ObjectivePeriods} - {info?.CompetencePeriods}</Typography>
            <Typography variant='subtitle2' align='center'>{info?.UserEmployeeNo} - {info?.UserFullName} - {info?.Department} - {info?.UserPosition}</Typography>


          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 10, mt: 5 }}>


            <Box display={'flex'} flexDirection={'column'} gap={3}>
              <Typography variant='subtitle2' align='center' fontWeight={700}>Personel : {info?.UserFullName}</Typography>


              <Typography variant='subtitle2' align='center' fontWeight={700}>OKR Ortalaması : {info?.ObjectivePeriodsAvg} puan</Typography>
              <Typography variant='subtitle2' align='center' fontWeight={700}>Yetkinlik Puanı: {info?.CompetencePeriodsAvg} </Typography>

            </Box>


            <Box display={'flex'} flexDirection={'column'} gap={3}>
              <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetici : {info?.ParentFullName}</Typography>


              <Typography variant='subtitle2' align='center' fontWeight={700}>Sistem Notu: {info?.SystemNote} </Typography>



              <Box display={'flex'} justifyContent={'center'} gap={3}>
                <Typography variant='subtitle2' align='center' fontWeight={700}>OKR Ağırlığı: {info?.ObjectiveWeight} </Typography>
                <Typography variant='subtitle2' align='center' fontWeight={700}>
                  Yetkinlik Ağırlığı: {info?.CompetenceWeight}
                </Typography>

              </Box>

            </Box>



          </Box>



          <Box mt={15} display={'flex'} flexDirection={'column'} gap={3}>


            <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetici Puan (Performans Puanı) : {info?.FinalScore} puan</Typography>

            <Typography variant='subtitle2' align='center' fontWeight={700}>Skala : {scaleDescription(info)}</Typography>

            <Typography variant='subtitle2' align='center' fontWeight={700}>
              Değerlendirme Sonuç:
              {info?.FinalScore >= 0 && info?.FinalScore <= 45 && " Beklentileri Karşılamıyor 😫"}
              {info?.FinalScore > 45 && info?.FinalScore <= 60 && " Beklentilerin Altında 🙁"}
              {info?.FinalScore > 60 && info?.FinalScore <= 80 && " Beklenen Performans 😐"}
              {info?.FinalScore > 80 && info?.FinalScore <= 90 && " Beklentilerin Üzerinde 😬"}
              {info?.FinalScore > 90 && info?.FinalScore <= 100 && " Üstün Performans 😎"}
            </Typography>


          </Box>

          <Box display={'flex'} flexDirection={'column'} gap={5} mt={5}>


            <Container sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

              <Typography variant='subtitle1' fontSize={15} fontFamily={'Arial'}>
                <span style={{fontWeight:700}}>Yönetici Açıklama :</span> {info.ManagerComment}
              </Typography>

              <Typography variant='subtitle1' fontSize={15} fontFamily={'Arial'}>
              <span style={{fontWeight:700}}>Aydınlatma Metni :</span> İşbu form, Kişisel Verileri Koruma Kanunu kapsamında belirli, açık ve meşru olarak Performans Değerlendirme Süreçlerinin Yürütülmesi amacıyla bağlantılı, sınırlı ve ölçülü olma ilkeleri gözetilerek oluşturulmuştur. Yukarıda doldurduğum bilgilerin doğruluğunu ve gizliliğini kabul ediyorum.
              </Typography>

              <Box display={'flex'} justifyContent={'space-around'}>
                <Typography variant='subtitle2'>Çalışan İmza:</Typography>
                <Typography variant='subtitle2'>Yönetici İmza:</Typography>
              </Box>
            </Container>




          </Box>

        </Box>




      </Modal>

    </div>
  )
}

export default PerformanceResultView_OKR