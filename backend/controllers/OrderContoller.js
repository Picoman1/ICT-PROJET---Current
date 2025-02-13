import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'
import crypto from "crypto";

//global variables

const currency='inr';
const deliveryCharge=10;

//gateway initialize

const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

//placing orders using COD method
const placeOrder=async(req,res)=>{
    try {
        const userId = req.userId; 
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
        const {items,amount,address}=req.body;
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cardData:{}})

        res.json({success:true,message:"order Placed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const placeOrderStripe=async(req,res)=>{
    
}

const placeOrderRazorpay = async (req, res) => {
    try {
      const {  items, amount, address } = req.body;
      const userId=req.userId;
      
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
  
      // Create order data
      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "Razorpay",
        payment: false,
        date: Date.now(),
      };
  
      // Save the order in database
      const newOrder = new orderModel(orderData);
      await newOrder.save();
  
      // Razorpay order options
      const options = {
        amount: amount * 100, // Convert to smallest currency unit (paise)
        currency: currency.toUpperCase(),
        receipt: newOrder._id.toString(),
      };
  
      // ✅ FIX: Use `await` to create the Razorpay order properly
      const order = await razorpayInstance.orders.create(options);
  
      res.json({ success: true, order });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
// const placeOrderRazorpay=async(req,res)=>{
//    try {
//     const {userId,items,amount,address}=req.body;
//     if (!userId) {
//         return res.status(401).json({ success: false, message: "Unauthorized" });
//       }
//     const orderData={
//         userId,
//         items,
//         address,
//         amount,
//         paymentMethod:'Razorpay',
//         payment:false,
//         date:Date.now()
//     }

//     const newOrder=new orderModel(orderData)
//     await newOrder.save();
//     const options={
//         amount:amount*100,
//         currency:currency.toUpperCase(),
//         receipt:newOrder._id.toString()
//     }

//  const order =  await razorpayInstance.orders.create(options,(error,order)=>{
//                if(error){
//                 console.log(error)
//                 return res.json({success:false,message:error})
//                }
//                res,json({success:true,order})
//     })
//    } catch (error) {
//     console.log(error)
//     res.json({success:false,message:error.message})
//    } 
// }
// All order data for admin panel
const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
 //user Order data for Frontend
const userOrders=async(req,res)=>{
 try {
    const userId = req.userId;
    const orders=await orderModel.find({userId})
    res.json({success:true,orders})
 } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
 }   
}

//updateStatus only for admin
const updateStatus=async(req,res)=>{
 try {
    const {orderId,status}=req.body
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({success:true,message:"status updated"})
 } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
 }
}


const verifyPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    const body = order_id + "|" + payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === signature) {
      // ✅ Payment verified → Update order as paid
      await orderModel.findOneAndUpdate({ _id: order_id }, { payment: true });

      res.json({ success: true, message: "Payment successful" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyPayment}