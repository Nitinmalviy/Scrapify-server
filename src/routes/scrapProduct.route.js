import express from "express";
import { body, param } from "express-validator";
import multer from "multer";
import path from "path";
import {
  addScrapProduct,
  deleteProductById,
  getProductByCategory,
  getProductById,
  getProductByName,
  getProductList,
  searchProduct,
  updateProduct,
} from "../controllers/scrapProduct.controller.js";
import { auth } from "../middlewares/authorize.js";
import { upload } from "../middlewares/multer.middleware.js";
// const upload = multer({dest: "public/images/"});
const scrapProductRouter = express.Router();

scrapProductRouter.post("/addProduct", upload.fields([
  { name: 'thumbnail', maxCount: 1 }, // For single thumbnail upload
  { name: 'images', maxCount: 5 }     // For multiple images (up to 5) upload
]), addScrapProduct);


scrapProductRouter.get("/getProductList", getProductList);
scrapProductRouter.get("/getProduct-byid/:id", getProductById);
scrapProductRouter.get("/getProduct-byname/:name", getProductByName);
scrapProductRouter.get("/getProduct-bycategory/:categoryName", getProductByCategory);
scrapProductRouter.get("/search-product", searchProduct);

scrapProductRouter.delete("/deleteproduct-byid/:id", deleteProductById);
scrapProductRouter.put("/updateproduct-byid", updateProduct);


export default scrapProductRouter;
