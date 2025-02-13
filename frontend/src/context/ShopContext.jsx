import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext= createContext();

const ShopContextProvider=(props)=>{
    const currency='₹';
    const delivery_fee=10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token,setToken]=useState('')
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
    const [products,setProducts]=useState([])
    const navigate=useNavigate()

    const addToCart=async(itemId,size)=>{
        if(!size){
            toast.error('select Product Size');
            return;
        }
         let cartData= structuredClone(cartItems);
         if (!cartData[itemId]) {
            cartData[itemId] = {};
          }
        
          if (!cartData[itemId][size]) {
            cartData[itemId][size] = 0;
          }
        
          cartData[itemId][size] += 1;
          setCartItems(cartData);
         if(token){
            try {
                const response = await axios.get(backendUrl + '/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                const userId = response.data.user._id;
                await axios.post(backendUrl + '/api/cart/add', { userId,itemId, size },{ headers: { Authorization: `Bearer ${token}` } } );
                toast.success("Added to cart!");
              } catch (error) {
                console.log(error);
                toast.error(error.message);
              }
         }
    }
    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount+= cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
    
        if (!cartData[itemId]) {
            cartData[itemId] = {}; // Ensure itemId exists before updating
        }
    
        cartData[itemId][size] = quantity; // Directly update quantity
    
        setCartItems(cartData);
    
        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    { itemId, size, quantity }, // Removed userId from request body
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const deleteQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
    
        if (quantity === 0) {
            if (cartData[itemId] && cartData[itemId][size]) {
                delete cartData[itemId][size];
    
                // If no sizes remain, remove the entire item
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
    
            setCartItems(cartData);
    
            if (token) {
                try {
                    await axios.post(
                        backendUrl + "/api/cart/update",
                        { itemId, size, quantity: 0 }, // Send 0 to backend
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }
    };
    
    
    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount+= itemInfo.price*cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount
    }
  ;

  const getProductsData=async(token)=>{
    try {
        const response=await axios.get(backendUrl+'/api/product/list')
        if(response.data.success){
            setProducts(response.data.products)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
       console.log(error)
       toast.error(error.message) 
    }
  }
  const getUserCart=async(req,res)=>{
      try {
        const response = await axios.post(backendUrl + '/api/cart/get', {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if(response.data.success){
            setCartItems(response.data.cartData)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message) 
      }
  }
  useEffect(()=>{
    getProductsData()
  },[])
  useEffect(() => {
    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
    }
}, []);

useEffect(() => {
    const userRole = localStorage.getItem('role'); // Get role from localStorage
    if (token && userRole === 'user') {
        getUserCart();
    }
}, [token]);


    const value={
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,setCartItems,addToCart,
        getCartCount,backendUrl,
        setToken,token,updateQuantity,
        getCartAmount,navigate,deleteQuantity
    }

   
    return(
        <ShopContext.Provider value={value}>
              {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;