import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material"
import bonnaLogo from "../../assets/img/logobonna_b.png"
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
  p: 5,

};

const PerformanceResultView_OKR = ({ handleClose, open, info }) => {


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

          <img src={bonnaLogo} style={{ width: '125px', margin: 'auto' }} />


          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} py={3}>

            <Typography align='center' fontWeight={700}>{info?.ObjectivePeriods} - {info?.CompetencePeriods}</Typography>
            <Typography variant='subtitle2' align='center'>{info?.UserEmployeeNo} - {info?.UserFullName} - {info?.Department} - {info?.UserPosition}</Typography>


          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 10, mt: 5 }}>


            <Box display={'flex'} flexDirection={'column'} gap={3}>
              <Typography variant='subtitle2' align='center' fontWeight={700}>Personel : {info?.UserFullName}</Typography>


              <Typography variant='subtitle2' align='center' fontWeight={700}>OKR Ortalaması : {info?.ObjectivePeriodsAvg} puan</Typography>

            </Box>




            <Box display={'flex'} flexDirection={'column'} gap={3}>
              <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetici : {info?.ParentFullName}</Typography>


              <Typography variant='subtitle2' align='center' fontWeight={700}>Yönetici Puan: {info?.ManagerScore} puan</Typography>

            </Box>



          </Box>



          <Box mt={5} display={'flex'} flexDirection={'column'} gap={3}>
            <Typography variant='subtitle2' align='center' fontWeight={700}>Değerlendirme Puanı: {info?.SystemNote} </Typography>
            <Typography variant='subtitle2' align='center' fontWeight={700}>
              Değerlendirme Sonuç:
              {info?.SystemNote >= 0 && info?.SystemNote <= 45 && " Beklentileri Karşılamıyor 😫"}
              {info?.SystemNote >= 46 && info?.SystemNote <= 60 && " Beklentilerin Altında 🙁"}
              {info?.SystemNote >= 61 && info?.SystemNote <= 80 && " Beklenen Performans 😐"}
              {info?.SystemNote >= 81 && info?.SystemNote <= 90 && " Beklentilerin Üzerinde 😬"}
              {info?.SystemNote >= 91 && info?.SystemNote <= 100 && " Üstün Performans 😎"}
            </Typography>

          </Box>

          <Box display={'flex'} flexDirection={'column'} gap={5} mt={5}>

            <Box display={'flex'} justifyContent={'center'} gap={3}>
              <Typography variant='subtitle2' align='center' fontWeight={700}>OKR Ağırlığı: {info?.ObjectiveWeight} </Typography>
              <Typography variant='subtitle2' align='center' fontWeight={700}>
                Yetkinlik Ağırlığı: {info?.CompetenceWeight}
              </Typography>

            </Box>

            <Box>
              <Typography variant='subtitle2'>Aydınlatma Metni : İşbu form, Kişisel Verileri Koruma Kanunu kapsamında belirli, açık ve meşru olarak Performans Değerlendirme Süreçlerinin Yürütülmesi amacıyla bağlantılı, sınırlı ve ölçülü olma ilkeleri gözetilerek oluşturulmuştur. Yukarıda doldurduğum bilgilerin doğruluğunu ve gizliliğini kabul ediyorum.</Typography>
            </Box>


            <Box display={'flex'} justifyContent={'space-around'}>
              <Typography variant='subtitle2'>Çalışan İmza:</Typography>
              <Typography variant='subtitle2'>Yönetici İmza:</Typography>
            </Box>
          </Box>

        </Box>



      </Modal>

    </div>
  )
}

export default PerformanceResultView_OKR