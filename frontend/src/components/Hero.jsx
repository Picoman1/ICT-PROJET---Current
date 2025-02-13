
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex justify-center mt-5">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={2000} 
        transitionTime={550} // Smooth animation
        className="w-full max-w-[1231px] h-[358px]" 
      >
        <div>
          <img className="w-full h-[358px] object-cover" src={assets.hero_1} alt="Slide 1" />
        </div>
        <div>
          <img className="w-full h-[358px] object-cover" src={assets.hero_2} alt="Slide 2" />
        </div>
        <div>
          <img className="w-full h-[358px] " src={assets.hero_3} alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;




