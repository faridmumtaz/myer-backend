require("dotenv").config();
const path = require("path");
const express = require("express");
const router = require("./routers/router");
const connectMongoDB = require("./mongodb");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(bodyParser.json());

// Routers
app.use("/", router);

// Page Not Found
app.use((req, res) => {
  res.json({ message: "not found" });
});

// MongoDB
connectMongoDB()
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(port, () => console.log(`Server is running on port ${port}.`));
  })
  .catch((error) => console.log("Connection to MongoDB failed!", error));
