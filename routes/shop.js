const express = require("express");

const { getProduct } = require("../controllers/product");

const router = express.Router();

router.get("/", getProduct);

module.exports = router;
