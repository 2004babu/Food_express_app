const mongoose =require('mongoose')

const userschema = mongoose.Schema({
    uid: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // password: { type: String, required: true, select: false },
    ProfilePic: { type: String },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})


const User =new mongoose.model('User',userschema)  //creating a model of the schema
module.exports = User  //exporting the model