import fs from "fs";

class cartManager {
  constructor(path) {
    this.path = path;
  }

  write = async (list) => {
    fs.promises.writeFile(this.path, JSON.stringify(list));
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
    let itemExist = cart.find((e) => e.id == id);
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
}

const manager = new cartManager("src/json/carts.json");

export default cartManager;