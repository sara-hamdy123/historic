import Image from "next/image";
export default  async function ImgCollection() {
const req=await fetch(`https://fakestoreapi.com/products`);
const product=await req.json();
  return (
  <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-40 mx-auto container">
      {
      product.slice(0,3).map((p)=>(
      <div key={p.id} className="" >
            <Image 
            src={p.image}
            alt={p.title} 
           width={300} 
           height={300} 
           className="cursor-pointer object-fill w-full h-[400px] " 
           />            
      </div>
      ))
      }
   </div>
  )
}


