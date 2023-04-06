const express = require("express");

const productController = require("../controllers/product.controller");

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:productID", productController.getProductByID);

router.post("/", productController.addProduct);

router.put("/:productID", productController.updateProduct);

router.delete("/:productID", productController.deleteProduct);

module.exports = router;