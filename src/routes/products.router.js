import { json, Router } from "express";
import { ProductManager } from "../dao/index.js";

const productRouter = Router();
const manager = new ProductManager();

productRouter.use(json());

productRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    let products = await manager.get();
    const productLimit = products.slice(0, limit);

    if (!limit) {
      return res.json({ products });
    } else {
			return res.json({ result: productLimit });
    }
  } catch (error) {
    return res
    .status(401)
    .send("Error en get");
  }
});

productRouter.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const products = await manager.get();
  const productFind = products.find((e) => e.id == pid);

  if (!productFind) {
    return res
      .status(404)
      .send({ error: `No existe el usuario con ID ${req.params.pid}` });
  } else {
    res.json({ productFind });
  }
});

productRouter.post('/', async (req, res) => {
	const {title, description, price, thumbnail, code, stock} = req.body;
	const productAdded = await manager.add({title, description, price, thumbnail, code, stock})
	return res.status(201).send({productAdded})
});

productRouter.put('/:pid', async (req,res) => {
  const pid = Number(req.params.pid);
	const {title, description, price, thumbnail, code, stock} = req.body;
  console.log(title,description);
  const productFind = await manager.updateProduct(pid,title,description,price,thumbnail,code,stock);
  console.log(productFind);
})

productRouter.delete('/:pid', async (req,res) => {
  const pid = Number(req.params.pid)
  await manager.delete(pid)
  return res.send({producto: "eliminado"})
})

export default productRouter;
