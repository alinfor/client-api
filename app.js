require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 3001;
const userRouter = require("./src/route/user.router");
const ticketRouter= require("./src/route/ticket.router");
//API security
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
//handle CORS error
app.use(cors());

//MongoDB Connection Setup
const mongoose = require("mongoose");
// const errorHandler = require("./utils/errorHandler");
mongoose.connect(process.env.MONGO_URL);
 const db = mongoose.connection;

 db.on("error", (error) => {
   console.error("MongoDB connection error:", error);
 });
 
 db.once("open", () => {
   console.log("MongoDB connected successfully");
 });



app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});
app.use('/',(req,res)=>{
  res.json({message:"Hi there"})
})
app.listen(port, () => {
  console.log(port);
});
