import mongoose from "mongoose";

const ScrapProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    categoryName: {
      type: String,
      ref: "ScrapCategory",
    },
    condition: {
      type: String,
      enum: ["good", "medium", "worst"],
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    location: [
      {
        city: {
          type: String,
          required: true,
          trim: true,
        },
        pincode: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        landmark: {
          type: String,
          trim: true,
        },
        fullAddress: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Done', 'pending'],
      default: 'pending',
      trim: true
    },
  },
  { timestamps: true }
);

const ScrapProduct = mongoose.model("ScrapProduct", ScrapProductSchema);
export default ScrapProduct;
