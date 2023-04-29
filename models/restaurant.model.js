const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectID = require('mongodb').ObjectID;
const restoSchema = mongoose.Schema(
  {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
      name: String,
      description: String,
      price: Number,
      image: String
    }]
  }
  
  
)

const RestaurantModel = mongoose.model("resto",restoSchema)

module.exports = {
    RestaurantModel
}