import express from "express";
import { body, param } from "express-validator";
import {
  addAllCategory,
  addScrapCategory,
  deleteAllCategory,
  deleteCategoryById,
  deleteCategoryByName,
  getCategoryById,
  getCategoryByName,
  scrapCategoryList,
  updateCategory,
} from "../controllers/scrapCategory.controller.js";
const scrapCategoryRouter = express.Router();


scrapCategoryRouter.post(
  "/add-category",
  body("categoryName", "Category Name required"),
  addScrapCategory
);
scrapCategoryRouter.post("/add-categorylist", addAllCategory);
scrapCategoryRouter.get("/getcategoryList", scrapCategoryList);

scrapCategoryRouter.get(
  "/getcategory-byname/:categoryName",
  param("categoryName", "Category Name required").notEmpty(),
  getCategoryByName
);

scrapCategoryRouter.get(
  "/getcategory-byid/:categoryId",
  param("categoryId", "Category Id required").notEmpty(),
  getCategoryById
);

scrapCategoryRouter.put(
  "/update-category",
  body("categoryName", "Category name required").notEmpty(),
  updateCategory
);

// delete]
scrapCategoryRouter.delete(
  "/delete-category-byid/:categoryId",
  param("categoryId", "Category name required").notEmpty(),
  deleteCategoryById
);

scrapCategoryRouter.delete(
  "/delete-category-byname/:categoryName",
  param("categoryName", "Category name required").notEmpty(),
  deleteCategoryByName
);
scrapCategoryRouter.delete("/delete-allcategory", deleteAllCategory);
export default scrapCategoryRouter;
