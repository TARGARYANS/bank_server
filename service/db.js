const mongoose=require("mongoose")

//connection string

mongoose.connect("mongodb://localhost:27017/bankserver",{useNewUrlParser:true})

//model creation

const User=mongoose.model("User",
{
    username: String,
    acno: Number,
    password: String,
    balance: Number,
    transaction: []  
})

module.exports={
    User
}