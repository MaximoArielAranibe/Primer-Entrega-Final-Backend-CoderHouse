import cartModel from "../models/carts.model.js";

export default class CartManager {
  constructor() {
    console.log("Working with courses using database");
  }

  get = async () => {
    const carts = await cartModel.find().lean();
    return carts;
  };

  create = async (cart) => {
    const result = await cartModel.create(cart);
    return result.save();
  };

  add = async (id) => {
    const result = await cartModel.create(id);
    return result;
  };
}
