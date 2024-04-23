import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// db connect using uri  because in deploye it is provide to link of http link o f database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MONGODB Connection successful! Host`);
  } catch (error) {
    console.error("MONGODB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;