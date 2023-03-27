import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from './routes/carts.router.js'
import __dirname from "./utils.js";

const app = express();

express.urlencoded({ extended: true });

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

express.static('public/'+ __dirname )


/* app.get('/products', async (req, res) => {


	const { limit } = req.query

  const products = await manager.read();

	const productLimit = products.slice(0,limit);


	if (!limit) {
		res.send({products})
	} else {
		res.send({productLimit})
	}
}); */

/* app.get('/products/:pid', async (req,res) => {
	const pid = req.params.pid;
	const products = await manager.read();
	const productFind = products.find(e => e.id == pid);
	
	if(!productFind){
		return res
		.status(404)
		.send({error: `No existe el usuario con ID ${req.params.pid}`})
	}else{
		res.json({productFind})
	}
}) */

app.listen(8080, () => {
  console.log("Listening server on port 8080");
});
