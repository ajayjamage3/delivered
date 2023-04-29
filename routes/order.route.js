const express = require("express")
const cors = require("cors")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/user.model")
const {RestaurantModel} = require("../models/restaurant.model")
const {OrderModel} = require("../models/order.model")
const app = express()
app.use(express.json())
const mongoose = require("mongoose")
app.use(cors())
const ObjectId = mongoose.Types.ObjectId;
const orderRouter = express.Router()

orderRouter.get("/orders/:id",async(req,res)=>{
    const id = req.params.id
   try {
        const orderDetails = await OrderModel.aggregate([
            {
                $match: { _id: new ObjectId(id) }
            },
            {$lookup: {
              from:"users",
              localField: "user",
              foreignField: "_id",
              as: "UserDetails"
             }},
             {$lookup: {
                from:"restos",
                localField: "restaurant",
                foreignField: "_id",
                as: "restaurantDetails"
               }},
             
          ])
        res.status(200).send({"orderdetails":orderDetails})
   } catch (error) {
        console.log(error)
   }
})


orderRouter.post("/orders",async(req,res)=>{
    const {user,restaurant,items,totalPrice,deliveryAddress,status} = req.body
    try {
        const order = new OrderModel({user,restaurant,items,totalPrice,deliveryAddress,status})
        order.save()
        res.status(201).send({"msg":"Order Placed Succesfully"})
    } catch (error) {
        console.log(error)
    }
})

orderRouter.patch("/orders/:id",async(req,res)=>{
    const {status} = req.body
    const id = req.params.id
    try {
        await OrderModel.findByIdAndUpdate({_id:id},{status})
        res.status(204).send({"msg":"status updated"})
    } catch (error) {
        console.log(error)
    }
})


// {
//     "name":"Ajay Jamage",
//     "email": "ajay@gmail.com",
//     "password":"ajay",
//     "address": {
//       "street": "Sangli",
//       "city": "Sangli",
//       "state": "MH",
//       "country": "India",
//       "zip": "444000"
//     }
//   }


// {
//     "name": "Hotel",
//     "address": {
//       "street": "Sangli",
//       "city": "sangli",
//       "state": "Mh",
//       "country": "India",
//       "zip": "44444"
//     },
//     "menu": [{
//       "name": "Paneer",
//       "description": "Spicy",
//       "price": 350,
//       "image":"https://th.bing.com/th/id/OIP.uuaB5C8ZhJR02CXloMpvPwHaE8?w=279&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7"
//     }]
//   }
  
  module.exports={
    orderRouter
  }