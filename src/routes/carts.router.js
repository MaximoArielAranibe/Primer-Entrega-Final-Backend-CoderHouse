import { json, Router } from "express";
import cartManager from "../carts.js";

const manager = new cartManager("src/json/carts.json");

const cartRouter = Router();

cartRouter.get("/:pid", async (req, res) => {
  const cid = req.params.pid;
  const items = await manager.read();
  const itemFilter = items.find((e) => e.id == cid);
  if (!itemFilter) {
    res
      .status(404)
      .send({ error: `No existe el item con ID ${req.params.pid}` });
  } else {
    res.json({ itemFilter });
  }
});

cartRouter.post('/:cid/product/:pid', async (req,res) => {
	const cid = req.params.cid;
	const pid = req.params.pid;
	await manager.add({id: pid, quantity: cid})
	const carts = await manager.read();
	res.status(201).send({products: carts})
})

export default cartRouter;
