import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useEffect, useState } from 'react'
import { Box, Typography, Container, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import PerformanceResult_Table from '../components/tables/PerformanceResult_Table'

const MyReports = () => {


  const { get_All_PerformanceData } = usePerformanceCall()
  const { all_performanceData } = useSelector((state) => state.performance)
  const [data, setData] = useState([])


  useEffect(() => {
    get_All_PerformanceData('manager-evaluation')
  }, [])


  // yöenticiye bağlı çalışanların bilgisini çek
  // performans değerlendirmesi yapılan çalışanları çek ve tc no bilgileri ile eşleşenleri göster
  useEffect(() => {

    let dizi = []

    Object.values(all_performanceData).forEach(item => {

      if (typeof item == 'object' && item != null) {

        const result = Object.keys(item).map(key => { return { id: key, ...item[key] } })

       result.filter(obj1=>obj1.type == 'my1' || obj1.type == 'my2').map(item=>{
          dizi.push(item)
          return {...item,item}
       })

      }

    })

    setData(dizi)

  }, [all_performanceData])





  return (

    <div>

      <Typography variant='h6' align='center' mt={12} letterSpacing={5} fontWeight={700} color={'red'}>Mavi Yaka Değerlendirme Sonuçları</Typography>



    </div>
  )
}

export default MyReports