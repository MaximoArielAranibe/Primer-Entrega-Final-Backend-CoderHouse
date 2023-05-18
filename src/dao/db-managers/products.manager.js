import productModel from "../models/products.model.js";

export default class ProductManager {
  constructor() {
    console.log("Working with products using database eccomerce");
  }

  get = async () => {
    const products = await productModel.find().lean();
    return products
  };

  add = async (product) => {
    const result = await productModel.create(product);
    return result;
  };
}
