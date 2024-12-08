import mongoose from "mongoose";

const ScrapCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true } 
);

const ScrapCategory = mongoose.model("ScrapCategory", ScrapCategorySchema);
export default ScrapCategory;
