import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const {products}=useContext(ShopContext)
    const [bestSeller,setBestSeller]=useState([])

    useEffect(()=>{
      const bestproduct=products.filter((item)=>(item.bestSeller))
      setBestSeller(bestproduct.slice(0,5))
    },[products])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
          <Title text1={'BEST'} text2={'SELLERS'}></Title>
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover the hottest trends and must-have items with our e-commerce app! We curate the best sellers across every category, so you can easily find what's popular and snag it before it's gone.
          </p>
      </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
        }
       </div>
    </div>
  )
}

export default BestSeller
