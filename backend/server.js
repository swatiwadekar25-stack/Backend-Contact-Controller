
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import ContactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../frontend"));

// Contact routes
app.use("/api/contacts", ContactRoutes);

app.get("/", (req, res) => {
  res.redirect("/api/contacts");
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
}

startServer();


app.listen(5000, ()=>{
    console.log("Server is running on 5000 port")
})