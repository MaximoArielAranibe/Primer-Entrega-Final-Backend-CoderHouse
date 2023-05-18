import express from "express";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import realTimeProducts from "./routes/realTimeProducts.router.js";
import EventEmitter from "events";
import mongoose from "mongoose";
EventEmitter.defaultMaxListeners = 15;

/* 

  -- Agregar modelo de persistencia en DB utilizando MongoDB y mongoose en tu proyecto.

  -- Crear una base de datos llamada "ecommerce" dentro de tu Atlas, crea sus colecciones "carts", "messages", "product", y sus respectivos schemas.

  -- Agregar managers de productos y carritos pero ahora utilizando MongoDB. NO ELIMINAR managers de FileSystem de tu proyecto.

  -- Separar los managers de fileSystem de los managers de MongoDb en una sola carpeta "dao". dentro de dao, agregar tambien una carpeta "models" donde viviran los esquemas de MongoDB. La estructura debera ser igual a la vista en esta clase.

  -- Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem.

  -- Implementar una vista en handlevars llamada chat.handlebars, la cual permitira implementar un chat como el visto en  clase. Los mensajes deberan guardarse en una ocoleccion "messages" en mongo (no es necesario implemntarlo en FileSystem). El formato es [user: correoDelUsuario, message:mensajeDelUsuario].

  -- Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.

*/




mongoose.connect("mongodb+srv://darknesswong:HjiWgsym73ihEnur@eccomerce.ezoch9b.mongodb.net/eccomerce").then((conn) => {
  console.log("Connected to DB");
});


//Express
const app = express();
express.json();
express.urlencoded({ extended: true });

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/../public"));

//Routes
app.use("/", viewsRouter)
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/realtimeproducts", realTimeProducts)

//Sockets
const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});



export default httpServer; 