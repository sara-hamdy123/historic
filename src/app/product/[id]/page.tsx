import Image from "next/image"
import ImgCollection from "@/app/components/imgCollection"
import ImgRelated from "@/app/components/ImgRelated";
 export default  async function ProductInfo  ({ params }:{params:{id:string}})  {
 const { id }=params;
 const req=await fetch(`https://fakestoreapi.com/products/${id}`);
      const product=await req.json();
return (
    <div className="min-h-screen">
    {/* image and title */}
    <div className="relative w-full h-[85vh]   text-w flex items-center justify-center">
      <Image
      // src={historic}
      src={product.image}
      alt={product.title}
      // fill
      width={70}
      height={0}
      className="object-fill w-full h-[85vh]"
      />
      <h1 className="absolute top-[115px] left-[64px] text-[64px] w-[400px] h-[180px] text-white font-bold">{product.title}</h1>
    </div>
    {/* deatil of product */}
      <div className=" mx-auto  shadow-lg   flex justify-between items-center  " style={{background:"linear-gradient(to right,#f0e68c,#f5f5f5,#AA8E5C)"}}>
         <h2 className="text-4xl font-bold  w-[360px] h-[100px] pl-20 " >Discover the {product.title}</h2>
         <p className="  text-xl  w-[870px] h-[161px] leading-8 mt-7">{product.description}</p>
      </div>
      <div>
      <div className="flex flex-col p-20">
      <h1 className="font-medium text-xl">Art and Artifacts of {product.title} Egypt</h1>
      <h6 className="mt-2 text-gray-500 text-sm">Explore the artistic expressions of ancient Egyptians.</h6>
      </div>
      <div className="flex flex-wrap mx-auto container ">
      <ImgCollection  />
      </div>
      <div className="flex lg:flex-row md:flex-col container mx-auto mt-32 justify-between">
      <div className="flex flex-col">
      <h2 className="font-bold text-3xl w-[550px]">Exploring the Lifestyle of the {product.title}</h2>
      <p className="w-[490px] py-5 leading-6 ">{product.description}</p>
      </div>
      {/* <Image src={picr} alt="hes" className="object-contain w-[550px] h-[400px] mt-11"/> */}
      <ImgRelated/>
      </div>
      <p className="container mx-auto mt-28 leading-7">{product.description}</p>
      </div>
    </div>
  )
}

