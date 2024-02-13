import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: "",
    currentUser_Category: "",
    currentUserTitle: "",
    loading: false,
    error: false,
    securityKey: "",
    token: "",
    userInfo: [],
    userManagerInfo: [],
    allBonnaPersonel: []

}

const authSlice = createSlice({

    name: 'auth',

    initialState,

    reducers: {

        fetchStart: (state) => {
            state.loading = true;
            state.error = false;

            state.currentUser = "";

            state.currentUser = ""
            state.currentUser_Category = ""
            state.currentUserTitle = ""
            state.userInfo = []
            state.userManagerInfo = []

            state.token = ""
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true;

        },
        loginSuccess: (state, { payload }) => {
            // state.loading = false;
            // state.currentUser = payload[0]?.PERSONEL
            // state.currentUserTitle = payload[0].GOREV
            // state.userManagerInfo = JSON.parse(payload[0].YONETICI)
            // state.userInfo = payload[0]
            state.currentUser = payload?.NAME + " " + payload.SURNAME
            state.currentUserTitle = payload.ORGANIZASYONTIPIACIKLAMA
            state.userManagerInfo = payload.YONETICI
            state.userInfo = payload
      
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.currentUser = "";

            state.currentUser = ""
            state.currentUser_Category = ""
            state.currentUserTitle = ""
            state.userInfo = null
            state.userManagerInfo = []

            state.token = ""

        },
        fetchAllUsers: (state, { payload }) => {
            state.loading = false
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

    } = authSlice.actions

export default authSlice.reducer;





