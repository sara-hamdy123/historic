import Image from "next/image";
export default  async function ImgCollection() {
const req=await fetch(`https://fakestoreapi.com/products`);
const product=await req.json();
  return (
  <div className="">
      {
      product.slice(0,3).map((p)=>(
      <div key={product.id} className="" >
            <Image 
            src={p.image}
            alt={p.title} 
           width={600} 
           height={600} 
           className="cursor-pointer object-cover w-[300px] h-[320px] " 
           />            
      </div>
      ))
      }
   </div>
  )
}


