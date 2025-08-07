
import { deleteUser, fetchUsers } from "@/store/userSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Typography

} from "@material-tailwind/react";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {users,searchTerm} = useSelector((state)=>state.users)
  console.log(users);

  // const [date,setDate] = useState("")


   // filter users according to selectedItems that user select
  // const filteredusers = selectedItems === "all" ? users: users.filter((user)=>user.userstatus === selectedItems) ; // if selected is all show all those status user ,else show selected users status. userstatus should be equal to user selected items
  // OR BEST WAY AND SHORTCUT
  const filteredUsers = users?.filter((user)=>user._id.toLowerCase().includes(searchTerm.toLowerCase())  ||                // also search when your user _id should includes(match,present) , the selectedTerm that user select to search (|| means you can filter more according to your choice)
  user.username.toLowerCase().includes(searchTerm.toLowerCase())  ||        // search with username     // you can use || again and filter according to it whnat you gonna search accordingly
  user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||              // search with email
  user.phone.toString().includes(searchTerm))              // search with phone

  // .filter((user)=>date === "" || new Date(user.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString())        // filter according to date user created at
  

  useEffect(()=>{
    dispatch(fetchUsers())
  },[])

  const handleDeleteId = (userId)=>{
    try {
    dispatch(deleteUser(userId))
    toast.success("User deleted successfully")
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user") 
      
    }
  }
  
  
  
  return (
    <>
     <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 ">
          <Typography variant="h6" color="white">
            All Registered Users
          </Typography>


        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

<div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-6">

  <table className="w-full">
  <thead>
    <tr className="bg-gray-100">
      <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[20px]">S.N.</th>
      <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[180px]">UserId</th>
      <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[100px]">Username</th>
      <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase flex-1 min-w-[200px]">Email</th>
      <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[150px]">PhoneNumber</th>
      <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[120px]">Registered At</th>
      <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase w-20">Action</th>
    </tr>
  </thead>
  <tbody className="bg-white">
    {
      filteredUsers && filteredUsers.length > 0 && filteredUsers?.map((user, index) => {
        return (
          <tr key={user._id}>
            <td className="py-4 px-4 border-b border-gray-200 text-center">{index + 1}</td>
            <td className="py-4 px-4 border-b border-gray-200 truncate font-semibold">{user._id}</td>
            <td className="py-4 px-4 border-b border-gray-200">{user.username}</td>
            <td className="py-4 px-4 border-b border-gray-200 truncate">{user.email}</td>
            <td className="py-4 px-4 border-b border-gray-200 whitespace-nowrap">{user.phone}</td>
            <td className="py-4 px-4 border-b border-gray-200 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
            <td className="py-4 px-4 border-b border-gray-200 text-center flex items-center cursor-pointer justify-center" onClick={()=>handleDeleteId(user._id)}>
            <FaTrashAlt size={20} color="red" />
            </td>
          </tr>
        )
      })
    }
  </tbody>
</table>
</div>

        </CardBody>
      </Card>
      
    </div>
    </>
  );
}

export default Profile;
