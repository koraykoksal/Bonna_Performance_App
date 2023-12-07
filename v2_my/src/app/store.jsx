
import { configureStore ,getDefaultMiddleware} from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import performanceReducer from '../features/performanceSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store=configureStore({

  reducer:{
    auth:persistedReducer,
    performance:performanceReducer,
  }

  
  ,devTools: process.env.NODE_ENV !== "production",

   //consolda çıkan serileştirme hatasını göstermiyor
   middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  
})


export const persistor = persistStore(store)
export default store

