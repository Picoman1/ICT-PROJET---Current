import express from 'express'
import { addToCart,getUserCart,UpdateCart } from '../controllers/CartController.js'
import authUser from '../middleware/Auth.js'


const cartRouter=express.Router()

cartRouter.post('/get',authUser, getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,UpdateCart)

export default cartRouter

