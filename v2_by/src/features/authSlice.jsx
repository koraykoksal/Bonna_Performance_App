import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    loading:false,
    error:false,
    token:"",
    userInfo:[]

}

const authSlice=createSlice({

    name:'auth',

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
        fetchLoginSuccess:(state,{payload})=>{

            state.loading=false;
            state.currentUser=payload[0]?.NAME+" "+payload[0]?.SURNAME
            state.securityKey=payload[0]?.SECURITYKEY
            state.userInfo = payload[0]
        
            
        },
        fetchLogoutSuccess:(state)=>{
            state.loading=false;
            state.currentUser = "";
            state.token="";

        },

    }


})

export const
{
    fetchStart,
    fetchFail,
    fetchLoginSuccess,
    fetchLogoutSuccess,

}=authSlice.actions

export default authSlice.reducer;





