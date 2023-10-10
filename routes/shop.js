const express = require("express");

const {
  getProduct,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProducts,
  postCart,
} = require("../controllers/shop");


const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);
router.get("/products/:productId", getProduct);
router.post("/cart", postCart);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);
router.get("/checkout", getOrders);

module.exports = router;
