import { APIAuthenticated } from "@/http";
import { STATUSES } from "@/misc/statuses";
import { createSlice } from "@reduxjs/toolkit";


const allDataSlice = createSlice({
    name:"data",
    initialState:{
    data:{},
    status:STATUSES.SUCCESS,
    },
    reducers:{
        setDatas(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }
    }
})

export const {setDatas,setStatus} = allDataSlice.actions
export default allDataSlice.reducer


// fetch all data in admin dashboard
export function fetchAllData(){
    return async function fetchAllDataThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.get("/admin/misc/getAllDatas") 
            
           dispatch(setDatas(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}