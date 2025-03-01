import Image from "next/image" 
import fixed from "../../../public/71dfd82ac4a1510217100d133715960b.png"
const FixedImg =()=>{
return(   
<> 
<div className="relative h-[50vh] bg-black ">
<Image src={fixed} alt="historic area image" className="w-full  h-[100%] object-cover"/>
<div className="absolute flex items-start flex-col top-[40%] left-[14%] ">
       <h3 className=" md:text-3xl mb-4 lg:text-5xl text-7xl text-white    tracking-wide">
       Our Artifacts
       </h3>
       <span className="text-2xl font-light text-gray-200"> Welcome to Our artifacts</span>
   </div>
</div>     
</>
)
}
export default FixedImg