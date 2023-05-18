import { Router, json } from "express";
import ProductManager from "../dao/file-managers/ProductManager.js";
import runServer from "../RealTimeSocket.js";
import httpServer from "../app.js";

const path = "src/dao/file-managers/files/productos.json";
const manager = new ProductManager(path);
const products = await manager.get();
const num = 1;

//const manager = new ProductManager("src/json/productos.json");


const realTimeRouter = Router();

realTimeRouter.use(json());

realTimeRouter.get("/", async (req, res) => {
	runServer(httpServer);
	//return res.json({products})
  res.render("real-time-products",{
		products
	});
});

export default realTimeRouter;
