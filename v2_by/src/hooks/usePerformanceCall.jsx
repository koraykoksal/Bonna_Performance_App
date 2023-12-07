import React from 'react'
import {toastSuccessNotify,toastErrorNotify} from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import { 
    fetchFail, 
    fetchStart,
    fetchPerformanceData 

} from '../features/performanceSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const useBlogCall = () => {
  
    const distpatch=useDispatch()
    const navi=useNavigate()



    const post_new_performanceData=async (url)=>{

        distpatch(fetchStart())

        try {
            
            let data=""

            distpatch(fetchPerformanceData())

        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify("Something Went Wrong !")
        }


    }




    return {
        post_new_performanceData
        
    }
}



export default useBlogCall