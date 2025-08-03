import { configureStore } from '@reduxjs/toolkit';

import authReducer from "./authSlice"
import allDataReducer from "./AllDataSlice"


const store = configureStore({
    reducer:{
        auth : authReducer ,
        datas: allDataReducer
    }
})

export default store;






