import { APIAuthenticated } from "@/http";
import { STATUSES } from "@/misc/statuses";
import { createSlice } from "@reduxjs/toolkit";





const userSlice = createSlice({
    name:"users",
    initialState:{
        users: null,
        status: STATUSES.SUCCESS,
        searchTerm : ""
    },
    reducers:{                      // reducers are pure and synchronous , so no api calls
        setUsers(state,action){                       
            state.users = (action.payload)
        },
        setStatus(state,action){
            state.status = action.payload
        },
         deleteUserById(state, action) {
            const index = state.users.findIndex((user) =>user._id === action.payload.userId);
            state.users.splice(index, 1);
            
        },
        setSearchTerm(state,action){
            state.searchTerm = action.payload
        }
        
    }
})


export const {setStatus,setUsers,deleteUserById,setSearchTerm} = userSlice.actions
export default userSlice.reducer


// admin dont need to create users
// just fetch users 




// fetch your all order
export function fetchUsers(){
    return async function fetchUsersThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.get("/admin/users/")             
           dispatch(setUsers(response.data.data.reverse()))                 // .reverse() shows the newly added users to the top
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}





// delete user by id 
export function deleteUser(userId){
    return async function deleteUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            
             const response = await APIAuthenticated.delete(`/admin/users/${userId}`) 
      
           dispatch(deleteUserById({userId}))              // be aware of same name 
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}