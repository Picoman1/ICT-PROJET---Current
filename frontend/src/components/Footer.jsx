import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.FluxBuy} alt="" className='mb-0 w-36' />
            <p className='w-full md:w-2/3 text-gray-600 '>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam vitae labore maiores? Alias autem id officiis, sed deleniti tempora perferendis obcaecati quaerat eum sunt nesciunt non cumque distinctio vero iure?
            </p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>

          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>CONTACT US</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 9207031465</li>
            <li>fluxbuy@gmail.com</li>
          </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@fluxbuy@gmail.com-All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
