import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
  return (
    <div className="flex  justify-center h-64"> 
     
      <div className="flex flex-col gap-4  text-[15px]" style={{marginTop:'8rem'}}>
        <NavLink
          className="flex items-center justify-center gap-3 border border-gray-300 px-3 py-2 w-[28rem] rounded-lg transition-all duration-300 hover:bg-black hover:text-white"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className="flex items-center justify-center gap-3 border border-gray-300 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-black hover:text-white"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className="flex items-center justify-center gap-3 border border-gray-300 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-black hover:text-white"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
