
import express from "express";
import { CategoryList, addAllCategory, addCategory, deleteAllCategory, deleteCategoryById, deleteCategoryByName, fetchCategoryById, fetchCategoryByName, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();
router.post("/addAllCategory",addAllCategory);
router.post("/addCategory",addCategory);
router.get("/categoryList",CategoryList);
router.get("/fetchCategoryById/:id",fetchCategoryById);
router.get("/fetchCategoryByName/:name",fetchCategoryByName);
router.delete("/deleteCategoryById/:id",deleteCategoryById);
router.delete("/deleteCategoryByName/:name",deleteCategoryByName)
router.delete("/deleteAllCategory",deleteAllCategory);
router.put("/updateCategory",updateCategory);

export default router;
