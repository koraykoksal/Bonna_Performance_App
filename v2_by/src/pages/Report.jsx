import React from 'react'
import usePerformanceCall from '../hooks/usePerformanceCall'
import { useState,useEffect } from 'react'

const Report = () => {

  const {get_myAll_PerformanceData} = usePerformanceCall()


  useEffect(() => {

  }, [])
  

  return (
    <div>Report</div>
  )
}

export default Report