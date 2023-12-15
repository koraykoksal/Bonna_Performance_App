import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:false,
    all_performanceData:[],

}

const performanceSlice=createSlice({

    name:'performance',

    initialState,

    reducers:{

        fetchStart:(state)=>{
            state.loading=true;
            state.error = false;
        },
        fetchFail:(state)=>{
            state.loading=false;
            state.error=true;

        },
        fetchPerformanceData:(state,{payload})=>{
         
            state.loading=false;
            state.all_performanceData=payload


        },
        
        
    }

})

export const {
    fetchStart,
    fetchFail,
    fetchPerformanceData,
    
    } = performanceSlice.actions

export default performanceSlice.reducer;




