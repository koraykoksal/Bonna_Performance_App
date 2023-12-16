import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:false,
    all_performanceData:[],
    managerInfo:[],
    managersPersonels:[]
}

const performanceSlice=createSlice({

    name:'performance',

    initialState,

    reducers:{

        fetchStart:(state)=>{
            state.loading=true;
            state.error = false;
            state.all_performanceData=[],
            state.managerInfo=[],
            state.managersPersonels=[]
        },
        fetchFail:(state)=>{
            state.loading=false;
            state.error=true;

        },
        fetchPerformanceData:(state,{payload})=>{
            console.log("payload: ",payload)

            state.loading=false;
            // state.all_performanceData=action?.payload


        },
        
    }

})

export const {
    fetchStart,
    fetchFail,
    fetchPerformanceData,
    
    } = performanceSlice.actions

export default performanceSlice.reducer;




