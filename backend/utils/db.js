const mongoose = require("mongoose");
const dotenv =require('dotenv')

dotenv.config()
const connectMongoDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("connect Successful");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

module.exports= connectMongoDB;
