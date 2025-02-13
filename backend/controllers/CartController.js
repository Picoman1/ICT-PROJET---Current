import userModel from "../models/userModel.js"


//add products to user cart
const addToCart=async(req,res)=>{
  try {
    const {itemId,size}=req.body;
    const userId = req.userId;
    if (!userId) {
        return res.json({ success: false, message: "User not authenticated" });
    }
    const userData=await userModel.findById(userId)
    let cartData=await userData.cartData || {};
    
     // Initialize itemId if not present
     if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
  
      // Initialize size if not present
      if (!cartData[itemId][size]) {
        cartData[itemId][size] = 0;
      }
  
      // Increment quantity
      cartData[itemId][size] += 1;
      
    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"Added To Cart"})
    console.log("Before Update:", userData.cartData);
    console.log("After Update:", cartData);

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

const UpdateCart = async (req, res) => {
  try {
      const { itemId, size, quantity } = req.body;
      const userId = req.userId;

      if (!userId) {
          return res.json({ success: false, message: "User not authenticated" });
      }

      const userData = await userModel.findById(userId);
      if (!userData) {
          return res.json({ success: false, message: "User not found" });
      }

      let cartData = userData.cartData || {};

      if (quantity === 0) {
          // Remove size entry if it exists
          if (cartData[itemId] && cartData[itemId][size]) {
              delete cartData[itemId][size];

              // If no sizes left, remove the item itself
              if (Object.keys(cartData[itemId]).length === 0) {
                  delete cartData[itemId];
              }
          }
      } else {
          // Update quantity
          if (!cartData[itemId]) {
              cartData[itemId] = {};
          }
          cartData[itemId][size] = quantity;
      }

      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Cart Updated" });

  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const userData = await userModel.findById(userId);
        if (!userData) return res.status(404).json({ success: false, message: "User not found" });

        let cartData = userData.cartData || {}; // Default to an empty object if cartData is missing

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};




export{addToCart,UpdateCart,getUserCart}