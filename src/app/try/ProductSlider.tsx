"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import Image from "next/image";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
export default function ProductSlider({ category }: { category: string }) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // كل صفحة تحتوي على 6 منتجات
    const [isopen,setisopen]=useState(false)
    const [selectedimg,setselectedimg]=useState(null)
    const [currentindex,setcurrentindex]=useState(0)
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
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                let url = "https://fakestoreapi.com/products";
                if (category) {
                    url += `/category/${category}`;
                }
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        }
        fetchProducts();
    }, [category]);
    if (loading) return <p>Loading...</p>;
    // حساب المنتجات المعروضة لكل صفحة
    const paginatedProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    return (
        <div className="container mx-auto ">
            <Swiper
                modules={[Navigation, Grid]}
                navigation
                spaceBetween={10}
                slidesPerView={3} // عدد العناصر في الصف الواحد
                grid={{ rows: 2, fill:"row" }} // عدد الصفوف (صفين)
                loop={false}
                breakpoints={{
                    640:{slidesPerView:3},
                    425:{slidesPerView:1},
                    }}
                    className="mt-6"
            >
                {paginatedProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="">
                            <Image 
                            src={product.image} 
                            alt=""
                            className={`cursor-pointer rounded-2xl  mt-6  object-fill  shadow-lg ${product.id%2==1 ?"h-[450px]":"h-[350px]"}`}
                            width={350}
                            height={250} 
                            onClick={()=>{
                                setisopen(true)
                                setselectedimg(product.image)
                                setcurrentindex(products.findIndex(p=>p.id===product.id))
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
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
            {/* أزرار التنقل بين الصفحات */}
            <div className='relative flex  items-center justify-center text-center  lg:mt-10 lg:mx-8 '>
<button className={`absolute  right-[38rem] top-3 p-3  rounded-full ${currentPage === products.length -1 ? "text-gray-400 cursor-not-allowed":"bg-white text-black hover:bg-gray-300"}`}
      disabled={currentPage=== 0}
      onClick={()=>setCurrentPage((prev)=>Math.max(prev-1,0))}
      >
<NavigateBeforeIcon/>
</button>
      <button className={`absolute p-3  top-3 rounded-full ${currentPage === 6 ? "text-gray-400 cursor-not-allowed":"bg-white text-black hover:bg-gray-300"}`}
            disabled={(currentPage+1)* itemsPerPage >=products.length}
            onClick={()=>setCurrentPage((prev)=>(prev+1)*itemsPerPage <products.length? prev+1:prev)}
      >
      <NavigateNextIcon/>
      </button>
</div>
        </div>
    );
}