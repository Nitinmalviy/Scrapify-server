import scrapCategory from "../models/scrapCategory.model.js";
import { validationResult } from "express-validator";
export const addAllCategory = async (request, response, next) => {
  try {
    let categoryList = request.body;
    // await scrapCategory.create({ categoryName: category["categoryName"] });
    for (let categoryName of categoryList)
      await scrapCategory.create(categoryName);
    return response.status(200).json({ message: "All Category Saved.." });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

export const addScrapCategory = async (request, response, next) => {
  try {
    let categoryName = request.body.categoryName;
    const category = await scrapCategory.findOne({ categoryName });
    if (category) {
      return response
        .status(200)
        .json({ message: "Scrap Category Alredy added" });
    }
    await scrapCategory.create({ categoryName });
    return response
      .status(200)
      .json({ message: "Scrap Category successfully added" });
  } catch (err) {
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const scrapCategoryList = (request, response, next) => {
  scrapCategory
    .find()
    .then((result) => {
      return response.status(200).json({ categoryList: result });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal server error" });
    });
};

export const getCategoryById = async (request, response, next) => {
  try {
    const categoryId = request.params.categoryId;
    const category = await scrapCategory.findOne({ _id: categoryId });
    if (category) {
      return response.status(200).json({ Category: category });
    } else {
      return response.status(400).json({ massage: "Category id not found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const getCategoryByName = async (request, response, next) => {
  try {
    const categoryName = request.params.categoryName;
    const category = await scrapCategory.findOne({ categoryName });
    if (category) {
      return response.status(200).json({ Category: category });
    } else {
      return response.status(400).json({ massage: "Category Name not found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const updateCategory = async (request, response, next) => {
  try {
    let { categoryId, categoryName } = request.body;
    let category = await scrapCategory.findOne({ _id: categoryId });
    if (category) {
      await scrapCategory.updateOne(
        { _id: categoryId },
        { $set: { categoryName } }
      );
      return response
        .status(200)
        .json({ message: "Category data successully updated" });
    }
    return response
      .status(401)
      .json({ error: "Bad request {Category id not fonund}" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategoryByName = async (request, response, next) => {
  try {
    let categoryName = request.params.categoryName;
    let category = await scrapCategory.findOne({ categoryName });
    if (category) {
      await scrapCategory.deleteOne({ categoryName });
      return response
        .status(200)
        .json({ message: "Category data successfully deleted" });
    }
    return response
      .status(401)
      .json({ error: "Bad request {Category Name not found}" });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategoryById = async (request, response, next) => {
  try {
    let categoryId = request.params.categoryId;
    let category = await scrapCategory.findOne({ _id: categoryId });
    if (category) {
      await scrapCategory.deleteOne({ _id: categoryId });
      return response
        .status(200)
        .json({ message: "Category data successfully deleted" });
    }
    return response
      .status(401)
      .json({ error: "Bad request {Category Name not found}" });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllCategory = async (request, response, next) => {
  try {
    await scrapCategory.deleteMany();
    return response
      .status(200)
      .json({ message: "Category data successfully deleted" });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};
