import FileProductManager from "../dao/file-managers/ProductManager.js";
import DbProductManager from "../dao/db-managers/products.manager.js";
import FileCartManager from "./file-managers/CartManager.js";
import DbCartManager from "./db-managers/cart.manager.js";

const config = {
  persistenceType: "db",
};

let ProductManager, CartManager;

if (config.persistenceType === "db") {
  ProductManager = DbProductManager;
  CartManager = DbCartManager;
} else if (config.persistenceType === "file") {
    ProductManager = FileProductManager;
    CartManager = FileCartManager;
} else {
	throw new Error("Unknow persistence type");
};

export { ProductManager, CartManager };