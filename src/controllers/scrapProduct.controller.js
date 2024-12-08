import AdminNotification from "../models/AdminNotification.model.js";
import ScrapProduct from "../models/scrapProduct.model.js";



export const addScrapProduct = async (request, response, next) => {
  try {
    console.log(request.body);
    console.log(request.files);
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
      city,
      pincode,
      state,
      landmark,
      fullAddress,
    } = request.body;

    console.log(state);
    const locations = [
      {
        city,
        pincode,
        state,
        landmark,
        fullAddress,
      }]
    // Get path of uploaded thumbnail
    const thumbnail = request.files['thumbnail'][0].filename;
    const images = request.files['images'].map(file => file.filename);
    const newScrapProduct = new ScrapProduct({
      title,
      description,
      categoryName,
      condition,
      price,
      seller,
      thumbnail,
      images,
      location: locations,
    });

    // const locatio = [{city},{}]


    const product = await ScrapProduct.create(newScrapProduct);
    console.log();
    const notification = new AdminNotification({
      userId: seller,
      ScrapProductId: product._id,
      message: `New product "${title}" has been uploaded`,
      createdAt: new Date()
    });
    await notification.save();
    console.log('Notification sent successfully.');
    return response.status(201).json({ massage: "Scrap product Stored Succefully", product: product });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductList = async (request, response, next) => {
  try {
    let products = await ScrapProduct.find().populate({
      path: "seller",
      select: "-password",
    });
    const baseUrl = 'http://localhost:8000/images/';
    const productsWithUrl = products.map(product => ({
      ...product.toObject(),
      thumbnail: baseUrl + product.thumbnail,
      images: product.images.map(image => baseUrl + image),
    }));
    return response.status(200).json({ ScrapProduct: productsWithUrl });

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
    const baseUrl = 'http://localhost:8000/images/';
    console.log(result.thumbnail);
    result.thumbnail = baseUrl + result.thumbnail;
    result.images = result.images.map(image => baseUrl + image);
    return response.status(200).json({ product: result });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: `${error}Internal Server Error`, });
  }
};

export const getProductByName = async (request, response, next) => {
  try {
    const title = request.params.name;
    let products = await ScrapProduct.find({ title }).populate({
      path: "seller",
      select: "-password",
    });
    if (!products) {
      return response.status(400).json({ massage: "Product not found" });
    }
    console.log(products);
    const baseUrl = 'http://localhost:8000/images/';
    const productsWithUrl = products.map(product => ({
      ...product.toObject(),
      thumbnail: baseUrl + product.thumbnail,
      images: product.images.map(image => baseUrl + image),
    }));
    return response.status(200).json({ ScrapProduct: productsWithUrl });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductByCategory = async (request, response, next) => {
  try {
    const categoryName = request.params.categoryName;
    let products = await ScrapProduct.find({ categoryName }).populate({
      path: "seller",
      select: "-password",
    });
    if (products.length > 0) {

      const baseUrl = 'http://localhost:8000/images/';
      const productsWithUrl = products.map(product => ({
        ...product.toObject(),
        thumbnail: baseUrl + product.thumbnail,
        images: product.images.map(image => baseUrl + image),
      }));
      return response.status(200).json({ ScrapProduct: productsWithUrl });
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

    const searchCriteria = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { categoryName: { $regex: query, $options: 'i' } },
      ],
      price: { $gte: minPrice || 0, $lte: maxPrice || Infinity },
    };
    const products = await ScrapProduct.find(searchCriteria)
      .populate({
        path: 'seller',
        select: '-password',
      });
    if (products.length > 0) {
      const baseUrl = 'http://localhost:8000/images/';
      const productsWithUrl = products.map(product => ({
        ...product.toObject(),
        thumbnail: baseUrl + product.thumbnail,
        images: product.images.map(image => baseUrl + image),
      }));
      return response.status(200).json({ products: productsWithUrl });
    } else {
      return response.status(404).json({ message: 'Products not found' });
    }
  } catch (error) {
    console.error('Error searching products:', error);
    response.status(500).json({ error: 'Internal Server Error' });
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

// get Scrap Product by userid
export const getProductByUserId = async (request, response, next) => {
  try {
    const userId = request.params.userId;

    // Validate userId
    // const errors = validationResult(request);
    // if (!errors.isEmpty()) {
    //   return response.status(400).json({ errors: errors.array() });
    // }
    // Find products by sellerId
    const products = await ScrapProduct.find({ seller: userId })
      .populate({
        path: 'seller',
        select: '-password'
      })

    // Concatenate base URL with thumbnail and images for each product
    const baseUrl = 'http://localhost:8000/images/';
    const formattedProducts = products.map(product => ({
      ...product._doc,
      thumbnail: baseUrl + product.thumbnail,
      images: product.images.map(image => baseUrl + image)
    }));

    return response.status(200).json({ products: formattedProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return response.status(500).json({ error: 'Internal server error' });
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
          condition,
          title,
          categoryName,
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

// Update image and thumbnail
export const updateImages = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { productId } = request.params;
    const { files } = request;
    if (!files || !files['thumbnail'] || !files['images']) {
      return response.status(400).json({ error: 'Both thumbnail and images are required' });
    }

    const thumbnail = files['thumbnail'][0].filename;
    const images = files['images'].map(file => file.filename);

    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      { images, thumbnail },
      { new: true }
    );

    if (!updatedProduct) {
      return response.status(404).json({ message: 'Product not found' });
    }
    const baseUrl = 'http://localhost:8000/images/';
    updatedProduct.thumbnail = baseUrl + updatedProduct.thumbnail;
    updatedProduct.images = updatedProduct.images.map(image => baseUrl + image);

    return response.status(200).json({ product: updatedProduct });
  } catch (error) {
    console.error('Error updating product images and thumbnail:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
};