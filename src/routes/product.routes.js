import express from "express";
import { body, param } from "express-validator";
import { upload } from "../middlewares/multer.middleware.js";

import { addAllProduct, fetchProductByCategory, fetchProductById, fetchProductByName, fetchProductByPrice, productList, removeProductById, removeProductByName, updateProduct, addProduct, rateProduct, updateReview, searchProduct, updateImages } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/addProduct",
    upload.fields([
        { name: 'thumbnail', maxCount: 1 }, // For single thumbnail upload
        { name: 'images', maxCount: 5 }     // For multiple images (up to 5) upload
    ]),
    body("productName", "product name is required").notEmpty(),
    body("description", "description is required").notEmpty(),
    body("price", "price is required").notEmpty(),
    body("price", "only digit allowed").isNumeric(),
    body("quantity", "qunatity is required").notEmpty(),
    body("quantity", "only digit allowed").isNumeric(),
    body("weight", "only digit allowed").isNumeric(),
    body("category", "category is required").notEmpty(),
    body("thumbnail", "thumbnail is required").notEmpty(),
    body("rating", "only digit allowed").isNumeric(),
    body("discountPercentage", "only digit allowed").isNumeric(),
    body("images", "images is required").notEmpty(),
    addProduct
);


productRouter.get("/productList", productList);

productRouter.get("/fetchProductById/:id",
    param("id", "product id is required").notEmpty(),
    fetchProductById);

productRouter.get("/fetchProductByName/:name",
    param("name", "product name is required").notEmpty(),
    fetchProductByName);

productRouter.get("/fetchProductByCategory/:category",
    param("category", "product category is required").notEmpty(),
    fetchProductByCategory);

productRouter.get("/fetchProductByPrice/:price",
    param("price", "product price is required").notEmpty(),
    fetchProductByPrice);

productRouter.delete("/removeProductById/:id",
    param("id", "product id is required").notEmpty(),
    removeProductById);

productRouter.delete("/removeProductByName/:name",
    param("name", "product name is required").notEmpty(),
    removeProductByName);

productRouter.put("/updateProduct", updateProduct);
productRouter.get("/searchProduct", searchProduct);


productRouter.put("/updateImages/:productId", upload.fields([
    { name: 'thumbnail', maxCount: 1 }, // For single thumbnail upload
    { name: 'images', maxCount: 5 }     // For multiple images (up to 5) upload
]), updateImages);


// productRouter.delete("/removeImage",removeImage);

// productRouter.post("/addImage",addImage);


productRouter.post("/addRating", rateProduct);
productRouter.put("/addReview", updateReview);
export default productRouter;