// "use client"
// import { useState, useEffect } from "react";
// import CategoryFilter from "./CategoryFilter"; // استيراد الفلتر

// export default function ProductList() {
//     const [products, setProducts] = useState<any[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState<string>("");

//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 let url = "https://fakestoreapi.com/products";
//                 if (selectedCategory) {
//                     url += `/category/${selectedCategory}`;
//                 }

//                 const res = await fetch(url);
//                 const data = await res.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         }

//         fetchProducts();
//     }, [selectedCategory]); // تحديث المنتجات عند تغيير الفئة

//     return (
//         <div>
//             <CategoryFilter onSelectCategory={setSelectedCategory} />
            
//             <div className="product-slider">
//                 {products.length > 0 ? (
//                     products.map((product) => (
//                         <div key={product.id} className="product-card">
//                             <img src={product.image} alt={product.title} />
//                             <h3>{product.title}</h3>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No products available</p>
//                 )}
//             </div>
//         </div>
//     );
// }