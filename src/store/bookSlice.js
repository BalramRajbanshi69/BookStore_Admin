import { APIAuthenticated } from "@/http";
import { STATUSES } from "@/misc/statuses";
import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder } from "./orderSlice";




const bookSlice = createSlice({
    name:"book",
    initialState:{
        books: null,
        status: STATUSES.SUCCESS,
    },
    reducers:{                      // reducers are pure and synchronous , so no api calls
        setbooks(state,action){                       
            state.books = (action.payload)
        },
        setStatus(state,action){
            state.status = action.payload
        },
        deletebooksById(state, action) {
            const index = state.books.findIndex((book) =>book._id === action.payload.bookId);
            state.books.splice(index, 1);   
        },

        
        updatebooksStatusById(state, action) {
            const index = state.books.findIndex((book) =>book._id === action.payload.bookId);
            if(index !== -1){
                state.books[index] = action.payload.data;
            }
            
        },

        addbooks(state,action){
            state.books.push(action.payload)
        }
        
    }
})


export const {setStatus,setbooks,deletebooksById,updatebooksStatusById,addbooks} = bookSlice.actions
export default bookSlice.reducer


// just fetch bookss




// fetch your all order
export function fetchBooks(){
    return async function fetchBooksThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.get("/books/") 
            // console.log(response.data.data);
           dispatch(setbooks(response.data.data.reverse()))
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}


// add bookss 
export function addBooks(data){
    return async function addBooksThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.post("/books/",data,
                {
                    headers:{
                        "Content-Type":"multipart/form-data"                  // handle for image important
                    }
                }
            ) 
            console.log(response.data);
           dispatch(addbooks(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}

// delete bookss by id (admin)
export function deleteBooks(bookId){
    return async function deleteBooksThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/books/${bookId}`) 
            // console.log(response.data.data);
           dispatch(deletebooksById({bookId}))
           // After deleting the books from the backend, re-fetch all orders.
            // This will ensure your orders state is up-to-date with any changes
            // made by the backend (like removing the deleted books from orders).
            dispatch(fetchOrder()); // <-- Call the fetchOrder thunk
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}





// update booksStatus by id 
export function updateBooksStatus(bookId,bookStatus){
    return async function updateBooksStatusThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try { 
            
        const response = await APIAuthenticated.patch(`books/status/${bookId}`,{bookStatus}) 
        
        
           dispatch(updatebooksStatusById({bookId,data:response.data.data}))              // be aware of same name 
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}



// update stock and price  by id 
export function updateStockAndPrice(bookId,data){
    return async function updateStockAndPriceThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try { 
            
        const response = await APIAuthenticated.patch(`books/stockandprice/${bookId}`,data) 
           dispatch(updatebooksStatusById({bookId,data:response.data.data}))              // be aware of same name 
            dispatch(setStatus(STATUSES.SUCCESS));
           
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
            
        }

    }
}