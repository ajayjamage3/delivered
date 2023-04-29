const express = require("express")
const cors = require("cors")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/user.model")
const app = express()
app.use(express.json())
app.use(cors())
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const { name,email,password,address} = req.body
    try {
        bcrypt.hash(password,5,async(err,newPass)=>{
            if(err){
                console.log(err)
            }else{
                const user = new UserModel({name,email,password:newPass,address})
                user.save()
                res.status(201).send({"msg":"User registered succesfully"})
            }
        })
    } catch (error) {
        console.log(error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.find({email})
        if(user.length>0){
            const decode_pass = user[0].password
            bcrypt.compare(password,decode_pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userId:user[0]._id},process.env.key)
                    res.status(201).send({"msg":"User logged in","token":token,"userId":user[0]._id})
                }else{
                    res.send({"msg":"Wrong Password"})
                }
            })
        }else{
            res.status(404).send({"msg":"User not found"})
        }
    } catch (error) {
        console.log(error)
    }
})

userRouter.patch("/user/:id/reset",async(req,res)=>{
    const {newPass,currentpass} = req.body
    const id = req.params.id
    try {
        const user = await UserModel.find({_id:id})
        const decode_pass = user[0].password
        bcrypt.compare(currentpass,decode_pass,async(err,result)=>{
            if(result){
                bcrypt.hash(newPass,5,async(err,hashed)=>{
                    if(err){
                        console.log(err)
                    }else{
                        await UserModel.findByIdAndUpdate({_id:id},{password:hashed})
                        res.status(204).send({"msg":"password updated"})
                    }
                })
            }else{
                res.send({"msg":"current password shold be entered correctly"})
            }
        })  
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    userRouter
}