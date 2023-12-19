import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    loading:false,
    error:false,
    token:"",
    userInfo:[],
    managerPersonels:[]

}

const authSlice=createSlice({

    name:'auth',

    initialState,

    reducers:{

        fetchStart:(state)=>{
            state.loading=true;
            state.error = false;
            state.userInfo =[]
            state.managerPersonels=[]
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
        fetchLoginManagerPersonels:(state,{payload})=>{
            state.loading=false
            state.managerPersonels=JSON.parse(payload[0].EKIP) //yönetici altında yer alan ekip bilgisi
        },
        fetchLogoutSuccess:(state)=>{
            state.loading=false;
            state.currentUser = "";
            state.token="";
            state.userInfo =[]
            state.managerPersonels=[]

        },

    }


})

export const
{
    fetchStart,
    fetchFail,
    fetchLoginSuccess,
    fetchLogoutSuccess,
    fetchLoginManagerPersonels,

}=authSlice.actions

export default authSlice.reducer;





