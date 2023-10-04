const express = require("express");

const {
  getProduct,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProduct);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);
router.get("/checkout", getOrders);

module.exports = router;
