import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:false,
    all_performanceData:[],
    managerInfo:[],
    personelPerformanceData:[]
}

const performanceSlice=createSlice({

    name:'performance',

    initialState,

    reducers:{

        fetchStart:(state)=>{
            state.loading=true;
            state.error = false;
            state.all_performanceData=[]
            state.personelPerformanceData=[]
        },
        fetchFail:(state)=>{
            state.loading=false;
            state.error=true;

        },
        fetchPerformanceData:(state,{payload})=>{
            state.loading=false;
            state.personelPerformanceData=payload
        },
        fetchManagerData:(state,{payload})=>{
            state.loading=false
            state.managersPersonels=JSON.parse(payload[0].EKIP)
        }
        
    }

})

export const {
    fetchStart,
    fetchFail,
    fetchPerformanceData,
    fetchManagerData
    
    } = performanceSlice.actions

export default performanceSlice.reducer;




