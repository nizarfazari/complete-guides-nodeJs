const express = require("express");

const {
  getProduct,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProducts,
  postCart,
  postCartDeleteProduct,
} = require("../controllers/shop");


const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);
router.get("/products/:productId", getProduct);
router.post("/cart", postCart);
router.get("/cart", getCart);
router.post("/cart-delete-item", postCartDeleteProduct)
router.get("/checkout", getCheckout);
router.get("/checkout", getOrders);

module.exports = router;
