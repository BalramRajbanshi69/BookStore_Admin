import { configureStore } from '@reduxjs/toolkit';

import authReducer from "./authSlice"
import allDataReducer from "./allDataSlice"
import userReducer from "./userSlice"
import bookReducer from "./bookSlice"
import orderReducer from "./orderSlice"


const store = configureStore({
    reducer:{
        auth : authReducer ,
        datas: allDataReducer,
        users: userReducer,
        books:bookReducer,
        orders:orderReducer
    }
})

export default store;






