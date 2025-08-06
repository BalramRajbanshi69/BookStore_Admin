import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, orderDelete } from "@/store/orderSlice";
import toast from "react-hot-toast";

export function Notifications() {
  const dispatch = useDispatch()
  const {orders} = useSelector((state)=>state.orders)
  console.log("orders",orders);
  const [searchTerm,setSearchTerm] = useState("")
  const [date,setDate] = useState("");
  const [selectedItems,setSelectedItems] = useState("all")

  useEffect(()=>{
    dispatch(fetchOrder())
  },[dispatch])

  const handleOrderDelete =(orderId) => { 
  try {
    dispatch(orderDelete(orderId));
  toast.success("Order deleted successfully!");
  } catch (error) {
    console.error(error);
    toast.error("failed deleting orders")
  }
};


  // filter orders according to selectedItems that user select
  // const filteredOrders = selectedItems === "all" ? orders: orders.filter((order)=>order.orderStatus === selectedItems) ; // if selected is all show all those status order ,else show selected orders status. orderStatus should be equal to user selected items
  // OR BEST WAY AND SHORTCUT
  const filteredOrders = orders?.filter((order)=>selectedItems ==="all" || order.orderStatus === selectedItems)             // it says that if initially set all true and if false select according to orderStatus user selected
  .filter((order)=>order._id.toLowerCase().includes(searchTerm.toLowerCase())  ||                // also search when your order _id should includes(match,present) , the selectedTerm that user select to search (|| means you can filter more according to your choice)
  order.paymentDetails.method.toLowerCase().includes(searchTerm.toLowerCase())  ||                 // you can use || again and filter according to it whnat you gonna search accordingly
  order?.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||             // you can use || again and filter according to it whnat you gonna search accordingly
  order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase()))                // you can use || again and filter according to it whnat you gonna search accordingly
  .filter((order)=>date === "" || new Date(order.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString())        // filter according to date order created at

  return (
   
     <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-2 p-6">
              <Typography variant="h6" color="white">
                Orders Available
              </Typography>
            </CardHeader>
    
            {/* filter by order Status */}
        <div className="flex items-center mx-4 md:mx-6 mb-4">
            <div>
          <select
            onChange={(e)=>setSelectedItems(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
            
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="preparation">Preparation</option>
            <option value="ontheway">Ontheway</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          </div>
          {/* search */}
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block "
                onChange={(e)=>setSearchTerm(e.target.value)}
                type="text"
                value={searchTerm}
                id=""
                placeholder="search..."
              />
            </div>

            {/* date */}
            <div className=" bg-gray-50 items-center p-2 rounded-md">
              <input
                className="bg-gray-50 outline-none ml-1 block "
                onChange={(e)=>setDate(e.target.value)}
                type="date"
                value={date}
                id=""
                
              />
            </div>
          </div>
          </div>
    
            <CardBody className=" px-0 pt-0 pb-2">
              <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[20px]">S.N.</th>
                    <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[100px]">Username</th>
                    <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[100px]">UserId</th>
                    <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase flex-1 min-w-[200px]">Payment Status</th>
                    <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[120px]">Order Status</th>
                    <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[120px]">Total Amount</th>
                    <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[120px]">Ordered At</th>
                    <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase w-20">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {
                    filteredOrders && filteredOrders.length > 0 && filteredOrders?.map((order, index) => {
                      return (
                        <tr key={order._id}>
                          <td className="py-4 px-4 border-b border-gray-200 text-center">{index + 1}</td>
                          <td className="py-4 px-4 border-b border-gray-200 truncate">{order?.user?.username}</td>
                          <td className="py-4 px-4 border-b border-gray-200">{order?._id}</td>
                       
                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full
                                  ${
                                    order.paymentDetails.status === "paid"
                                      ? "text-green-900 bg-green-200"
                                      : "text-red-900 bg-red-200"
                                  }
                                `}
                          >
                            <span className="relative">
                              {order.paymentDetails.status} (
                              {order.paymentDetails.method})
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full
                                  ${
                                    order.orderStatus === "pending"
                                      ? "text-red-900 bg-red-200"
                                      : "text-green-900 bg-green-200"
                                  }
                                `}
                          >
                            <span className="relative">
                              {order.orderStatus}
                            </span>
                          </span>
                        </td>
                         <td className="py-4 px-4 border-b border-gray-200 whitespace-nowrap">{order?.totalAmount}</td>
                         <td className="py-4 px-4 border-b border-gray-200 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-4 border-b border-gray-200 text-center flex items-center cursor-pointer justify-center" onClick={()=>handleOrderDelete(order?._id)} >
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
  );
}

export default Notifications;
