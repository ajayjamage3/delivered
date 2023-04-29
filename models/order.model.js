const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {UserModel} = require("./user.model")
const {RestaurantModel} = require("./restaurant.model")

const orderSchema = mongoose.Schema(
    {
        user : { type: Schema.Types.ObjectId, ref: UserModel },
        restaurant : { type: Schema.Types.ObjectId, ref: RestaurantModel },
        items: [{
            name: String,
            price: Number,
            quantity: Number
        }],
        totalPrice: Number,
        deliveryAddress: {
            street: String,
            city: String,
            state: String,
            country: String,
            zip: String
        },
        status: String 
   }
  
)

const OrderModel = mongoose.model("order",orderSchema)

module.exports = {
    OrderModel
}