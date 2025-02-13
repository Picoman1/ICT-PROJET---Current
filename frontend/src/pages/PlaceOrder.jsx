import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method,setMethod]=useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}=useContext(ShopContext);
  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
  
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
  
      switch (method) {
        
        case "cod":
          const response = await axios.post(backendUrl + "/api/order/place", orderData, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
  
       
        case "razorpay":
          const responseRazorpay = await axios.post(backendUrl + "/api/order/razorpay", orderData, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (responseRazorpay.data.success) {
            const { order } = responseRazorpay.data;
            openRazorpay(order);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;
  
        default:
          toast.error("Invalid payment method.");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  const openRazorpay = (order) => {
    const options = {
      key: "rzp_test_dzx2fsYrQiy9F5", 
      amount: order.amount,
      currency: "INR",
      name: "My Shop",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          // ✅ Send the payment details to backend
          const paymentResponse = await axios.post(backendUrl + "/api/order/verify", {
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
  
          if (paymentResponse.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Payment Successful");
          } else {
            toast.success("Payment Successful");
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed.");
        }
      },
      prefill: {
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  const onChaneHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;

    setFormData(data=>({...data,[name]:value}))
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
           <Title text1={'DELIVERY '} text2={'INFORMATION'}/>

        </div>
        <div className='flex gap-3'>
          <input onChange={onChaneHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" required />
          <input onChange={onChaneHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' type="text"  required />

        </div>
        <input onChange={onChaneHandler} name='email' value={formData.email}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email' type="email"  required />
        <input onChange={onChaneHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" required  />
        <div className='flex gap-3'>
          <input onChange={onChaneHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" required  />
          <input onChange={onChaneHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" required  />

        </div>
        <div className='flex gap-3'>
          <input onChange={onChaneHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' type="number" required />
          <input onChange={onChaneHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" required  />

        </div>
        <input onChange={onChaneHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone Number' type="number" required />
      </div>
      {/*.......... Right side ...............*/}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>

        </div>
        <div className='mt-12'>
              <Title text1={'PAYMENT'} text2={'METHOD'}/>
              <div className='flex gap-3 flex-col lg:flex-row'>
                <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                     <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':''}`}></p>
                     <img className='h-5 mx-4' src={assets.stripe_icon} alt=""  />
                </div>
                <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                     <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':''}`}></p>
                     <img className='h-5 mx-4' src={assets.razorpay_icon} alt=""  />
                </div>
                <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                     <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
                     <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
                 
              </div>
              <div className='w-full text-end mt-8'>
                <button type='submit'  className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>

              </div>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
