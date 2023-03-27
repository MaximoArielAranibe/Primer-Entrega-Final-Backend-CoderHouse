import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.format = "utf-8";
  }

  writeNewFile = async () => {
    return await fs.promises.writeFile(this.path, "[]");
  };

  getNewID = (list) => {
    const count = list.length;
    return count > 0 ? list[count - 1].id + 1 : 1;
  };

  add = async (title, description, price, thumbnail, code, stock) => {
    const list = await this.get();
    const newID = this.getNewID(list);
    const exis = list.some((el) => el.code == code);
    if (!exis) {
      const newProduct = {
        id: newID,
        title: title ?? "",
        description: description ?? "",
        price: price ?? 0.0,
        thumbnail: thumbnail ?? [],
        code: code ?? "",
        stock: stock ?? 0,
        status: true,
      };
      list.push(newProduct);
      await this.write(list);
      return { product: "Product Added", newProduct };
      //return newProduct;
    } else {
      return { error: `code: ${code} already exists` };
    }
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

  write = async (list) => {
    fs.promises.writeFile(this.path, JSON.stringify(list));
  };

  get = async () => {
    const list = await this.read();
    return list;
  };

  getbyId = async (id) => {
    const list = await this.get();
    return list.find((prod) => prod.id == id);
  };

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      const products = await this.get();
      const index = products.findIndex((e) => e.id == id);
      console.log(index);
      if (index === -1) {
        return "Product to update not found";
      } else {
        const productIndividual = products[index];
        productIndividual.title = title;
        productIndividual.description = description;
        productIndividual.price = price;
        productIndividual.thumbnail = thumbnail;
        productIndividual.code = code;
        productIndividual.stock = stock;

        await this.write(products);
        return productIndividual;
      }
    } catch (e) {
      return { Error: e };
    }
  }

  delete = async (id) => {
    const list = await this.get();
    const idx = list.findIndex((e) => e.id == id);
    if (idx < 0) {
      list.splice(idx, 1);
      await this.write(list);
      return list;
    } else {
      console.log("Producto no encontrado");
    }
  };
}

const manager = new ProductManager("src/json/productos.json");
/*
console.log(await manager.updateProduct(3,"3333","hola","hola","hola","hola","hola")); */

/* console.log(await manager.delete(3)
); */

export default ProductManager;
