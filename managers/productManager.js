const fs = require("fs");

class ProductManager {
  constructor() {
    this.db = "./db/products.json";
    this.products = this.loadProducts();
    this.id = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
  }


  loadProducts() {
    if (!fs.existsSync(this.db)) {
      fs.writeFileSync(this.db, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(this.db, "utf-8"));
  }
  

  saveProducts() {
    fs.writeFileSync(this.db, JSON.stringify(this.products, null, 2));
  }

  addProduct(title, description, code, price, stock, category, thumbnail) {
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      return { error: "Faltan datos}" };
    }

    const newProduct = {
      id: this.id,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnail,
    };
    this.products.push(newProduct);
    this.saveProducts();
    this.id++;
    return newProduct;
  }

  getProducts() {
    return this.products;    
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    return product ? product : { error: "Producto no encontrado" };
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
