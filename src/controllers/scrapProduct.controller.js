import { validationResult } from "express-validator";
import ScrapProduct from "../models/scrapProduct.model.js";

export const addScrapProduct = async (request, response, next) => {
  try {

    if (!request.body) {
      return response.status(400).json({ error: "Invalid data" });
    }
    const {
      title,
      description,
      categoryName,
      condition,
      price,
      seller,
      location,
      status,
    } = request.body;
    // Get path of uploaded thumbnail
    const thumbnail = request.files['thumbnail'][0].path;
    const images = request.files['images'].map(file => file.path);
    const newScrapProduct = new ScrapProduct({
      title,
      description,
      categoryName,
      condition,
      price,
      seller,
      thumbnail,
      images,
      location,
      status,
    });

    await ScrapProduct.create(newScrapProduct);
    return response.status(201).json({ massage: "Scrap product Stored Succefully" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductList = async (request, response, next) => {
  try {
    let result = await ScrapProduct.find().populate({
      path: "seller",
      select: "-password",
    });
    response.status(200).json({ ScrapProduct: result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (request, response, next) => {
  try {
    const _id = request.params.id;
    let result = await ScrapProduct.findOne({ _id }).populate({
      path: "seller",
      select: "-password",
    });
    if (!result) {
      return response.status(400).json({ massage: "Id not Found" });
    }
    return response.status(200).json({ ScrapProduct: result });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductByName = async (request, response, next) => {
  try {
    const title = request.params.name;
    let result = await ScrapProduct.findOne({ title }).populate({
      path: "seller",
      select: "-password",
    });
    if (!result) {
      return response.status(400).json({ massage: "Product not found" });
    }
    return response.status(200).json({ ScrapProduct: result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductByCategory = async (request, response, next) => {
  try {
    const categoryName = request.params.categoryName;
    let result = await ScrapProduct.find({ categoryName }).populate({
      path: "seller",
      select: "-password",
    });
    if (result.length > 0) {
      return response.status(200).json({ ScrapProduct: result });
    }
    return response.status(400).json({ massage: "Product not found" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchProduct = async (request, response, next) => {
  try {
    const { query, maxPrice, minPrice } = request.body;
    // if ((!query && !maxPrice) || !minPrice) {
    //   return response.status(200).json({ massage: "invalid Searching" });
    // }
    console.log(query)
    const searchCriteria = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { categoryName: { $regex: query, $options: "i" } },
      ],
      price: { $gte: minPrice, $lte: maxPrice },
    };

    let result = await ScrapProduct.find(searchCriteria).populate({
      path: "seller",
      select: "-password",
    });
    if (result.length > 0) {
      return response.status(200).json({ ScrapProduct: result });
    }
    console.log(result)
    return response.status(400).json({ message: "Product not found" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteProductById = async (request, response, next) => {
  try {
    const id = request.params.id;
    let result = await ScrapProduct.deleteOne({ _id: id });
    if (!result.deletedCount) {
      return response.status(400).json({ massage: "Product id not found" });
    }
    return response.status(200).json({ massage: "Product Deleted Succefully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

// Panding (In progress)................
// export const updateProductById = async (request, response, next) => {
//   try {
//     const productId = request.body.id;
//     const updates = request.body;
//     const product = await ScrapProduct.findById(productId);
//     if (!product) {
//       return response.status(404).json({ message: "Product not found" });
//     }
//     Object.keys(updates).forEach((key) => {
//       if (updates[key] !== undefined) {
//         product[key] = updates[key];
//       }
//     });
//     const updatedProduct = await product.save();
//     return response.status(200).json({ product: updatedProduct });
//   } catch (error) {
//     console.error(error);
//     return response.status(500).json({ error: "Internal Server Error" });
//   }
// };
export const updateProduct = async (request, response, next) => {
  try {
    let {
      id,
      title,
      description,
      categoryName,
      condition,
      price,
      thumbnail,
      userId,
      userReview,
      date,
      shippingCost,
      commission,
    } = request.body;

    let Product = await ScrapProduct.findOne({ _id: id });
    if (Product) {
      await ScrapProduct.updateMany(
        { _id: id },
        {
          productName,
          description,
          price,
          quantity,
          weight,
          sellerId,
          discountPercentage,
          rating,
          brand,
          thumbnail,
          review: [{ userId, userReview, date }],
          category,
          shippingCost,
          commission,
        }
      );

      return response
        .status(200)
        .json({ message: "product data successully updated" });
    }
    return response
      .status(401)
      .json({ error: "Bad request {product id not fonund}" });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};
