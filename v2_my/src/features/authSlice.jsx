import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    currentUser_Category:"",
    currentUserTitle:"",
    loading:false,
    error:false,
    securityKey:"",
    token:"",
    userInfo:[],
    userManagerInfo:[],
    allBonnaPersonel:[]

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

            // console.log("payload: ",payload)

            state.loading=false;
            state.currentUser=payload[0]?.PERSONEL
            state.currentUserTitle=payload[0].GOREV
            state.userManagerInfo = JSON.parse(payload[0].YONETICI)
            state.userInfo = payload[0]
        },
        logoutSuccess:(state)=>{
            state.loading=false;
            state.currentUser = "";
            state.token="";

        },
        fetchAllUsers:(state,{payload})=>{
            state.loading=false
            state.allBonnaPersonel = payload
        }

    }


})

export const
{
    fetchStart,
    fetchFail,
    loginSuccess,
    logoutSuccess,
    fetchAllUsers

}=authSlice.actions

export default authSlice.reducer;





