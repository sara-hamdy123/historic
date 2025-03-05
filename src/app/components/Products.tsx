"use client";
import { useEffect, useState } from 'react';
import axios from "axios"
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/grid"
import { Navigation, Pagination, Grid } from 'swiper/modules';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import WorkIcon from '@mui/icons-material/Work';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const Products = () => {
  const [products,setproducts]=useState([]);
  const [galleryimages,setgalleryimages]=useState([]);
  const [search,setsearch]=useState("");
  const [count,setcount]=useState(8)
  const [countimg,setcountimg]=useState(6)
  const [currentimage,setcurrentimage]=useState("")
  const [isopen,setisopen]=useState(false)
  const [selectedimg,setselectedimg]=useState(null)
  const [currentindex,setcurrentindex]=useState(0)
  const [categories,setcategories]=useState([])
  const [selectedcategory,setselectedcategory]=useState("")
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
  //next image in slider
  const nextImage =()=>{
  if(currentindex<products.length -1){
  setcurrentindex(currentindex+1)
  }
  }
  // prev image in slider
  const prevImage =()=>{
    if(currentindex>0){
    setcurrentindex(currentindex-1)
    }
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
            Historic Area
        </h1>
        <span className="text-2xl font-light text-gray-400"> Welcome to traps For Our Hestoric</span>
  </div>
  <div>
  <p className='text-gray-400'>Total num : 23</p>
  </div>
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
            <div className='absolute top-0 left-0 bg-black/30 hover:bg-black/50 justify-center flex-col h-full overflow-hidden w-[100%] text-white items-center  py-[5rem] px-[0.7rem] rounded-2xl ' >
            <h2 className='text-lg font-bold text-white '>{item.title}</h2>
            <h6 className='text-white mt-4'>{item.category}</h6>
            <div className='flex justify-between items-center'> 
            <Link href={{pathname:`/product/${item.id} `,query:{data:JSON.stringify(item)} }} as={`/product/${item.id}`} className='text-white'>
            <div className='flex relative items-center justify-center   '>
            <button className='bg-black/20 mt-2 text-white w-[125.5px] h-[50px] hover:bg-black/60  '>View</button>
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
count <23 && (
<button className='lg:mt-10 md:mt-48 p-2 text-blue-950 font-medium mx-auto items-center hover:bg-black/50 hover:text-white hover:border-none flex justify-center  border border-blue-400 rounded w-[319px] h-[50px]'
onClick={()=>setcount((prev)=>prev+8)}
>
Explore more
</button>
)
}
{/* gallery */}
<div className='bg-[#F0F0FF] lg:mt-10 md:mt-24 px-9'>
<div className='flex justify-between items-center py-7 '>
  <div className='flex flex-col'>
  <h1 className=" md:text-3xl mb-4 lg:text-5xl text-2xl text-black font-semibold ">
  Our Gallery
        </h1>
        <span className="text-2xl font-light text-gray-400"> Welcome to traps For Our Gallery</span>
  </div>
  <div>
  <select  className=' cursor-pointer border-none py-3 px-5' value={selectedcategory}  onChange={handlecatchane}>
  <option value="">all categories</option>
  {
  filtedata.map((item)=>(
  <option key={item.id} value={item.category}>{item.category}</option>
  ))
  }
  </select>
  </div>
 </div>
 <div className='mx-auto container flex justify-center items-center  flex-wrap '>
<Swiper spaceBetween={70} 
slidesPerView={4}
grid={{rows:2,fill:"row"}}
modules={[Navigation,Pagination]}
navigation
pagination={{clickable:true}}
breakpoints={{
640:{slidesPerView:3},
425:{slidesPerView:1},
740:{slidesPerView:4}
}}
className='mt-6 flex justify-between '
>
{
galleryimages.slice(0,countimg).map((src,index)=>(
  <SwiperSlide key={index}>
        <Image
        src={src}
        alt='gallery image'
        width={300}
        height={300}
        className={`cursor-pointer rounded-2xl  mt-6  object-fill  shadow-lg overflow-hidden   w-full ${index%2==0?"h-72":"h-48"}` }
        onClick={()=>{
        setcurrentimage(src)
        setisopen(true)
        setselectedimg(src)
        setcurrentindex(index)
        }}
        />
  </SwiperSlide>
))
}
</Swiper>
</div>
</div>
{
countimg <=products.length &&(
<div className='relative flex  items-center justify-center text-center  lg:mt-10 lg:mx-8 '>
<button className={`absolute  right-[38rem]  p-3  rounded-full ${countimg === 6 ? "text-gray-400 cursor-not-allowed":"bg-white text-black hover:bg-gray-300"}`}
      disabled={countimg===6}
      onClick={()=>setcountimg((prev)=>prev-6)}
      >
<NavigateBeforeIcon/>
</button>
      <button className={`  rounded-full ${countimg === products.length -1 ? "text-gray-400 cursor-not-allowed":"bg-white text-black hover:bg-gray-300"}`}
      disabled={countimg=== products.length -1}
      onClick={()=>setcountimg((prev)=>prev+6)}
      >
      <NavigateNextIcon/>
      </button>
</div>
)
}
{/* image window */}
{
selectedimg && (
<div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
   <div className="relative">
      <button className='absolute top-[0.5rem] right-[-30rem] bg-red-500 py-4 px-6 rounded-full' onClick={()=>setselectedimg(null)}>
        x
      </button>
      <Image
      src={products[currentindex].image}
      alt="selected img"
      width={500}
      height={400}
      className='rounded-lg object-cover'
      />
      <button className={`absolute left-[-20rem] top-[13rem] p-3 rounded-full ${currentindex === 0 ? "text-gray-400 cursor-not-allowed":"bg-white text-black hover:bg-gray-300"}`}
      onClick={prevImage}
      disabled={currentindex===0}
      >
<NavigateBeforeIcon/>
</button>
      <button className={`absolute right-[-20rem] p-3 top-[13rem] rounded-full ${currentindex === products.length -1 ? "text-gray-400 cursor-not-allowed":"bg-white text-black hover:bg-gray-300"}`}
      onClick={nextImage}
      disabled={currentindex=== products.length -1}
      >
      <NavigateNextIcon/>
      </button>
   </div>
</div>
)
}
</div>
  )
}
export default Products;
