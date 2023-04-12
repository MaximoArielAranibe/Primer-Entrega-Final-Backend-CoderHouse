import { Router, json } from 'express';
import ProductManager from '../productManager.js';
import runServer from '../RealTimeSocket.js';
import httpServer from '../app.js';

//const manager = new ProductManager("src/json/productos.json");

const realTimeRouter = Router();

realTimeRouter.use(json());

realTimeRouter.get('/', async (req,res) => {
    runServer(httpServer);
    res.render("real-time-products")
});

export default realTimeRouter;
