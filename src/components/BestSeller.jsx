import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './Productitem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProducts = products.filter((item)=>(item.bestseller))
        setBestSeller(bestProducts.slice(0,5));
    },[])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md-text-base text-gray-600'>
            小さな幸せ、君と分けたい
            </p>
        </div>
        <div className='grid grind-cols-2 sm:grid-cols-3 md:grid-cols-4 ld:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }

        </div>
      
    </div>
  )
}

export default BestSeller
