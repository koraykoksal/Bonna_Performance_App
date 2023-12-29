import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:false,
    all_performanceData:[],
    managerInfo:[],
    personelPerformanceData:[],
    raiseData:[],
    byOkrPerformance:[],
    unSelectedData:[]
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
            state.raiseData=[]
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
        },
        fetchAllPerformanceData:(state,{payload})=>{
            state.loading=false
            state.all_performanceData = payload
        },
        fetchByOKRPerformanceData:(state,{payload})=>{
            state.loading=false
            state.byOkrPerformance = payload
        },
        fetchRaiseData:(state,{payload})=>{
            state.loading=false
            state.raiseData = payload
        },
        fetchUnSelectedPersonelData:(state,{payload})=>{
            state.loading=false
            state.unSelectedData=payload
        }
    }

})

export const {
    fetchStart,
    fetchFail,
    fetchPerformanceData,
    fetchManagerData,
    fetchAllPerformanceData,
    fetchRaiseData,
    fetchByOKRPerformanceData,
    fetchUnSelectedPersonelData
    
    } = performanceSlice.actions

export default performanceSlice.reducer;




