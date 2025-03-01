"use client";
import { useEffect, useState } from 'react';
import axios from "axios"
import Image from 'next/image';
import Link from 'next/link';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import WorkIcon from '@mui/icons-material/Work';
const Fixed = () => {
  const [search,setsearch]=useState("");
  const [count,setcount]=useState(16);
  const [products,setproducts]=useState([]);
  const [selectedcategory,setselectedcategory]=useState("")
  const [galleryimages,setgalleryimages]=useState([]);
  const [images,setimages]=useState([])
  useEffect(()=>{
    async function fetchdata(){
    const req=await fetch("https://fakestoreapi.com/products");
    const data=await req.json();
    setproducts(data);
    console.log(data);
    setgalleryimages(data.map((item)=>item.image))
    }
    fetchdata();
},[])
 //get products result of chosen category
 const fetchProducts=(category="")=>{
    let url="https://fakestoreapi.com/products";
    if(category) url+=`/category/${category}`;
    axios.get(url)
    .then((response)=>{
    const imgurl=response.data.map(item=>item.image)
    setimages(imgurl)
    })
    }
    //change category
    const handlecatchane=(event)=>{
    const category=event.target.value;
    setselectedcategory(category)
    fetchProducts(category)
    }
    const filtedata=products.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item)=>selectedcategory? item.category === selectedcategory:true)
  return (
    <div className="container mx-auto p-6">
    {/*  arrow*/}
    <Link href="/historic" className='text-black w-[12px] h-[24px] flex text-center items-center justify-center mx-auto '><KeyboardArrowRightIcon /></Link>
     {/* search */}
     <h2 className='text-black/90 flex text-center mx-auto justify-center items-center font-bold mt-7 mb-4 text-2xl'>Discover Our Story</h2>
    <div className=" relative w-full max:w-md mx-auto">
    <SearchIcon className='absolute inset-y-11  lg:left-64 lg:top-5 md:left-8 md:top-5 flex  justify-center items-center text-gray-500 hover:text-blue-500 '/>
    <input type="text"
     placeholder='          Search for Historic area'
     className='border px-3 w-[767px]  h-[64px] flex  mx-auto justify-center mb-4 rounded-full border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
     onChange={(e)=>setsearch(e.target.value)}
     />
     <TuneIcon className='absolute lg:right-64 lg:top-5 md:right-9 md:top-3 text-gray-500 hover:text-blue-500 '/>
    </div>
    <div className='flex justify-between items-center py-7'>
    <div className='flex flex-col'>
    <h1 className=" md:text-3xl mb-4 lg:text-5xl text-7xl text-black font-semibold   tracking-wide">
    Fixed Artifacts
          </h1>
          <span className="text-2xl font-light text-gray-400"> Welcome to Artifacts</span>
    </div>
    <div>
    <select  className=' cursor-pointer border-none py-3 px-5' value={selectedcategory}  onChange={handlecatchane}>
  <option value="">all categories</option>
  {
  filtedata.map((item)=>(
  <option key={item.id} value={item.category}>{item.category}</option>
  ))
  }
  </select>    </div>
   </div>
     {/* filter */}
   <div className="grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 md:mx-auto md:gap-44 lg:gap-y-[65px] lg:gap-x-[40px] container mx-auto p-6 ">
        {
        filtedata.slice(0,count).map((item)=>(
        <div key={item.id} className=' p-4 shadow rounded-lg relative cursor-pointer object-fill'>
              <Image 
              src={item.image}
              alt={item.title}
              width={175}
              height={175}
              className='object-cover '
              />
              <div className='absolute top-0 left-0 bg-black/30 hover:bg-black/50 justify-center flex-col h-[330px] w-[100%] text-white items-center  py-[5rem] px-[0.7rem] rounded-2xl ' >
              <h2 className='text-lg font-bold text-white '>{item.title}</h2>
              <h6 className='text-white mt-4'>{item.category}</h6>
              <div className='flex justify-between items-center'> 
              <Link href={{pathname:`/product/${item.id} `,query:{data:JSON.stringify(item)} }} as={`/product/${item.id}`} className='text-white'>
              <div className='flex relative items-center '>
              <button className='bg-black/20 mt-2  text-white w-[125.5px] h-[50px] hover:bg-black/60 '>View</button>
              <ArrowOutwardIcon className='absolute left-24'/>
              </div>
              </Link>
              <WorkIcon className='text-white hover:text-black/60'/>
              </div>
              </div>
        </div>
        ))
        }
   </div>
  {
  count <products.length && (
  <button className='lg:mt-10 md:mt-48 p-2 text-blue-950 font-medium mx-auto items-center hover:bg-black/50 hover:text-white hover:border-none flex justify-center  border border-blue-400 rounded w-[319px] h-[50px]'
  onClick={()=>setcount((prev)=>prev+16)}
  >
  Explore more
  </button>
  )
  }
  </div>
  )
}
export default Fixed
