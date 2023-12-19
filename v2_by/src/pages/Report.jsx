import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import PerformanceResult_Table from '../components/tables/PerformanceResult_Table'
import PerformanceUpdate from '../components/modals/PerformanceUpdate'
import PerformanceResultView from '../components/modals/PerformanceResultView'



const Report = () => {

  const { userInfo, managerPersonels } = useSelector((state) => state.auth)
  const { get_All_PerformanceData } = usePerformanceCall()
  const { all_performanceData } = useSelector((state) => state.performance)
  const [data, setData] = useState([])
  const [managerpersonelData, setManagerPersonelData] = useState([])


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)

  }

  useEffect(() => {
    get_All_PerformanceData('manager-evaluation')
  }, [])


  useEffect(() => {

    let dizi = []


    if (Array.isArray(managerPersonels.PERSONEL)) {


      let multiSonuc = []
      for (let i = 0; i < managerPersonels.PERSONEL.length; i++) {
        multiSonuc.push({
          personel: managerPersonels.PERSONEL[i],
          tc: managerPersonels.TC[i]
        })
      }

      setManagerPersonelData(multiSonuc)

    }
    else {

      let singleSonuc = []
      const dizi = [managerPersonels]

      for (let i = 0; i < dizi.length; i++) {
        singleSonuc.push({
          personel: dizi[0].PERSONEL,
          tc: dizi[0].TC
        })
      }
      setManagerPersonelData(singleSonuc)
    }


    Object.values(all_performanceData).forEach(item => {

      if (typeof item == 'object' && item != null) {


        const result = Object.keys(item).map(key => { return { id: key, ...item[key] } })


        const detayliEslesenler2 = managerpersonelData.filter(obj1 => result.some(obj2 => obj2.tcNo === obj1.tc))
          .map(obj1 => {
            const eslesen = result.find(obj2 => obj2.tcNo === obj1.tc);

            dizi.push(eslesen)

            return { ...obj1, eslesen };
          });

      

        setData(dizi)
      }

    })


  }, [all_performanceData])




  return (
    <div>

      <PerformanceResult_Table all_performanceData={all_performanceData} handleOpen={handleOpen} data={data} />

      <PerformanceUpdate open={open} handleClose={handleClose} />

      <PerformanceResultView open={open} handleClose={handleClose} />

    </div>
  )
}

export default Report