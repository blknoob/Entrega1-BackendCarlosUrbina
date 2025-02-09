const express = require("express");
const CartManager = require("../managers/cartManager");

const router = express.Router();
const cartManager = new CartManager();

router.post("/", (req, res) => {
  const newCart = cartManager.createCart();
  res
    .status(201)
    .json({ message: "Carrito creado correctamente", cart: newCart });
});

router.get("/:cid", (req, res) => {
  const cart = cartManager.getCartById(parseInt(req.params.cid));
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(cart.products);
});

router.post("/:cid/product/:pid", (req, res) => {
  const products = cartManager.addProductToCart(
    parseInt(req.params.cid),
    parseInt(req.params.pid)
  );

  if (!products) return res.status(404).json(products);
  res.status(201).json(products);
});

router.delete("/:cid", (req, res) => {
  cartManager.deleteCart(parseInt(req.params.cid));
  res.json({ message: "Carrito eliminado correctamente" });
});

module.exports = router;
