import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { my1Titles, my2Titles } from '../helper/data';
import My1_Table from './My1_Table';
import My2_Table from './My2_Table';

const MyTable = ({ personelPerformanceData, info }) => {

  const [personelData, setPersonelData] = useState([])

  const [my1Status, setmy1Status] = useState(null)
  const [my2Status, setmy2Status] = useState(null)



  useEffect(() => {

    //personelin birden fazla performans kaydı olduğunu düşünürsek yönetici değerlendirmesi öncesinde personelin son yapılan performans kaydını getirmek gerekir

    const dizi = Object.keys(personelPerformanceData).map(key => { return { id: key, ...personelPerformanceData[key] } })
    const lastKey = dizi.sort()[dizi.length - 1]

    setPersonelData(lastKey)



  }, [personelPerformanceData])



  useEffect(() => {

    const my1data = my1Titles.find((item) => personelData?.gorev == item.title)

    if (my1data) {
      setmy1Status(true)
    }
    else {

      setmy1Status(false)

      const my2data = my2Titles.find((item) => personelData?.gorev == item.title)

      if (my2data) {
        setmy2Status(true)
      }
      else {
        setmy2Status(false)
      }

    }


  }, [personelData, info])




  return (
    <div>

      {
        my1Status && <My1_Table personelData={personelData}/>
      }

      {
        my2Status && <My2_Table personelData={personelData}/>
      }

    </div>
  )
}

export default MyTable