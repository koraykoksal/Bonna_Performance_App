import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import usePerformanceCall from '../hooks/usePerformanceCall'
import useAuthCall from '../hooks/useAuthCall'


const AllResults = () => {

  const { all_performanceData, raiseData } = useSelector((state) => state.performance)
  const { twiserAccesToken } = useSelector((state) => state.auth)
  const { byOkrPerformance } = useSelector((state) => state.performance)
  const { twiserLogin } = useAuthCall()
  const { get_raiseData, get_All_PerformanceData , get_beyazYaka_performanceData} = usePerformanceCall()
  const [zamData, setZamData] = useState([])

  //* zam oranı ve yönetici performans değerlendirme sonuçlarını çek
  useEffect(() => {
    get_raiseData('raise-data')
    get_All_PerformanceData('manager-evaluation')

    if(!twiserAccesToken){
      twiserLogin()
    }
  }, [])


  //* beyaz yaka okr sonuçlarını al
  useEffect(() => {
    get_beyazYaka_performanceData()
  }, [twiserAccesToken])
  

  //* zam oranı bilgisininde son kayıt edilen zam oranı bilgisini çek
  useEffect(() => {

    const data = Object.values(raiseData)
    const lastData = data.sort()[data.length -1]

    setZamData(lastData)
    
  }, [raiseData])
  
  

  return (
    <div>AllResults</div>
  )
}

export default AllResults