import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Typography,
  CardBody
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import s1 from "../../../img/BookTitleLogo.jpg"
import { fetchOrder, orderDelete, updateOrderStatus, updatePaymentStatus } from '@/store/orderSlice';

const SingleOrder = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders } = useSelector((state) => state.orders)

  const [newOrder, setNewOrder] = useState([])

  const [filteredOrder] = orders ? orders.filter((order) => order._id === id) : newOrder.filter((order) => order._id === id)

  const [orderStatus, setOrderStatus] = useState(filteredOrder?.orderStatus)
  const [paymentStatus, setPaymentStatus] = useState(filteredOrder?.paymentStatus)

  useEffect(() => {
    dispatch(fetchOrder())
  }, [])

  const handleOrderChange = (e) => {
    setOrderStatus(e.target.value)
    dispatch(updateOrderStatus(id, e.target.value))
    toast.success(`Order Status changed to: ${e.target.value}`)
  }

  const handlePaymentChange = (e) => {
    setPaymentStatus(e.target.value)
    dispatch(updatePaymentStatus(id, e.target.value))
    toast.success(`Payment Status changed to: ${e.target.value}`)
  }

  const handleOrderDelete = () => {
    try {
      dispatch(orderDelete(id))
      navigate("/dashboard/orders")
      toast.success("Order deleted successfully")
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order")
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-2 p-6">
          <Typography variant="h6" color="white">
            Single Order Details
          </Typography>
        </CardHeader>
        <CardBody className="p-4 md:p-6 lg:p-8">
          <div className="overflow-hidden">
            <div className="item-start mb-6 flex flex-col justify-start space-y-2">
              <h1 className="text-2xl leading-4 text-gray-800 dark:text-white lg:text-2xl">
                {" "}
                <span className="font-semibold">OrderId</span> : {id}
              </h1>
              <p className="text-2xl text-gray-800 dark:text-white lg:text-2xl">
                {" "}
                <span className="font-semibold">Order CreatedAt </span> :{" "}
                {filteredOrder &&
                  new Date(filteredOrder?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className='w-full h-[1px] border border-gray-600'></div>
          </div>
          
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 my-8'>
            {/* Left side: Book Items */}
            <div className='lg:col-span-2 space-y-8'>
              {
                filteredOrder && filteredOrder.items.length > 0 && filteredOrder.items.map((item) => {
                  return (
                    <div key={item._id} className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 border-b pb-4'>
                      <div className='w-full md:w-1/3'>
                        <img className='w-full md:w-60' src={item?.book?.bookImage ? item?.book?.bookImage : s1} alt={item?.book?.title} />
                      </div>
                      <div className='w-full md:w-2/3 flex flex-col justify-start space-y-2'>
                        <p className='text-lg'> <span className='font-semibold'>BookId:</span> {item?.book?._id}</p>
                        <p className='text-lg'> <span className='font-semibold'>Title:</span> {item?.book?.title}</p>
                        <p className='text-lg'> <span className='font-semibold'>Author:</span> {item?.book?.author}</p>
                        <p className='text-lg'> <span className='font-semibold'>Description:</span> {item?.book?.description}</p>
                        <p className='text-lg'> <span className='font-semibold'>Publication:</span> {item?.book?.publication}</p>
                        <p className='text-lg'> <span className='font-semibold'>QTY(quantity):</span> {item.quantity}</p>
                        <p className='text-lg'> <span className='font-semibold'>Price NPR:</span> {item?.book?.price}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            {/* Right side: Customer Details and Status Updates */}
            <div className='lg:col-span-1'>
              <div className="bg-gray-200 dark:bg-gray-800 w-full flex flex-col items-center md:items-start p-6">
                <h3 className="text-xl dark:text-white font-semibold leading-4 text-gray-800 underline underline-offset-4 ">Customer</h3>
                <div className="flex flex-col justify-start items-stretch h-full w-full">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800 mt-4">UserName : {filteredOrder?.user?.username}</p>
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800 mt-2">Address : {filteredOrder?.shippingAddress}</p>
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800 mt-2">Phone : {filteredOrder?.phoneNumber}</p>
                  </div>
                  <div className='mt-8'>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">Select Order Status</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleOrderChange} value={orderStatus}>
                      <option value="pending">Pending</option>
                      <option value="preparation">Preparation</option>
                      <option value="ontheway">Ontheway</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">Select Payment Status</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full my-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handlePaymentChange} value={paymentStatus}>
                      <option value="unpaid">Unpaid</option>
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  {
                    filteredOrder?.orderStatus !== "cancelled" && (
                      <div className="flex w-full justify-center items-center md:justify-start md:items-start mt-4">
                        <button onClick={handleOrderDelete} className="bg-red-700 border-none text-white cursor-pointer rounded dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-full text-base font-medium leading-4 ">Delete Order</button>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          
          {/* Summary and Shipping */}
          <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8 px-4 md:px-6 my-12">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">Payment Method</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.paymentDetails?.method}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.paymentDetails?.status}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredOrder?.orderStatus}</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Grand Total</p>
                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{filteredOrder?.totalAmount}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-8">
                    <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800"> Delivery Charge<br /><span className="font-normal">Delivery with 24 Hours</span></p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs 100</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default SingleOrder