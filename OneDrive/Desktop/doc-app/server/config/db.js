const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongo db connect ${mongoose.connection.host}`.bgGreen.white)
    }catch(error){
        console.log(`mongo server issue ${error}`.bgRed.white)
    }
}
module.exports  = connectDB;