"use client"
import { useState, useEffect } from "react";
export default function CategoryFilter({ onSelectCategory }: { onSelectCategory: (category: string) => void }) {
    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("https://fakestoreapi.com/products");
                const products = await res.json();
                // استخراج الفئات وإزالة التكرار باستخدام Set
                const uniqueCategories = Array.from(new Set(products.map((product: any) => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, []);
    return (
        <select onChange={(e) => onSelectCategory(e.target.value)} className=' cursor-pointer border-none py-3 px-5'>
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
}