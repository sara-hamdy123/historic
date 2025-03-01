import Image from "next/image";
export default  async function ImgRelated() {
const req=await fetch(`https://fakestoreapi.com/products`);
         const product=await req.json();
  return (
 <>
      {
      product.slice(0,1).map((p)=>(
      <div key={p.id} >
            <Image src={p.image} alt={p.title}  width={80} height={0}  className="cursor-pointer object-contain w-[550px] h-[400px] mt-11 " />
      </div>
      ))
      }
    </>
  )
}
