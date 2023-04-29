const express = require("express")
const cors = require("cors")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/user.model")
const {RestaurantModel} = require("../models/restaurant.model")
const app = express()
app.use(express.json())
app.use(cors())
const restoRouter = express.Router()

restoRouter.get("/restaurants",async(req,res)=>{
    try {
        const restaurant = await RestaurantModel.find()
        res.status(200).send({"restaurant":restaurant})
    } catch (error) {
        console.log(error)
    }
})

restoRouter.get("/restaurants/:id",async(req,res)=>{
    const id = req.params.id
    try {
        const restaurant = await RestaurantModel.findById({_id:id})
        res.status(200).send({"restaurant":restaurant})
    } catch (error) {
        console.log(error)
    }
})

restoRouter.get("/restaurants/:id/menu",async(req,res)=>{
    const id = req.params.id
    try {
        const restaurant = await RestaurantModel.findById({_id:id})
        res.status(200).send({"menu":restaurant.menu})
    } catch (error) {
        console.log(error)
    }
})

restoRouter.post("/restaurants/:id/menu",async(req,res)=>{
    const id = req.params.id
    const {name,description,price,image} = req.body
    try {
        const restaurant = await RestaurantModel.findByIdAndUpdate({_id:id},{$push:{menu:{name,description,price,image}}})
        res.status(201).send({"msg":"menu added"})
    } catch (error) {
        console.log(error)
    }
})

restoRouter.post("/addresto",async(req,res)=>{
    const { name,address,menu} = req.body
    try {
        const resto = new RestaurantModel( { name,address,menu})
        resto.save()
        res.send({"msg":"added new restaurant"})
    } catch (error) {
        console.log(error)
    }
})

restoRouter.delete("/restaurants/:id1/menu/:id2",async(req,res)=>{
    const id1 = req.params.id1
    const id2 = req.params.id2
    try {
        await RestaurantModel.updateOne({_id:id1},{$pull:{menu:{_id:id2}}})
        res.status(202).send({"msg":"menu deleted"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    restoRouter
}
  