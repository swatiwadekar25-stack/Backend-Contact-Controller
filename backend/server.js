import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";


import ContactRoutes from "./routes/ContactRoutes.js";

dotenv.config()

const app =express()
app.use(express.json())
app.use(express.static("../frontend"))
app.use(cors())


app.use("/api/contacts",ContactRoutes)


// Contact routes
app.get("/",(req,res)=>{
    res.redirect("/api/contacts")
})



mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((error)=>{
    console.log("MongoDB Connection error")
})


app.listen(5000,()=>{
    console.log("Server is running on 5000 port")
})