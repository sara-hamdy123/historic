"use client"
import React, { useState } from 'react'
import CategoryFilter from './CategoryFilter'
import ProductSlider from './ProductSlider'
const page = () => {
const [selectedCategory,setselectedCategory]= useState<string>("");
  return (
    <div>
      <CategoryFilter onSelectCategory={setselectedCategory} />
      <ProductSlider category={selectedCategory} />
    </div>
  )
}

export default page
