import cartModel from "../models/carts.model.js";

export default class CartManager {
  constructor() {
    console.log("Working with carts using database");
  }

  getAll = async () => {
    const carts = await cartModel.find().lean();
    return carts;
  };

  create = async (cart) => {
    const result = await cartModel.create(cart);
    return result;
  };

  addOneItem = async (id, quantity) => {
    const cart = await cartModel.findById(id);
    cart.quantity.push({ quantity });
    return cart.save();
  };
}
