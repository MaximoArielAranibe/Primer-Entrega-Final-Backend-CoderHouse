import express from "express";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import realTimeProducts from './routes/realTimeProducts.router.js'


//Express
const app = express();
express.json();
express.urlencoded({ extended: true });

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/../public"))

//Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/realtimeproducts", realTimeProducts)


//Sockets
const httpServer = app.listen(8080, () => {
	console.log("Server listening on port 8080");
  });
  
  const io = new Server(httpServer);
  
  io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
	  console.log('user disconnected');
	});
  });