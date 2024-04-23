
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName : {
    type : String,
    trim : true,
    unique : true,
    required : true,
   }
},{versionKey : false});

export const Category = mongoose.model("category",categorySchema);
