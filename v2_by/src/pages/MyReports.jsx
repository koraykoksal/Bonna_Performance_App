import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useEffect } from 'react'



const MyReports = () => {


    const {get_myAll_PerformanceData} = usePerformanceCall()

  
    useEffect(() => {
      

        get_myAll_PerformanceData('my-performance')

    }, [])
    
    

    
  return (
    <div>myreports</div>
  )
}

export default MyReports