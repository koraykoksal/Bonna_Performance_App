import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:false,
    all_performanceData:[],
}

const blogSlice=createSlice({

    name:'blog',

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
        fetchPerformanceData:(state,action)=>{
            state.loading=false;
            state.all_performanceData=action?.payload


        },
        
    }

})

export const {
    fetchStart,
    fetchFail,
    fetchPerformanceData,
    
    } = blogSlice.actions

export default blogSlice.reducer;




