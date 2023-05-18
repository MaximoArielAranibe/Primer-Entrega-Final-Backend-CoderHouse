import { Router } from "express";
import { CartManager } from "../dao/index.js";

const cartRouter = Router();
const manager = new CartManager();


cartRouter.get("/:pid", async (req, res) => {
  const cid = req.params.pid;
  const items = await manager.get();
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
