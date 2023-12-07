import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    loading:false,
    error:false,
    securityKey:"",
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
        loginSuccess:(state,{payload})=>{

            state.loading=false;
            state.currentUser=payload[0]?.NAME+" "+payload[0]?.SURNAME
            state.securityKey=payload[0]?.SECURITYKEY
        
            
        },
        logoutSuccess:(state)=>{
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
    loginSuccess,
    logoutSuccess,

}=authSlice.actions

export default authSlice.reducer;





