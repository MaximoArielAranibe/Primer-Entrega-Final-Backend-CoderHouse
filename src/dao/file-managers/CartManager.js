import fs from "fs";
import __dirname from "../../utils.js";

const path = __dirname + "/dao/file-managers/files/carts.json"

export default class CartManager {
  constructor() {
    this.path = path;
    this.format = "utf-8";
  }

  write = async (list) => {
    return await fs.promises.writeFile(this.path, JSON.stringify(list));
  };

  read = () => {
    if (fs.existsSync(this.path)) {
      return fs.promises
        .readFile(this.path, this.format)
        .then((r) => JSON.parse(r));
    } else {
      return [];
    }
  };

  get = async () => {
    const list = await this.read();
    return list;
  };

  getNewID = (list) => {
    const count = list.length;
    return count > 0 ? list[count - 1].id + 1 : 1;
  };

  add = async (id) => {
    const cart = await this.get();
    let itemExist = cart.some((e) => e.id == id);
    try {
      if (itemExist == undefined) {
        const newItem = {
          id: this.getNewID(cart),
          quantity: 1,
        };
        cart.push(newItem);
        this.write(cart);
				return console.log("New item add: ", cart);
      } else {
				itemExist = itemExist.quantity++;
        this.write(cart);
				console.log("---------------");

				console.log("Add product agree: ", await cart);
				console.log("---------------");
      };
    } catch (error) {
			console.log("Error :", error);
    }
  };
};

