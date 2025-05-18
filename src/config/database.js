
const mongoose=require('mongoose')

const connectDB=async()=>{
await mongoose.connect("mongodb+srv://abhiinvv:abhiinvv@namastenode.7fuxff7.mongodb.net/")
    
}

module.exports=connectDB




module.exports = connectDB;
