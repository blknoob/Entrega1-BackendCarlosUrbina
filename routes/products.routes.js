const express = require("express");
const ProductManager = require("../managers/productManager");

const router = express.Router();
const productManager = new ProductManager();

// Endpoint para obtener todos los productos
router.get("/", (req, res) => {
  res.json(productManager.getProducts());
});

// Endpoint para obtener un producto por ID
router.get("/:pid", (req, res) => {
  const product = productManager.getProductById(parseInt(req.params.pid));
  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// Endpoint para agregar un nuevo producto
router.post("/", (req, res) => {
  const { title, description, code, price, stock, category, thumbnail } =
    req.body;
  const newProduct = productManager.addProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail
  );
  if (!newProduct || newProduct.error) return res.status(400).json(newProduct);
  res.status(201).json({
    message: "Producto agregado correctamente",
    product: newProduct,
  });
});

// Endpoint para actualizar un producto
router.put("/:pid", (req, res) => {
  const updatedProduct = productManager.updateProduct(
    parseInt(req.params.pid),
    req.body
  );
  if (!updatedProduct)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json({
    message: "Producto actualizado correctamente",
    product: updatedProduct,
  });
});

// Endpoint para eliminar un producto
router.delete("/:pid", (req, res) => {
  productManager.deleteProduct(parseInt(req.params.pid));
  res.json({ message: "Producto eliminado correctamente" });
});

module.exports = router;
