const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

const authRoutes = require("./routes/auth");
app.use(cors());

app.use(bodyParser.json());
// app.use("/shop" , require("./routes/shop"))
app.use("/auth" , authRoutes);

const MONGODB_URI = 'mongodb+srv://mayank:mayanksharma@cluster0.xpmtenf.mongodb.net/ishita?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
.then(res => {
    console.log("connected");
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})