const mongoose = require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
 
console.log(process.env.MONGOOSE_URI);
const mongodb = async function () {
  await mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    console.log("MongoDB Connected");
  });
};

module.exports = mongodb;
