const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authroutes");
const connectToMongoDB = require("./database/connectToMongodb");

dotenv.config(); // Load the environment variables;
const app = express(); 

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/",(req,res) => {
    res.send("Hello world!");
});

app.use("/api/auth", authRoutes);

app.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});