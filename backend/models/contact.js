import mongoose from "mongoose";
const contactSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    message:{
        type:String,
        required:true,
    },
    submissionDate:{
        type:Date,
        default:Date.now
    }
})

const Contact =mongoose.model("contact",contactSchema)
export default Contact;