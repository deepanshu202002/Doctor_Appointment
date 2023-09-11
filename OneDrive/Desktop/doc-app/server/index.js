const express =  require("express")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require("dotenv")
var cors= require('cors')

const mongoose = require("mongoose")

dotenv.config()
// database

const app = express()
app.use(express.json())
app.use(morgan('dev'))
//database
mongoose.connect('mongodb+srv://deepanshumoorjani9954:DEEPANSHU%40%4020@cluster0.ohq7nzc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to the database');
  // Your server setup or other code here
})
.catch(error => {
  console.error('Error connecting to the database:', error);
});

// routes
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
// app.set('port', process.env.PORT || 8080);
const port = process.env.PORT || 3005
app.listen(port, ()=>{
 console.log(`server running on ${process.env.DEV_MODE} mode on port-${process.env.PORT}`.bgCyan.white)
})
