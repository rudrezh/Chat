const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authroutes");
const connectToMongoDB = require("./database/connectToMongodb");
const messageRoutes = require("./routes/messageroutes");
const userRoutes = require("./routes/userRoutes");


dotenv.config(); // Load the environment variables
const app = express(); 

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("Hello world!");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



app.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});