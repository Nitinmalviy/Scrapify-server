
import { Category } from "../models/category.model.js";

export const addAllCategory = async (request, response, next) => {
    console.log(request.body);
    try {
        let categoryList = request.body;
        console.log(categoryList);
        for (let category of categoryList)
            await Category.create({ categoryName: category });
        return response.status(200).json({ message: "All Category Saved.." });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
//-------
export const addCategory = async (request, response, next) => {
    try {
        let categoryName = request.body.categoryName;
        const category = await Category.findOne({ categoryName });
        if (category) {
            return response.status(200).json({ message: "Category already added" });
        }
        await Category.create({ categoryName: categoryName });
        return response.status(200).json({ message: "category data successfully added" });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
//-------
export const CategoryList = (request, response, next) => {
    Category.find()
        .then(result => {
            return response.status(200).json({ categoryList: result });
        }).catch(err => {
            return response.status(500).json({ error: "Internal server error" });
        })
}
//-------
export const fetchCategoryById = async (request, response, next) => {
    try {
      const id = request.params.id;
      const category = await Category.findOne({_id : id});
      if (category) {
        return response.status(200).json({ Category: category });
      } else {
        return response.status(401).json({ massage: "Category id not found" });
      }
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  };
//-------
export const fetchCategoryByName = async (request, response, next) => {
    try {
      const name = request.params.name;
      const category = await Category.findOne({categoryName : name});
      if (category) {
        return response.status(200).json({ Category: category });
      } else {
        return response.status(401).json({ massage: "Category Name not found" });
      }
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  };
//--------
export const deleteCategoryById = async (request, response, next) => {
    try {
        let id = request.params.id;
        let catrgory = await Category.findOne({ _id: id });
        if (catrgory) {
            await Category.deleteOne({ _id: id });
            return response.status(200).json({ message: "category data successfully deleted" })
        }
        return response.status(401).json({ error: "Bad request {category id not found}" });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}
//--------
export const deleteCategoryByName = async (request, response, next) => {
    try {
        let name = request.params.name;
        let catrgory = await Category.findOne({categoryName : name});
        if (catrgory) {
            await Category.deleteOne({categoryName : name});
            return response.status(200).json({ message: "category data successfully deleted" })
        }
        return response.status(401).json({ error: "Bad request {category name not found}" });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}
//------
export const deleteAllCategory = async (request, response, next) => {
    try {
      await Category.deleteMany();
      return response.status(200).json({ message: "Category data successfully deleted" });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  };
//------
export const updateCategory = async (request, response, next) => {
    try {
        let { id, categoryName } = request.body;
        let category = await Category.findOne({ _id: id });
        if (category) {
            await Category.updateOne({ _id: id }, {categoryName: categoryName});
            return response.status(200).json({ message: "category data successully updated" })
        }
        return response.status(401).json({ error: "Bad request {category id not fonund}" });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

