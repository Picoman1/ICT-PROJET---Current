import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const About = () => {
  return (
    <div >
      <div className='text-center py-8 text-3xl mb-5'>
        <Title text1={'About'} text2={'Us'} />
      </div>
      {/* Content Section */}
      <div className='flex flex-col sm:flex-row items-center gap-6'>
        {/* left_Section */}
        <div className='flex-1 flex'>
          <img src={assets.about_page_1} alt=""  width='75%' className=' rounded-lg shadow-lg' />
        </div>
        {/* right_section */}
        <div className='flex-1 text-center'>
          <h2 className='text-2xl sm:text-3xl font-medium text-gray-700'>Who We Are</h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            We understand that shopping online can be challenging. That's why we offer [mention specific features, e.g., free shipping, easy returns, size guides, live chat support] to make your shopping experience as seamless and enjoyable as possible. We value your feedback and strive to continuously improve based on your input. We are committed to building long-term relationships with our customers and providing exceptional service every step of the way
          </p>
        </div>
      </div>

      <div style={{marginTop:'7rem'}}>
      <NewsLetterBox/>
      </div>

    </div>
  )
}

export default About
