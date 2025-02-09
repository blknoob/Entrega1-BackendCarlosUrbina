const fs = require("fs");


class CartManager {
  constructor() {
    this.dbCarts = "./db/carts.json";
    this.dbProducts = "./db/products.json";
    this.carts = this.loadCarts();
    this.id = this.carts.length
      ? Math.max(...this.carts.map((c) => c.id)) + 1
      : 1;
  }

  // Cargar carritos desde el archivo JSON
  loadCarts() {
    try {
      if (!fs.existsSync(this.dbCarts)) {
        fs.writeFileSync(this.dbCarts, JSON.stringify([]));
      }
      return JSON.parse(fs.readFileSync(this.dbCarts, "utf-8"));
    } catch (error) {
      console.error("Error al cargar los carritos:", error);
      return [];
    }
  }

  loadProducts() {
    try {
      if (!fs.existsSync(this.dbProducts)) {
        fs.writeFileSync(this.dbProducts, JSON.stringify([]));
      }
      return JSON.parse(fs.readFileSync(this.dbProducts, "utf-8"));
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      return [];
    }
  }


  // Guardar carritos en el archivo JSON
  saveCarts() {
    fs.writeFileSync(this.dbCarts, JSON.stringify(this.carts, null, 2));
  }

  // Obtener todos los carritos
  getCarts() {
    return this.carts;
    
  }

  // Obtener carrito por ID
  getCartById(id) {
    return this.carts.find((cart) => cart.id === id) || null;
  }

  // Crear un nuevo carrito
  createCart() {
    const newCart = { id: this.id++, products: [] };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  // Agregar un producto a un carrito
  addProductToCart(cartId, productId) {
    const cart = this.getCartById(cartId);

    if (!cart) {
      return { error: "Carrito no encontrado" };
    }

    const products = this.loadProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return { error: "Producto no encontrado" };
    }

    const existProduct = cart.products.find((p) => p.id === productId);
    if (existProduct) {
      existProduct.quantity++;
    } else {
      cart.products.push({ id: productId, quantity: 1 });
    }
    this.saveCarts();
    return { message: "Producto agregado correctamente", products: cart.products };
  }

  // Eliminar un carrito
  deleteCart(id) {
    const index = this.carts.findIndex((cart) => cart.id === id);
    if (index === -1) return { error: "Carrito no encontrado" };
    this.carts.splice(index, 1);
    this.saveCarts();
  }
}

module.exports = CartManager;
