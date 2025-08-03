import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from './store/authSlice'

const ProtectedRoute = ({children}) => {
  const dispatch = useDispatch()
  const {data} = useSelector((state)=>state.auth)
  
  useEffect(()=>{
    dispatch(fetchProfile())
  },[])
  

  if(data.role == "ADMIN"){
    return (
      <>{children}</>
    )
  }else{
    return(
      <>You don't have permission</>
    )
  }
}

export default ProtectedRoute








