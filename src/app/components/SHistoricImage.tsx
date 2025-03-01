 import Image from "next/image" 
 import histoicimage from "../../../public/847af33d34918078775960b7616f12cf.png"
 const HistoricImage =()=>{
 return(   
 <> 
 <div className="relative h-[45vh] bg-black ">
 <Image src={histoicimage} alt="historic area image" className="w-full  h-[100%] object-cover"/>
 <div className="absolute flex items-start flex-col top-[40%] left-[14%] ">
        <h3 className=" md:text-3xl mb-4 lg:text-5xl text-7xl text-white    tracking-wide">
            Hestoric trap
        </h3>
        <span className="text-2xl font-light text-gray-200"> Welcome to traps For Our Hestoric</span>
    </div>
 </div>     
 </>
 )
 }
 export default HistoricImage