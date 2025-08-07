import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Typography,
  CardBody
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, updateBooksStatus, updateStockAndPrice } from '@/store/bookSlice';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import s1 from "../../../img/BookTitleLogo.jpg"
import { APIAuthenticated } from '@/http';

const SingleBook = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {books} = useSelector((state)=>state.books)

    
    const [orders,setOrders] = useState([])  // to show how much order a single book has done 
    // console.log("orders",orders);
    

    const [newBook,setNewBook] = useState([])
    const [filteredBook] = books ?  books.filter((book) => book._id === id) : newBook.filter((book) => book._id === id) // here we need only single selected book deteail so, book._id should be equal to selected book id from params . directly array desctructing beacuse it coming array

    useEffect(()=>{
        dispatch(fetchBooks())
    },[])

    const [bookStatus, setBookStatus] = useState(
    filteredBook?.bookStatus
  );


    const handleBookStatus = (e) => {
    setBookStatus(e.target.value);
    dispatch(updateBooksStatus(id, e.target.value));
    toast.success(`Book Status changed to ${e.target.value}`)
  };

    const handleChange = (value, name) => {
    let data = {};
    if (name === "price") {
      data.price = value;
    } else {
      data.stockQuantity = value;
    }
    dispatch(updateStockAndPrice(id, data));

  };



   // fetching to get orders of book
  const fetchOrdersBook = async()=>{
    const response = await APIAuthenticated.get(`/books/bookOrders/${id}`)
    
   if(response.status ===200){
     setOrders(response.data.data)
   }
  }
  useEffect(()=>{
    fetchOrdersBook()  
     
  },[])
    

  return (
     <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-2 p-6">
          <Typography variant="h6" color="white">
            Single Book Details
          </Typography>
        </CardHeader>
         <CardBody className=" px-0 pt-0 pb-2">
        <div className=" overflow-hidden mx-4 md:mx-6">
            <div className="item-start my-6 flex flex-col justify-start space-y-2">
          <h1 className="text-2xl leading-4 text-gray-800 dark:text-white  lg:text-2xl">
            {" "}
            <span className="font-semibold">BookId</span> : {id}
          </h1>
          <p className="text-2xl text-gray-800 dark:text-white   lg:text-2xl">
            {" "}
            <span className="font-semibold">Book CreatedAt </span> :{" "}
            {filteredBook &&
              new Date(filteredBook?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className='w-full h-[1px] border border-gray-600'></div>
        </div>

        <div className='flex justify-between gap-8 mx-4 md:mx-6 my-12'>
            <div className='flex w-2/3'>
                <div className='w-[40%]'>
                   <img className='w-60 ' src={filteredBook && filteredBook?.bookImage.length > 0 && filteredBook?.bookImage ? filteredBook?.bookImage : s1} alt={filteredBook?.title} />
                </div>
                <div className='w-[60%] flex flex-col justify-start space-y-2'>
                <p className='text-lg'> <span className='font-semibold'>Title : </span>{filteredBook?.title}</p>
                <p className='text-lg'> <span className='font-semibold'>Author : </span>{filteredBook?.author}</p>
                <p className='text-lg'> <span className='font-semibold'>Description : </span>{filteredBook?.description}</p>
                <p className='text-lg'> <span className='font-semibold'>Status : </span>{filteredBook?.bookStatus}</p>
                <p className='text-lg'> <span className='font-semibold'>Price NPR : </span>{filteredBook?.price}</p>
                <p className='text-lg'> <span className='font-semibold'>Stock Quantity: </span>{filteredBook?.stockQuantity}</p>
                <p className='text-lg'> <span className='font-semibold'>Published Date : </span>{filteredBook?.publication}</p>
                </div>
            </div>
            <div className='w-1/3'>
            
          <div className="flex  h-[300px] w-full flex-col items-center justify-between bg-gray-50 px-4 py-6 dark:bg-gray-800 md:items-start md:p-6 xl:w-96 xl:p-8">
            <h3 className="text-xl font-semibold leading-4 text-gray-800 underline underline-offset-4 dark:text-white ">
              Customer
            </h3>
            <div className="flex h-full w-full flex-col items-stretch justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0">
              <div className="mt-6 flex w-full flex-col items-stretch justify-between md:mt-0  my-6 xl:h-full">
                <div className="mt-3">
                  {/* update product status */}
                  <label class="block  text-sm font-medium text-gray-900 dark:text-gray-400">
                    Select Book Status
                  </label>
                  <select
                    className="focus:bg-blue-500  dark:focus:bg-blue-500  block w-full rounded-lg border-2 border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
                    onClick={handleBookStatus}
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>

                {/* update payment status */}
                <div>
                  <label class="block mt-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Update Book Stock
                  </label>
                  <input
                    type="number"
                    value={filteredBook?.stockQuantity}
                    name="tsq"
                    id="tsq"
                    min={0}
                    max={500}
                    className=" focus:bg-blue-500 mb-2  dark:focus:bg-blue-500  block w-full rounded-lg border-2 border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
                    onChange={(e) => handleChange(e.target.value, "tsq")}
                  />
                  <label class="block  text-sm font-medium text-gray-900 dark:text-gray-400">
                    Update Book Price
                  </label>
                  <input
                    value={filteredBook?.price}
                    onChange={(e) => handleChange(e.target.value, "price")}
                    type="number"
                    name="price"
                    id="price"
                    min={0}
                    className="focus:bg-blue-500  dark:focus:bg-blue-500  block w-full rounded-lg border-2 border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div></div>
        </div>

        <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
  <div className="flex w-full flex-col items-start justify-start bg-gray-50 px-4 py-4 dark:bg-gray-800 md:p-6 md:py-6 xl:p-8">
    <p className="text-lg font-semibold leading-6 text-gray-800 underline underline-offset-4 dark:text-white md:text-xl xl:leading-5">
      Orders
    </p>

    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden mt-4">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              OrderId
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              OrderStatus
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Shipping Addresss
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.length > 0 &&
            orders.map((order, index) => (
              <tr key={order._id}>
                {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-[#540b0e] whitespace-no-wrap font-bold hover:cursor-pointer hover:underline">
                    {order._id}
                  </p>
                </td> */}

               <td
  className="py-4 px-4 border-b border-gray-200  truncate cursor-pointer relative overflow-hidden group"
  onClick={() => navigate(`/dashboard/orders/${order?._id}`)}
>
  <span className="relative inline-block font-semibold">
    {order?._id}
    <span 
      className="absolute w-full bottom-[-2px] left-0 h-[1.5px] bg-gray-900 transform scale-x-0 transition-transform duration-500 ease-in-out  group-hover:scale-x-100"
    ></span>
  </span>
</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap font-semibold">
                    {order.orderStatus}
                  </p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap font-semibold">
                    {order.phoneNumber}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap font-semibold">
                    {order.shippingAddress}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


        </CardBody>
        </Card>
        </div>
  )
}

export default SingleBook