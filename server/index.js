const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')
require("dotenv").config();
const app = express();
const router = require("./routes/todoItems");

//use express.json() to get data into json format
app.use(express.json());
app.use(cors())

//PORT
const port = process.env.PORT || 5500;

//connect to mongodb
// Set strictQuery to false
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Database is connected"), { useNewUrlParser: true };
  })
  .catch((err) => console.log(err));

  app.use("/", router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
