import { Router, json } from 'express';
import ProductManager from '../productManager.js';

const manager = new ProductManager("src/json/productos.json");

const realTimeRouter = Router();

realTimeRouter.use(json());

realTimeRouter.get('/', async (req,res) => {
    const products = await manager.get();
    res.render("index")
});

export default realTimeRouter;
