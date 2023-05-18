import { Router } from "express";
import { CartManager } from "../dao/index.js";
import { ProductManager } from "../dao/index.js";

const productsPath = "../dao/file-managers/files/products.json"
const cartsPath = "../dao/file-managers/files/carts.json"

const cartManager = new CartManager(cartsPath);
const productManager = new ProductManager(productsPath);

const viewsRouter = Router();

viewsRouter.get('/products', async (req,res) => {
  const products = await productManager.get();

  return res.render("products", { products });
});

viewsRouter.get('/carts', async (req,res) => {
  const carts = await cartManager.getAll();
  res.render("carts", { carts });
});


export default viewsRouter;