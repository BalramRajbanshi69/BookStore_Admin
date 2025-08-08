import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooks, fetchBooks } from "@/store/bookSlice";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Tables() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {books} = useSelector((state)=>state.books);
  console.log("books",books);
  const [date,setDate] = useState("")
  const [searchTerm,setSearchTerm] = useState("")
  const [selectedItems,setSelectedItems] = useState("all")

   // filter books according to selectedItems that book select
  // const filteredBooks = selectedItems === "all" ? books: books.filter((book)=>book.bookstatus === selectedItems) ; // if selected is all show all those status book ,else show selected books status. bookstatus should be equal to book selected items
  // OR BEST WAY AND SHORTCUT
  const filteredBooks = books?.filter((book)=>selectedItems ==="all" || book.bookStatus === selectedItems)
  .filter((book)=>book._id.toLowerCase().includes(searchTerm.toLowerCase())  ||                // also search when your book _id should includes(match,present) , the selectedTerm that book select to search (|| means you can filter more according to your choice)
  book.title.toLowerCase().includes(searchTerm.toLowerCase())  ||        // search with title     // you can use || again and filter according to it whnat you gonna search accordingly
  book.author.toLowerCase().includes(searchTerm.toLowerCase()))              // search with author
  // book.price.toString().includes(searchTerm))              // search with price

  .filter((book)=>date === "" || new Date(book.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString())  
  

  useEffect(()=>{
    dispatch(fetchBooks())
  },[])


 const handleDeleteBook = (bookId)=>{
    try {
    dispatch(deleteBooks(bookId))
    toast.success("Book deleted successfully")
    } catch (error) {
      console.error(error);
      toast.error("failed to  delete book ")
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-2 p-6">
          <Typography variant="h6" color="white">
            Books Available
          </Typography>
        </CardHeader>

        {/* searchall */}
           <div className="flex items-center mx-4 md:mx-6 mb-4">
               <div>
          <select
            onChange={(e)=>setSelectedItems(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
            
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            
          </select>
          </div>
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

        <CardBody className=" px-0 pt-0 pb-2">
          <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[20px]">S.N.</th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[180px]">bookId</th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[100px]">title</th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase flex-1 min-w-[200px]">author</th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase min-w-[120px]">Registration</th>
                <th className="py-4 px-4 text-left text-gray-600 font-bold uppercase w-20">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {
                filteredBooks && filteredBooks.length > 0 && filteredBooks?.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <td className="py-4 px-4 border-b border-gray-200 text-center">{index + 1}</td>
                      <td
  className="py-4 px-4 border-b border-gray-200  truncate cursor-pointer relative overflow-hidden group"
  onClick={() => navigate(`/dashboard/books/${book._id}`)}
>
  <span className="relative inline-block font-semibold">
    {book._id}
    <span 
      className="absolute w-full bottom-[-2px] left-0 h-[1.5px] bg-gray-900 transform scale-x-0 transition-transform duration-500 ease-in-out  group-hover:scale-x-100"
    ></span>
  </span>
</td>
                      <td className="py-4 px-4 border-b border-gray-200">{book.title}</td>
                      <td className="py-4 px-4 border-b border-gray-200 truncate">{book.author}</td>
                     <td className="py-4 px-4 border-b border-gray-200 whitespace-nowrap">{new Date(book.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-4 border-b border-gray-200 text-center flex items-center cursor-pointer justify-center" onClick={()=>handleDeleteBook(book._id)}>
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

export default Tables;
