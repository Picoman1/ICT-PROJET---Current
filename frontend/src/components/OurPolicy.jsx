import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We Offer hassle free exachange policy</p>
      </div>
      <div>
        <img src={assets.return_policy_icon} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>7 days free return policy</p>
        <p className='text-gray-400'>We Offer 7 days return policy</p>
      </div>
      <div>
        <img src={assets.customer_care_policy} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>24*7 Customer Support</p>
        <p className='text-gray-400'>We Offer 24*7 Customer Support</p>
      </div>
    </div>
  )
}

export default OurPolicy
